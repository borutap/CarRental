using CarRentalApi.Services.Databases;
using CarRentalApi.Services.Repositories;
using CarRentalApi.WebApi.Controllers;
using CarRentalApi.WebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Xunit;
using System.Linq;

namespace CarRentalApi.Tests.WebApi.Controllers
{

    public class VehicleControllerTests
    {

        [Fact]
        public void VehicleControllerListsVehiclesFromDb()
        {
            DbContextOptionsBuilder<RentalDbContext> optionsBuilder = new();

            IEnumerable<VehicleModelResponse> result;
            using (RentalDbContext ctx = new(optionsBuilder.Options))
            {
                RentalRepository repo = new RentalRepository(ctx);
                var controller = new VehiclesController(repo);
                result = controller.GetVehicles();
            }

            var vehicle = result.ToList()[0];
            Assert.Equal("Audi", vehicle.Brand);
        }
    }
}
