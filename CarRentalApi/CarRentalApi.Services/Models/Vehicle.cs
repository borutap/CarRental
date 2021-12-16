using System;
using System.ComponentModel.DataAnnotations;

namespace CarRentalApi.Services.Models
{
    public record Vehicle
    {
        [Key]
        public Guid Id { get; init; }
        public int Year { get; init; }
        public int EnginePower { get; init; }
        public string EnginePowerType { get; init; }
        public int Capacity { get; init; }
        public string Description { get; init; }
        public Guid ModelId { get; init; }
        public virtual VehicleModel Model { get; init; }
    }
}