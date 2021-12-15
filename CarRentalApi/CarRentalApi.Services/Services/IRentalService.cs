using Car_Rental.Models;
using CarRentalApi.Services.Models;
using System;
using System.Collections.Generic;

namespace Car_Rental.Services
{
    public interface IRentalService
    {
        VehicleModel GetModelByVehicleId(Guid id);
        VehicleModel GetModel(Guid id);
        VehicleModel GetModel(string brand, string Model);
        IEnumerable<Vehicle> GetVehicles();
        Vehicle RentFirstAvailableVehicle(Guid modelId, DateTime startDate, DateTime endDate, Guid rentId);

        Rent CreateRent(Rent rent);
        void ReturnVehicle(Guid rentId);
        IEnumerable<Rent> GetRents();

        Quote CreateQuote(decimal price, string currency, Guid modelId);
        Quote GetQuote(Guid id);
    }
}