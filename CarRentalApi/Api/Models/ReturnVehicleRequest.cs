using System;

namespace CarRentalApi.WebApi.Models
{
    public record ReturnVehicleRequest
    {
        public string Description { get; init; }
        public int OdometerValue { get; init; }
    }
}
