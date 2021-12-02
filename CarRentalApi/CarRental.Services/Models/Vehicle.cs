using System;
using System.Collections.Generic;

namespace Car_Rental.Models
{
    public record Vehicle
    {
        public Guid Id { get; init; }
        public int Year { get; init; }
        public int EnginePower { get; init; }
        public string EnginePowerType { get; init; }
        public int Capacity { get; init; }
        public string Description { get; init; }
        public List<RentDetails> RentDetails {get; set;}
    }

    public record RentDetails
    {
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
        public DateTime? ReturnDate { get; set; }
        public Guid RentId { get; init; }
    }
}