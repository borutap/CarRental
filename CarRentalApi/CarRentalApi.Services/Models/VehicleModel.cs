using System;
using System.ComponentModel.DataAnnotations;

namespace CarRentalApi.Services.Models
{
    public record VehicleModel
    {
        [Key]
        public Guid Id { get; set; }
        public string Brand { get; init; }
        public string Model { get; init; }
        public decimal DefaultPrice { get; init; }
        public string Currency { get; init; }
    }
}