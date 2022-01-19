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
        List<string> GetAudit(int count);
        List<string> GetAudit();
        bool ReturnVehicle(Guid rentId);
        List<Rent> GetRents();
        Rent GetRent(Guid id);
        void CreateModel(VehicleModel model);
        void CreateVehicle(Vehicle vehicle);

        Quote CreateQuote(decimal price, string currency, Guid modelId, string teamName);
        List<Quote> GetQuotesByTeam(string teamName);
        Quote GetQuote(Guid id);
    }
}