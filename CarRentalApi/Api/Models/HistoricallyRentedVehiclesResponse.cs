using System;

namespace CarRentalApi.WebApi.Models
{
    public record HistoricallyRentedVehiclesResponse
    {
        public Guid RentId { get; init; }
        public int Year { get; init; }
        public string BrandName { get; init; }
        public string ModelName { get; init; }
        public int EnginePower { get; init; }
        public string EnginePowerType { get; init; }
        public int Capacity { get; init; }
        public string Description { get; init; }
        public string ReturnDescription { get; init; }
        public int OdometerValue { get; init; }
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
        public DateTime? ReturnTime { get; init; }
    }
}
