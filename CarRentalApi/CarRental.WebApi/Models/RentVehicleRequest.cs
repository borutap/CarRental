using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRentalApi.WebApi.Models
{
    public record RentVehicleRequest
    {
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
    }
}
