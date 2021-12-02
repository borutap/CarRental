using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRentalApi.Services.Models
{
    public record Rent
    {
        public Guid Id { get; init; }
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
        public DateTime CreationTime { get; init; }
        public DateTime? ReturnTime { get; set; }
        public Guid QuoteId { get; init; }
        public Guid ModelId { get; set; }
        public Guid VehicleId { get; set; }
    }
}
