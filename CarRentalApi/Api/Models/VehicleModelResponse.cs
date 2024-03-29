using System;

namespace CarRentalApi.WebApi.Models
{
    public record VehicleModelResponse
    {
        public Guid Id { get; init; }
        public int Year { get; init; }
        public string BrandName { get; init; }
        public string ModelName { get; init; }
        public int EnginePower { get; init; }
        public string EnginePowerType { get; init; }
        public int Capacity { get; init; }
        public string Description { get; init; }

    }
}