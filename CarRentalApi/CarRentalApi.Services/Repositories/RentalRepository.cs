using CarRentalApi.Services.Databases;
using CarRentalApi.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CarRentalApi.Services.Repositories
{
    public class RentalRepository : IRentalRepository
    {
        private readonly RentalDbContext _dbContext;
        private const int ExpirationHours = 2;
        public RentalRepository(RentalDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Quote CreateQuote(decimal price, string currency, Guid modelId)
        {
            var now = DateTime.UtcNow;
            var model = _dbContext.VehicleModels.First(x => x.Id == modelId);

            var quote = new Quote()
            {
                Price = price,
                Currency = currency,
                Model = model,
                ExpiredAt = now.AddHours(ExpirationHours),
                GeneratedAt = now
            };

            var quotaFromDb = _dbContext.Add(quote).Entity;
            _dbContext.SaveChanges();

            return quotaFromDb;
        }

        public Rent CreateRent(Rent rent)
        {
            var rentFromDb = _dbContext.Add(rent).Entity;

            _dbContext.SaveChanges();

            return rentFromDb;
        }

        public VehicleModel GetModel(Guid id)
        {
            return _dbContext.VehicleModels.First(x => x.Id == id);
        }

        public VehicleModel GetModel(string brand, string Model)
        {
            return _dbContext.VehicleModels.Where(x => x.Brand == brand && x.Model == Model).First();
        }

        public VehicleModel GetModelByVehicleId(Guid id)
        {
            return _dbContext.Vehicles.FirstOrDefault(x => x.Id == id)?.Model;
        }

        public Quote GetQuote(Guid id)
        {
            return _dbContext.Quotes.FirstOrDefault(x => x.Id == id);
        }

        public List<Rent> GetRents()
        {
            return _dbContext.Rents.ToList();
        }

        public List<Vehicle> GetVehicles()
        {
            return _dbContext.Vehicles.ToList();
        }

        public Vehicle GetFirstAvailableVehicle(Guid modelId, DateTime startDate, DateTime endDate, Guid rentId)
        {
            var modelFromDb = GetModel(modelId);

            if (modelFromDb == null) return null;

            var vehiclesFromDb = _dbContext.Vehicles.Where(x => x.Model.Id == modelFromDb.Id).ToList();

            foreach (var vehicle in vehiclesFromDb)
            {
                List<Rent> vehicleRents = _dbContext.Rents.Where(x => x.Vehicle.Id == vehicle.Id).ToList();
                if (IsVehicleUnavailable(startDate, endDate, vehicleRents))
                    continue;

                return vehicle;
            }

            return null;
        }

        public bool ReturnVehicle(Guid rentId)
        {
            var rentFromDb = _dbContext.Rents.FirstOrDefault(x => x.Id == rentId);

            if (rentFromDb == null || rentFromDb.ReturnTime.HasValue) return false;

            rentFromDb.ReturnTime = DateTime.UtcNow;
            _dbContext.SaveChanges();

            return true;
        }


        private static bool IsVehicleUnavailable(DateTime startDate, DateTime endDate, List<Rent> rents)
        {
            return rents.Exists(x => !x.ReturnTime.HasValue && (x.EndDate >= startDate && x.StartDate <= startDate || x.StartDate <= endDate && x.EndDate >= endDate));
        }
    }
}
