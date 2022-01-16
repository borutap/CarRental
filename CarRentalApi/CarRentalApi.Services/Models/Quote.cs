using System;
using System.ComponentModel.DataAnnotations;

namespace CarRentalApi.Services.Models
{
    public record Quote
    {
        [Key]
        public Guid Id { get; init; }
        public DateTime GeneratedAt { get; init; }
        public DateTime ExpiredAt { get; init; }
        public string TeamName { get; init; }
        public virtual VehicleModel Model { get; init; }
        public Guid? RentId { get; init; }
        public decimal Price { get; init; }
        public string Currency { get; init; }
    }
}
