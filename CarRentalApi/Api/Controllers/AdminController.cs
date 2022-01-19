using CarRentalApi.Services.Models;
using CarRentalApi.Services.Repositories;
using CarRentalApi.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRentalApi.WebApi.Helpers;
using Audit.WebApi;

namespace CarRentalApi.WebApi.Controllers
{
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IRentalRepository _rentalService;
        public AdminController(IRentalRepository rentalService)
        {
            _rentalService = rentalService;
        }

        [HttpGet("team/{teamName}/quote/history")]
        public IEnumerable<RentHistoryResponse> GetQuoteHistory(string teamName)
        {
            var quotesFromDb = _rentalService.GetQuotesByTeam(teamName);
            var result = new List<RentHistoryResponse>();
            foreach(var quote in quotesFromDb)
            {
                bool justQuote = false;
                bool ended = false;
                if (quote.RentId is null)
                {
                    justQuote = true;
                }
                else
                {
                    var rent = _rentalService.GetRent(quote.RentId.Value);
                    if (rent.ReturnTime != null || rent.EndDate <= DateTime.UtcNow)
                        ended = true;
                }
                result.Add(new RentHistoryResponse
                {
                    BrandName = quote.Model.Brand,
                    ModelName = quote.Model.Model,
                    JustQuote = justQuote,
                    RentEnded = ended,
                    QuoteId = quote.Id,
                    TeamName = quote.TeamName,
                    TimeStamp = DateTime.UtcNow,
                    ReturnCode = Guid.NewGuid()
                });
            }

            return result;
        }

        [HttpPost("vehicles/AddModel")]
        public void AddNewModel([FromBody] AddModelRequest request)
        {
            var vehicleModel = new VehicleModel
            {
                Id = Guid.NewGuid(),
                DefaultPrice = request.DefaultPrice,
                Brand = request.Brand,
                Currency = request.Currency,
                Model = request.Model
            };
            _rentalService.CreateModel(vehicleModel);
        }

        [HttpPost("vehicles/AddVehicle")]

        public void AddNewVehicle([FromBody] AddVehicleRequest request)
        {
            var desc = request.Description.Split();
            var model = _rentalService.GetModel(desc[0], desc[1]);
            if (model is null)
                return;
            var vehicle = new Vehicle
            {
                Id = Guid.NewGuid(),
                Capacity = request.Capacity,
                Description = request.Description,
                EnginePower = request.EnginePower,
                EnginePowerType = request.EnginePowerType,
                Year = request.Year,
                ModelId = model.Id
            };

            _rentalService.CreateVehicle(vehicle);
        }

        [HttpGet("team/{teamName}/audit")]
        [AuditIgnore]
        public List<AuditResponse> GetTeamAudit(string teamName, int count)
        {
            var auditFromDb = _rentalService.GetAudit().Select(x => AuditMapper.Map(x));
            List<AuditResponse> response = auditFromDb
                ?.Where(x => x.TeamName == teamName)
                ?.Take(count).ToList() ?? new List<AuditResponse>();

            return response;
        }
        

        [HttpGet("teams/audit")]
        [AuditIgnore]
        public List<AuditResponse> GetAllAudit(int count)
        {
            var auditFromDb = _rentalService.GetAudit(count).Select(x => AuditMapper.Map(x));
            return auditFromDb.ToList();
        }
    }
}