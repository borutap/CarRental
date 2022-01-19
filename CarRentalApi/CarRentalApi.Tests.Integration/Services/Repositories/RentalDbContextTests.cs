using CarRentalApi.Services.Databases;
using CarRentalApi.Services.Repositories;
using FluentAssertions;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace CarRentalApi.Tests.Integration.Services.Repositories
{
    [TestClass]
    public class RentalDbContextTests
    {
        private RentalDbContext _context;
        private IDbContextTransaction _transaction;
        private RentalRepository _repository;

        [TestInitialize]
        public void Init()
        {
            _context = RentalDbContextFactory.Create();
            _repository = new RentalRepository(_context);

            _transaction = _context.Database.BeginTransaction();
        }

        [TestCleanup]
        public void TestCleanup()
        {
            _transaction.Rollback();
        }

        [TestMethod]
        public void GetVehicles_ReturnsListOfVehicles_WhenExisting()
        {
            var vehicles = _repository.GetVehicles();
            vehicles.Should().HaveCount(3);
        }

        [TestMethod]
        public void GetVehicles_ReturnsIncreasedListOfVehicles_WhenNewVehicleAdded()
        {
            _repository.CreateVehicle(new CarRentalApi.Services.Models.Vehicle
            {
                Id = Guid.NewGuid(),
                Capacity = 234,
                Description = "New Test Vehicle",
                EnginePower = 1234,
                EnginePowerType = "Diesel",
                ModelId = Guid.Parse("84d23d56-6be7-48e7-b0e1-51166a558009"),
                Year = 2000
            });

            var vehicles = _repository.GetVehicles();
            vehicles.Should().HaveCount(4);
        }

    }
}
