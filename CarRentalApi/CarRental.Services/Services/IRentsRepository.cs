using CarRentalApi.Services.Models;
using System;

namespace CarRentalApi.Services.Services
{
    public interface IRentsRepository
    {
        Rent Create(Rent rent);
        Rent ReturnVehicle(Guid rentId);
    }
}