using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Car_Rental.Models;

namespace Car_Rental.Services
{
    public class VehiclesFakeMongo
    {
        private readonly List<Vehicle> vehicles = new()
        {
            new Vehicle { Id = Guid.NewGuid(), brandModel = "Fiat", modelName = "Punto", year = 2005, enginePower = 120, enginePowerType = "HP", capacity = 5, description = "Fiat Punto"},
            new Vehicle { Id = Guid.NewGuid(), brandModel = "Fiat", modelName = "Punto", year = 2010, enginePower = 150, enginePowerType = "HP", capacity = 5, description = "Fiat Punto"},
            new Vehicle { Id = Guid.NewGuid(), brandModel = "Audi", modelName = "RS7", year = 2014, enginePower = 220, enginePowerType = "HP", capacity = 5, description = "Audi RS7"}
        };
        private readonly List<Model> vehicleModels = new()
        {
            new Model { Id = Guid.NewGuid(), brand = "Fiat", model = "Punto", defaultPrice = 50, vehiclesID = new()
            {
                "1234",
                "2131"
            }, currency = "PLN" },
            new Model { Id = Guid.NewGuid(), brand = "Audi", model = "RS7", defaultPrice = 80, vehiclesID = new()
            {
                "5211",
                "5555"
            }, currency = "PLN" },
        };

        public IEnumerable<Vehicle> GetVehicles()
        {
            return vehicles;
        }
        public Model GetModel(string brand, string model)
        {
            return vehicleModels.Where(vehModel => vehModel.brand == brand && vehModel.model == model).SingleOrDefault();
        }
    }
}