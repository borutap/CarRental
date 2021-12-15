using System;
using System.Collections.Generic;

namespace Car_Rental.Models
{
    public record Vehicle
    {
        public Guid Id { get; init; }
        public int Year { get; init; }
        public int EnginePower { get; init; }
        public string EnginePowerType { get; init; }
        public int Capacity { get; init; }
        public string Description { get; init; }
        public Guid ModelId { get; init; }
    }
}