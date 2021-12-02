using CarRentalApi.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CarRentalApi.Services.Services
{
    public class QuoteFakeMongoRepository : IQuoteRepository
    {
        private const int ExpirationHours = 2;
        private List<Quote> _quotes = new List<Quote>();

        public Quote Create(decimal price, string currency, Guid modelId, Guid? vehicleId = null)
        {
            var now = DateTime.UtcNow;
            var quote = new Quote
            {
                QuoteId = Guid.NewGuid(),
                GeneratedAt = now,
                ExpiredAt = now.AddHours(ExpirationHours),
                ModelId = modelId,
                Price = price,
                VehicleId = vehicleId,
                Currency = currency
            };
            _quotes.Add(quote);
            return quote;
        }

        public Quote Get(Guid id)
        {
            return _quotes.SingleOrDefault(q => q.QuoteId == id);
        }
    }
}
