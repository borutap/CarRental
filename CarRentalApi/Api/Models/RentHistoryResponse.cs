using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRentalApi.WebApi.Models
{
    public class RentHistoryResponse
    {
        public string TeamName { get; init; }
        public DateTime TimeStamp { get; init; }
        public string Brand { get; init; }
        public string Model { get; init; }
        public bool JustQuote { get; init; }
        public bool RentEnded { get; init; }
        public Guid QuoteId { get; init; }
        public Guid ReturnCode { get; init; }
    }
}
