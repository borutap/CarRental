using System;

namespace CarRentalApi.WebApi.Models
{
    public record CheckPriceResponse
    {
        public decimal Price { get; init; }
        public string Currency { get; init; }
        public DateTime GeneratedAt { get; init; }
        public DateTime ExpiredAt { get; init; }
        public Guid QuoteId { get; init; }
    }
}
