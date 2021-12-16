using System;
using System.ComponentModel.DataAnnotations;

namespace CarRentalApi.Services.Models
{
    public record Rent
    {
        [Key]
        public Guid Id { get; init; }
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
        public DateTime CreationTime { get; init; }
        public DateTime? ReturnTime { get; set; }
        public virtual Quote Quote { get; init; }
        public virtual Vehicle Vehicle { get; set; }
    }
}
