using System;

namespace CarRentalApi.WebApi.Models
{
    public record RentVehicleRequest
    {
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
    }
}
