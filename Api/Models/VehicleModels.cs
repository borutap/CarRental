using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Rental.Models
{
    public record Model
    {
        public Guid Id;
        public string brand  { get; init; }
        public string model { get; init; }
        public double defaultPrice { get; init; }
        public List<string> vehiclesID { get; init; }
        public string currency { get; init; }
    }
}