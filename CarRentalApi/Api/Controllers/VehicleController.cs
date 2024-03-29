using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CarRentalApi.WebApi.Models;
using CarRentalApi.WebApi.Helpers;
using CarRentalApi.Services.Models;
using System;
using CarRentalApi.Services.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace CarRentalApi.WebApi.Controllers
{
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        private readonly IRentalRepository _rentalService;
        //private readonly IQuoteRepository _quoteRepository;
        //private readonly IRentsRepository _rentsRepository;

        public VehiclesController(IRentalRepository rentalService)
        {
            _rentalService = rentalService;
        }

        [HttpGet("vehicles")]
        public IEnumerable<VehicleModelResponse> GetVehicles()
        {
            var results = new List<VehicleModelResponse>();

            foreach (var vehicle in _rentalService.GetVehicles())
            {
                var modelFromDb = _rentalService.GetModel(vehicle.Model.Id);
                results.Add(new VehicleModelResponse
                {
                    BrandName = modelFromDb.Brand,
                    ModelName = modelFromDb.Model,
                    Capacity = vehicle.Capacity,
                    Description = vehicle.Description,
                    EnginePower = vehicle.EnginePower,
                    EnginePowerType = vehicle.EnginePowerType,
                    Id = vehicle.Id,
                    Year = vehicle.Year
                });
            }

            return results;
        }

        [HttpGet("rentedvehicles")]
        [Authorize("carrentalapi.logged")]
        public IEnumerable<RentedVehiclesResponse> GetRentedVehicles()
        {
            var results = new List<RentedVehiclesResponse>();

            foreach (var tuple in _rentalService.GetRentedVehicles())
            {
                var modelFromDb = _rentalService.GetModel(tuple.Item2.Model.Id);
                results.Add(new RentedVehiclesResponse
                {
                    RentId = tuple.Item1.Id,
                    Year = tuple.Item2.Year,
                    BrandName = modelFromDb.Brand,
                    ModelName = modelFromDb.Model,
                    EnginePower = tuple.Item2.EnginePower,
                    EnginePowerType = tuple.Item2.EnginePowerType,
                    Capacity = tuple.Item2.Capacity,
                    Description = tuple.Item2.Description,
                    StartDate = tuple.Item1.StartDate,
                    EndDate = tuple.Item1.EndDate,
                });
            }

            return results;
        }

        [HttpGet("rentedhistory")]
        [Authorize("carrentalapi.logged")]
        public IEnumerable<HistoricallyRentedVehiclesResponse> GetHistoricallyRentedVehicles()
        {
            var results = new List<HistoricallyRentedVehiclesResponse>();

            foreach (var tuple in _rentalService.GetHistoricallyRentedVehicles())
            {
                var modelFromDb = _rentalService.GetModel(tuple.Item2.Model.Id);
                results.Add(new HistoricallyRentedVehiclesResponse
                {
                    RentId = tuple.Item1.Id,
                    Year = tuple.Item2.Year,
                    BrandName = modelFromDb.Brand,
                    ModelName = modelFromDb.Model,
                    EnginePower = tuple.Item2.EnginePower,
                    EnginePowerType = tuple.Item2.EnginePowerType,
                    Capacity = tuple.Item2.Capacity,
                    Description = tuple.Item2.Description,
                    ReturnDescription = tuple.Item1.ReturnDescription,
                    OdometerValue = tuple.Item1.OdometerValue,
                    StartDate = tuple.Item1.StartDate,
                    EndDate = tuple.Item1.EndDate,
                    ReturnTime = tuple.Item1.ReturnTime
                });
            }

            return results;
        }

        [HttpPost("vehicle/{brand}/{model}")]
        [Authorize("carrentalapi.user")]
        public CheckPriceResponse GetModel(string brand, string model, [FromBody] CheckPriceRequest request)
        {
            var modelFromDb = _rentalService.GetModel(brand, model);

            if (modelFromDb == null) throw new InvalidOperationException($"VehicleModel with Brand {brand} and Model {model} does not exist");

            var price = CalculatePriceHelper.Calculate(modelFromDb.DefaultPrice, request.Age, request.YearsOfHavingDriverLicense);

            string teamName = "teamC";

            var quoteFromDb = _rentalService.CreateQuote(price, modelFromDb.Currency, modelFromDb.Id, teamName);

            return new CheckPriceResponse
            {
                Currency = modelFromDb.Currency,
                ExpiredAt = quoteFromDb.ExpiredAt,
                GeneratedAt = quoteFromDb.GeneratedAt,
                Price = price,
                QuoteId = quoteFromDb.Id
            };

        }

        [HttpPost("vehicle/{id}")]
        [Authorize("carrentalapi.user")]
        public CheckPriceResponse GetModelByID(Guid id, [FromBody] CheckPriceRequest request)
        {
            var modelFromDb = _rentalService.GetModelByVehicleId(id);

            if (modelFromDb == null) throw new InvalidOperationException($"Vehicle with Id {id} does not exist");

            var price = CalculatePriceHelper.Calculate(modelFromDb.DefaultPrice, request.Age, request.YearsOfHavingDriverLicense);

            string teamName = "teamC";

            var quoteFromDb = _rentalService.CreateQuote(price, modelFromDb.Currency, modelFromDb.Id, teamName);

            return new CheckPriceResponse
            {
                Currency = modelFromDb.Currency,
                ExpiredAt = quoteFromDb.ExpiredAt,
                GeneratedAt = quoteFromDb.GeneratedAt,
                Price = price,
                QuoteId = quoteFromDb.Id
            };
        }

        [HttpPost("vehicle/Rent/{quoteId}")]
        [Authorize("carrentalapi.user")]
        public RentVehicleResponse RentVehicle(Guid quoteId, [FromBody] RentVehicleRequest request)
        {
            var quoteFromDb = _rentalService.GetQuote(quoteId);
            if (quoteFromDb == null) throw new InvalidOperationException($"Quote with Id {quoteId} does not exist");

            var rent = new Rent
            {
                Id = Guid.NewGuid(),
                CreationTime = DateTime.UtcNow,
                Quote = quoteFromDb,
                StartDate = request.StartDate,
                EndDate = request.EndDate
            };

            RentDateValidator.Validate(request.StartDate, request.EndDate);

            Vehicle vehicle = _rentalService.GetFirstAvailableVehicle(quoteFromDb.Model.Id, request.StartDate, request.EndDate, rent.Id);

            if (vehicle == null) return null;

            rent.Vehicle = vehicle;

            _rentalService.CreateRent(rent);

            return new RentVehicleResponse
            {
                RentId = rent.Id,
                QuoteId = rent.Quote.Id,
                StartDate = rent.StartDate,
                EndDate = rent.EndDate,
                RentAt = rent.CreationTime
            };
        }

        [HttpPost("vehicle/Return/{rentId}")]
        [Authorize("carrentalapi.worker")]
        public ActionResult ReturnVehicle(Guid rentId, [FromBody] ReturnVehicleRequest request)
        {
            if (!_rentalService.ReturnVehicle(rentId, request.Description, request.OdometerValue))
            {
                throw new InvalidOperationException($"Cannot return vehicle with rentId {rentId}");
            }            
            return Ok();
        }

    }
}