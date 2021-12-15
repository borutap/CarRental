using System;
using System.Collections.Generic;
using System.Linq;
using Car_Rental.Models;
using CarRentalApi.Services.Models;

namespace Car_Rental.Services
{
    public class RentalServiceFakeDb : IRentalService
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
        private List<Rent> _quotes = new();
        private List<Quote> _rents = new();

        private const int ExpirationHours = 2;

        public Quote CreateQuote(decimal price, string currency, Guid modelId)
        {
            var now = DateTime.UtcNow;
            var quote = new Quote
            {
                QuoteId = Guid.NewGuid(),
                GeneratedAt = now,
                ExpiredAt = now.AddHours(ExpirationHours),
                ModelId = modelId,
                Price = price,
                Currency = currency
            };
            _rents.Add(quote);
            return quote;
        }

        public Quote GetQuote(Guid id)
        {
            return _rents.SingleOrDefault(q => q.QuoteId == id);
        }
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

        public Vehicle RentFirstAvailableVehicle(Guid modelId, DateTime startDate, DateTime endDate, Guid rentId)
        {
            ValidateRentDates(startDate, endDate);

            var vehiclesFromDb = _vehicles.Where(x => x.ModelId == modelId);

            foreach (var vehicle in vehiclesFromDb)
            {
                List<Rent> vehicleRents = GetRents().Where(x => x.VehicleId == vehicle.Id).ToList();
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
            return rents.Exists(x => !x.ReturnTime.HasValue && ((x.EndDate >= startDate && x.StartDate <= startDate) || (x.StartDate <= endDate && x.EndDate >= endDate)));
        }


        public Rent CreateRent(Rent rent)
        {
            _quotes.Add(rent);

            return rent;
        }

        public IEnumerable<Rent> GetRents()
        {
            return _quotes;
        }

        public void ReturnVehicle(Guid rentId)
        {
            var rent = _quotes.SingleOrDefault(x => x.Id == rentId);
            rent.ReturnTime = DateTime.UtcNow;
            _quotes[_quotes.IndexOf(rent)] = rent;
        }



    }
}