using CarRentalApi.Services.Repositories;
using CarRentalApi.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
                    Brand = quote.Model.Brand,
                    Model = quote.Model.Model,
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
    }
}