using Car_Rental.Models;
using System;
using System.Collections.Generic;

namespace Car_Rental.Services
{
    public interface IVehiclesRepository
    {
        VehicleModel GetModelByVehicleId(Guid id);
        VehicleModel GetModel(string brand, string Model);
        IEnumerable<VehicleModel> GetModels();
        IEnumerable<Vehicle> GetVehicles();
        Vehicle RentFirstAvailableVehicle(Guid modelId, DateTime startDate, DateTime endDate, Guid rentId);
        Vehicle RentVehicle(Guid modelId, Guid vehicleId, DateTime startDate, DateTime endDate, Guid rentId);
        Vehicle ReturnVehicle(Guid modelId, Guid vehicleId, Guid rentId, DateTime? returnTime);
    }
}