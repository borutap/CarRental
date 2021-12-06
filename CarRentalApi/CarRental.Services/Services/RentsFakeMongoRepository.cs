using CarRentalApi.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRentalApi.Services.Services
{
    public class RentsFakeMongoRepository : IRentsRepository
    {
        private List<Rent> _quotes = new List<Rent>();

        public Rent Create(Rent rent)
        {
            _quotes.Add(rent);

            return rent;
        }

        public Rent ReturnVehicle(Guid rentId)
        {
            var rent = _quotes.SingleOrDefault(x => x.Id == rentId);
            rent.ReturnTime = DateTime.UtcNow;
            _quotes[_quotes.IndexOf(rent)] = rent;

            return rent;
        }
    }
}
