using CarRentalApi.Services.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CarRentalApi.Services.Databases
{
    public class RentalDbContext : DbContext
    {
        public RentalDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<VehicleModel> VehicleModels { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Rent> Rents { get; set; }
        public DbSet<Quote> Quotes { get; set; }
        public DbSet<Audit> Audits { get; set; }

         
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vehicle>()
                .HasOne(x => x.Model)
                .WithMany()
                .HasForeignKey(x => x.ModelId);

            modelBuilder.Entity<Quote>()
                .HasOne(x => x.Model)
                .WithMany();

            modelBuilder.Entity<Quote>()
                .Property(nameof(Quote.Price))
                .HasPrecision(14,2);

            modelBuilder.Entity<Rent>()
                .HasOne(x => x.Vehicle)
                .WithMany();

            modelBuilder.Entity<Rent>()
                .HasOne(x => x.Quote)
                .WithOne()
                .HasForeignKey<Quote>(x => x.RentId);

            modelBuilder.Entity<VehicleModel>()
               .Property(nameof(VehicleModel.DefaultPrice))
               .HasPrecision(14, 2);

            SeedData(modelBuilder);
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseLazyLoadingProxies();



        private void SeedData(ModelBuilder modelBuilder)
        {
            var models = new[]
            {
                new VehicleModel
                {
                    Id = Guid.Parse("933afee2-fbb1-4174-9fb4-16ac4b27a080"),
                    Brand = "Fiat",
                    Model = "Punto",
                    DefaultPrice = 50M,
                    Currency = "PLN"
                },
                new VehicleModel
                {
                    Id = Guid.Parse("84d23d56-6be7-48e7-b0e1-51166a558009"),
                    Brand = "Audi",
                    Model = "RS7",
                    DefaultPrice = 80M,
                    Currency = "PLN"
                }
            };

            var vehicles = new[]
            {
                new Vehicle
                {
                    Id = Guid.NewGuid(),
                    EnginePower = 120,
                    EnginePowerType = "PB",
                    Capacity = 5,
                    Description = "Fiat Punto",
                    Year = 2005,
                    ModelId = models[0].Id
                },
                new Vehicle
                {
                    Id = Guid.NewGuid(),
                    EnginePower = 140,
                    EnginePowerType = "PB",
                    Capacity = 6,
                    Description = "Fiat Punto",
                    Year = 2002,
                    ModelId = models[0].Id
                },
                new Vehicle
                {
                    Id = Guid.NewGuid(),
                EnginePower = 220,
                EnginePowerType = "PB",
                Capacity = 7,
                Description = "Audi RS7",
                Year = 2015,
                ModelId = models[1].Id
                },
            };

            modelBuilder.Entity<VehicleModel>().HasData(models);
            modelBuilder.Entity<Vehicle>().HasData(vehicles);
        }

        public void AddCascadingObject(object rootEntity)
        {
            ChangeTracker.TrackGraph(
                rootEntity,
                node =>
                    node.Entry.State = !node.Entry.IsKeySet ? EntityState.Added : EntityState.Unchanged
            );

        }
    }
}
