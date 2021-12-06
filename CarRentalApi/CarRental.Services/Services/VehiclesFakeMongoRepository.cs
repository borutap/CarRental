using System;
using System.Collections.Generic;
using System.Linq;
using Car_Rental.Models;

namespace Car_Rental.Services
{
    public class VehiclesFakeMongoRepository : IVehiclesRepository
    {
        private List<VehicleModel> _vehicleModels = new()
        {
            new VehicleModel
            {
                Id = Guid.Parse("933afee2-fbb1-4174-9fb4-16ac4b27a080"),
                Brand = "Fiat",
                Model = "Punto",
                DefaultPrice = 50,
                Vehicles = new()
                {
                    new Vehicle { Id = Guid.Parse("5aa2f501-6750-4ee1-8dec-225f62e6ca7e"), Year = 2005, EnginePower = 120, EnginePowerType = "HP", Capacity = 5, Description = "Fiat Punto", RentDetails = new List<RentDetails>() },
                    new Vehicle { Id = Guid.Parse("332b63aa-63a8-488f-bc48-1e3d60c45ecc"), Year = 2010, EnginePower = 150, EnginePowerType = "HP", Capacity = 5, Description = "Fiat Punto", RentDetails = new List<RentDetails>() },
                },
                Currency = "PLN"
            },
            new VehicleModel
            {
                Id = Guid.Parse("84d23d56-6be7-48e7-b0e1-51166a558009"),
                Brand = "Audi",
                Model = "RS7",
                DefaultPrice = 80,
                Vehicles = new()
                {

                    new Vehicle { Id = Guid.Parse("cd6fd02f-fe42-4964-b7b3-2eea56fbb320"), Year = 2014, EnginePower = 220, EnginePowerType = "HP", Capacity = 5, Description = "Audi RS7", RentDetails = new List<RentDetails>() }

                },
                Currency = "PLN"
            },
        };
        public IEnumerable<VehicleModel> GetModels()
        {
            return _vehicleModels;
        }
        public IEnumerable<Vehicle> GetVehicles()
        {
            return _vehicleModels.SelectMany(x => x.Vehicles);
        }
        public VehicleModel GetModel(string brand, string Model)
        {
            return _vehicleModels.Where(vehModel => vehModel.Brand == brand && vehModel.Model == Model).SingleOrDefault();
        }

        public VehicleModel GetModel(Guid id)
        {
            return _vehicleModels.SingleOrDefault(x => x.Id == id);
        }

        public VehicleModel GetModelByVehicleId(Guid vehicleId)
        {
            foreach (var model in _vehicleModels)
            {
                if (model.Vehicles.Exists(x => x.Id == vehicleId))
                    return model;
            }
            return null;
        }

        public Vehicle RentFirstAvailableVehicle(Guid modelId, DateTime startDate, DateTime endDate, Guid rentId)
        {
            ValidateRentDates(startDate, endDate);

            var modelFromDb = _vehicleModels.SingleOrDefault(x => x.Id == modelId);

            foreach (var vehicle in modelFromDb.Vehicles)
            {
                if (IsVehicleUnavailable(startDate, endDate, vehicle))
                    continue;

                vehicle.RentDetails.Add(new RentDetails { StartDate = startDate, EndDate = endDate, RentId = rentId });
                return vehicle;
            }

            return null;
        }

        public Vehicle RentVehicle(Guid modelId, Guid vehicleId, DateTime startDate, DateTime endDate, Guid rentId)
        {
            ValidateRentDates(startDate, endDate);

            var modelFromDb = GetModel(modelId);
            var vehicle = modelFromDb.Vehicles.SingleOrDefault(x => x.Id == vehicleId);

            if (IsVehicleUnavailable(startDate, endDate, vehicle))
                return null;

            vehicle.RentDetails.Add(new RentDetails { StartDate = startDate, EndDate = endDate, RentId = rentId });
            return vehicle;
        }

        public Vehicle ReturnVehicle(Guid modelId, Guid vehicleId, Guid rentId, DateTime? returnDate)
        {
           foreach (var model in _vehicleModels)
            {
                foreach (var vehicle in model.Vehicles)
                {
                    if (vehicle.Id == vehicleId)
                    {
                        foreach (var rent in vehicle.RentDetails)
                        {
                            if (rent.RentId == rentId)
                            {
                                rent.ReturnDate = returnDate;
                                return vehicle;
                            }
                        }
                    }
                }
            }
            return null;
        }

        private static void ValidateRentDates(DateTime startDate, DateTime endDate)
        {
            if (startDate < DateTime.UtcNow.Date) throw new InvalidOperationException($"startDay: {startDate} cannot be ealier than today! ");
            if (endDate < startDate) throw new InvalidOperationException($"endDate {endDate} cannot be ealier than startDay: {startDate}! ");
        }
        private static bool IsVehicleUnavailable(DateTime startDate, DateTime endDate, Vehicle vehicle)
        {
            return vehicle.RentDetails.Exists(x => !x.ReturnDate.HasValue && (x.EndDate > startDate || x.StartDate < endDate));
        }

    }
}