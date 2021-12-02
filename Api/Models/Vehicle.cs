using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Rental.Models
{
    public record Vehicle
    {
        public Guid Id { get; init; }

        public string brandModel { get; init; }
        public string modelName { get; init; }
        public int year { get; init; }
        public int enginePower { get; init; }
        public string enginePowerType { get; init; }
        public int capacity { get; init; }
        public string description { get; init; }

    }
}