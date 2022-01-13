﻿using System;

namespace CarRentalApi.WebApi.Models
{
    public record HistoricallyRentedVehiclesResponse
    {
        public Guid RentId { get; init; }
        public int Year { get; init; }
        public string Brand { get; init; }
        public string Model { get; init; }
        public int EnginePower { get; init; }
        public string EnginePowerType { get; init; }
        public int Capacity { get; init; }
        public string Description { get; init; }
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
        public DateTime? ReturnTime { get; init; }
    }
}