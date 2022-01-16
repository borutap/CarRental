using CarRentalApi.Services.Models;
using System;
using System.Collections.Generic;

namespace CarRentalApi.Services.Repositories
{
    public interface IRentalRepository
    {
        VehicleModel GetModelByVehicleId(Guid id);
        VehicleModel GetModel(Guid id);
        VehicleModel GetModel(string brand, string Model);
        List<Vehicle> GetVehicles();
        List<Tuple<Rent, Vehicle>> GetRentedVehicles();
        List<Tuple<Rent, Vehicle>> GetHistoricallyRentedVehicles();
        Vehicle GetFirstAvailableVehicle(Guid modelId, DateTime startDate, DateTime endDate, Guid rentId);
        Rent CreateRent(Rent rent);
        bool ReturnVehicle(Guid rentId);
        List<Rent> GetRents();
        Rent GetRent(Guid id);
        Quote CreateQuote(decimal price, string currency, Guid modelId, string teamName);
        List<Quote> GetQuotesByTeam(string teamName);
        Quote GetQuote(Guid id);
    }
}