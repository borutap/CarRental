using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRentalApi.WebApi.Models
{
    public class AddModelRequest
    {
        public string Brand { get; init; }
        public string Model { get; init; }
        public decimal DefaultPrice { get; init; }
        public string Currency { get; init; }
    }
}
