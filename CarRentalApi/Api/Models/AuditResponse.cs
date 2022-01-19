using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRentalApi.WebApi.Models
{
    public record AuditResponse
    {
        public string? TeamName { get; init; }
        public DateTime? TimeStamp { get; init; }
        public string? Method { get; init; }
        public long? Duration { get; init; }
        public string? Route { get; init; }
        public int? HttpStatus { get; init; }
        public string? Request { get; init; }
        public string? Response { get; init; }
        public bool? IsSwaggerCall { get; init; }
    }
}
