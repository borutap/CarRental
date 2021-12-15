using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRentalApi.WebApi.Models
{
    public record RentVehicleResponse
    {
        public Guid QuoteId { get; init; }
        public Guid RentId { get; init; }
        public DateTime RentAt { get; init; }
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
    }
}
