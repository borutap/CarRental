using CarRentalApi.Services.Models;
using System;

namespace CarRentalApi.Services.Services
{
    public interface IQuoteRepository
    {
        Quote Create(decimal price, string currency, Guid modelId);
        Quote Get(Guid id);
    }
}