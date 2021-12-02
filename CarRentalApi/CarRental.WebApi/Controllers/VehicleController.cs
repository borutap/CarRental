using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Car_Rental.Services;
using Car_Rental.Models;
using System.Linq;
using CarRentalApi.WebApi.Models;
using CarRentalApi.WebApi.Helpers;
using CarRentalApi.Services.Services;
using System;
using CarRentalApi.Services.Models;
using System.Net;

namespace Car_Rental.Controllers
{
    [ApiController]
    public class VehiclesControler: ControllerBase
    {
        private readonly IVehiclesRepository _vehiclesRepository;
        private readonly IQuoteRepository _quoteRepository;
        private readonly IRentsRepository _rentsRepository;

        public VehiclesControler(IVehiclesRepository vehiclesRepository, IQuoteRepository quoteRepository, IRentsRepository rentsRepository)
        {
            _vehiclesRepository = vehiclesRepository;
            _quoteRepository = quoteRepository;
            _rentsRepository = rentsRepository;
        }

        [HttpGet("vehicles")]
        public IEnumerable<VehicleResponse> GetVehicles()
        {
            var results = new List<VehicleResponse>();

            foreach(var model in _vehiclesRepository.GetModels())
            {
                results.AddRange(model.Vehicles.Select(x => new VehicleResponse
                {
                    Brand = model.Brand,
                    Model = model.Model,
                    Capacity = x.Capacity,
                    Description = x.Description,
                    EnginePower = x.EnginePower,
                    EnginePowerType = x.EnginePowerType,
                    Id = x.Id,
                    Year = x.Year
                }));
            }

            return results;
        }

        [HttpPost("vehicle/{brand}/{model}")]
        public CheckPriceResponse GetModel(string brand, string model,[FromBody] CheckPriceRequest request)
        {
            var modelFromDb = _vehiclesRepository.GetModel(brand, model);
            var price = CalculatePriceHelper.Calculate(modelFromDb.DefaultPrice, request.Age, request.YearsOfHavingDriverLicense);
            
            var quoteFromDb = _quoteRepository.Create(price, modelFromDb.Currency, modelFromDb.Id);
            
            return new CheckPriceResponse
            {
                Currency = modelFromDb.Currency,
                ExpiredAt = quoteFromDb.ExpiredAt,
                GeneratedAt = quoteFromDb.GeneratedAt,
                Price = price,
                QuoteId = quoteFromDb.QuoteId
            };

        }

        [HttpPost("vehicle/{id}")]
        public CheckPriceResponse GetModelByID(Guid id, [FromBody] CheckPriceRequest request)
        {
            var modelFromDb = _vehiclesRepository.GetModelByVehicleId(id);
            var price = CalculatePriceHelper.Calculate(modelFromDb.DefaultPrice, request.Age, request.YearsOfHavingDriverLicense);

            var quoteFromDb = _quoteRepository.Create(price, modelFromDb.Currency, modelFromDb.Id, id);

            return new CheckPriceResponse
            {
                Currency = modelFromDb.Currency,
                ExpiredAt = quoteFromDb.ExpiredAt,
                GeneratedAt = quoteFromDb.GeneratedAt,
                Price = price,
                QuoteId = quoteFromDb.QuoteId
            };
        }

        [HttpPost("vehicle/Rent/{quoteId}")]
        public RentVehicleResponse RentVehicle(Guid quoteId, [FromBody] RentVehicleRequest request)
        {
            var quoteFromDb = _quoteRepository.Get(quoteId);
            var rent = new Rent
            {
                Id = Guid.NewGuid(),
                CreationTime = DateTime.UtcNow,
                QuoteId = quoteFromDb.QuoteId,
                StartDate = request.StartDate,
                EndDate = request.EndDate
            };
           
            Vehicle vehicle;
            
            if(quoteFromDb.VehicleId is null)
            {
                vehicle = _vehiclesRepository.RentFirstAvailableVehicle(quoteFromDb.ModelId, request.StartDate, request.EndDate, rent.Id);
            }
            else
            {
                vehicle = _vehiclesRepository.RentVehicle(quoteFromDb.ModelId, quoteFromDb.VehicleId.Value, request.StartDate, request.EndDate, rent.Id);
            }

            if (vehicle == null) return null;

            rent.VehicleId = vehicle.Id;
            rent.ModelId = quoteFromDb.ModelId;

            _rentsRepository.Create(rent);

            return new RentVehicleResponse
            {
                RentId = rent.Id,
                QuoteId = rent.QuoteId,
                StartDate = rent.StartDate,
                EndDate = rent.EndDate,
                RentAt = rent.CreationTime
            };
        }

        [HttpPost("vehicle/Return/{rentId}")]
        public ActionResult ReturnVehicle(Guid rentId)
        {
            var rent = _rentsRepository.ReturnVehicle(rentId);
            _vehiclesRepository.ReturnVehicle(rent.ModelId, rent.VehicleId, rentId, rent.ReturnTime);
            
            return Ok();
            
        }

    }
}