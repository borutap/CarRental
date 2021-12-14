using CarRentalApi.Services.Models;
using System;
using System.Collections.Generic;

namespace CarRentalApi.Services.Services
{
    public interface IRentsRepository
    {
        Rent Create(Rent rent);
        void ReturnVehicle(Guid rentId);
        IEnumerable<Rent> GetRents();

    }
}