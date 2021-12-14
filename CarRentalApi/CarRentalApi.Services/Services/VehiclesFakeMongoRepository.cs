using System;
using System.Collections.Generic;
using System.Linq;
using Car_Rental.Models;
using CarRentalApi.Services.Models;
using CarRentalApi.Services.Services;

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
                Currency = "PLN"
            },
            new VehicleModel
            {
                Id = Guid.Parse("84d23d56-6be7-48e7-b0e1-51166a558009"),
                Brand = "Audi",
                Model = "RS7",
                DefaultPrice = 80,
                Currency = "PLN"
            },
        };


        private List<Vehicle> _vehicles = new()
        {
            new Vehicle
            {
                Id = Guid.NewGuid(),
                EnginePower = 120,
                EnginePowerType = "PB",
                Capacity = 5,
                Description = "Fiat Punto",
                Year = 2005,
                ModelId = Guid.Parse("933afee2-fbb1-4174-9fb4-16ac4b27a080")
            },
            new Vehicle
            {
                Id = Guid.NewGuid(),
                EnginePower = 140,
                EnginePowerType = "PB",
                Capacity = 6,
                Description = "Fiat Punto",
                Year = 2002,
                ModelId = Guid.Parse("933afee2-fbb1-4174-9fb4-16ac4b27a080")
            },
            new Vehicle
            {
                Id = Guid.NewGuid(),
                EnginePower = 220,
                EnginePowerType = "PB",
                Capacity = 7,
                Description = "Audi RS7",
                Year = 2015,
                ModelId = Guid.Parse("84d23d56-6be7-48e7-b0e1-51166a558009")
            },
        };


        private List<RentDetails> _rentDetails = new();

        public IEnumerable<Vehicle> GetVehicles()
        {
            return _vehicles;
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
            var vehicle = _vehicles.SingleOrDefault(x => x.Id == vehicleId);
            return GetModel(vehicle.ModelId);
        }

        public Vehicle RentFirstAvailableVehicle(Guid modelId, DateTime startDate, DateTime endDate, Guid rentId, IRentsRepository rentsRepository)
        {
            ValidateRentDates(startDate, endDate);

            var vehiclesFromDb = _vehicles.Where(x => x.ModelId == modelId);

            foreach (var vehicle in vehiclesFromDb)
            {
                List<Rent> vehicleRents = rentsRepository.GetRents().Where(x => x.VehicleId == vehicle.Id).ToList();
                if (IsVehicleUnavailable(startDate, endDate, vehicleRents))
                    continue;

                return vehicle;
            }

            return null;
        }

        private static void ValidateRentDates(DateTime startDate, DateTime endDate)
        {
            if (startDate < DateTime.UtcNow.Date) throw new InvalidOperationException($"startDay: {startDate} cannot be ealier than today! ");
            if (endDate < startDate) throw new InvalidOperationException($"endDate {endDate} cannot be ealier than startDay: {startDate}! ");
        }
        private static bool IsVehicleUnavailable(DateTime startDate, DateTime endDate, List<Rent> rents)
        {
            List<RentDetails> selectedRents = new List<RentDetails>();

            return rents.Exists(x => !x.ReturnTime.HasValue && ((x.EndDate >= startDate && x.StartDate <= startDate) || (x.StartDate <= endDate && x.EndDate >= endDate)));
        }

    }
}