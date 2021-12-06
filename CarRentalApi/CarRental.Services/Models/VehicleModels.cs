using System;
using System.Collections.Generic;

namespace Car_Rental.Models
{
    public record VehicleModel
    {
        public Guid Id;
        public string Brand  { get; init; }
        public string Model { get; init; }
        public decimal DefaultPrice { get; init; }
        public List<Vehicle> Vehicles { get; init; }
        public string Currency { get; init; }
    }
}