using System;

namespace CarRentalApi.Services.Models
{
    public record Quote
    {
        public Guid QuoteId { get; init; }
        public DateTime GeneratedAt { get; init; }
        public DateTime ExpiredAt { get; init; }
        public Guid ModelId { get; init; }
        public Guid? VehicleId { get; init; }
        public decimal Price { get; init; }
        public string Currency { get; init; }
    }
}
