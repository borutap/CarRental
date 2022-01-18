﻿// <auto-generated />
using System;
using CarRentalApi.Services.Databases;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CarRentalApi.Services.Migrations
{
    [DbContext(typeof(RentalDbContext))]
    partial class RentalDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.13")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CarRentalApi.Services.Models.Quote", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Currency")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ExpiredAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("GeneratedAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("ModelId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("Price")
                        .HasPrecision(14, 2)
                        .HasColumnType("decimal(14,2)");

                    b.Property<Guid?>("RentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("TeamName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ModelId");

                    b.HasIndex("RentId")
                        .IsUnique()
                        .HasFilter("[RentId] IS NOT NULL");

                    b.ToTable("Quotes");
                });

            modelBuilder.Entity("CarRentalApi.Services.Models.Rent", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ReturnTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid?>("VehicleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("VehicleId");

                    b.ToTable("Rents");
                });

            modelBuilder.Entity("CarRentalApi.Services.Models.Vehicle", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Capacity")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EnginePower")
                        .HasColumnType("int");

                    b.Property<string>("EnginePowerType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ModelId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Year")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Id");

                    b.HasIndex("ModelId");

                    b.ToTable("Vehicles");

                    b.HasData(
                        new
                        {
                            Id = new Guid("00d9804c-a5ad-4c44-94fc-d4a2e93c54ab"),
                            Capacity = 5,
                            Description = "Fiat Punto",
                            EnginePower = 120,
                            EnginePowerType = "PB",
                            ModelId = new Guid("933afee2-fbb1-4174-9fb4-16ac4b27a080"),
                            Year = 2005
                        },
                        new
                        {
                            Id = new Guid("fc16aa0a-47ca-4bb3-a3cd-083fde26ffe2"),
                            Capacity = 6,
                            Description = "Fiat Punto",
                            EnginePower = 140,
                            EnginePowerType = "PB",
                            ModelId = new Guid("933afee2-fbb1-4174-9fb4-16ac4b27a080"),
                            Year = 2002
                        },
                        new
                        {
                            Id = new Guid("064890bd-84d6-4263-b031-43a7a1641511"),
                            Capacity = 7,
                            Description = "Audi RS7",
                            EnginePower = 220,
                            EnginePowerType = "PB",
                            ModelId = new Guid("84d23d56-6be7-48e7-b0e1-51166a558009"),
                            Year = 2015
                        });
                });

            modelBuilder.Entity("CarRentalApi.Services.Models.VehicleModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Brand")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Currency")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("DefaultPrice")
                        .HasPrecision(14, 2)
                        .HasColumnType("decimal(14,2)");

                    b.Property<string>("Model")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("Brand", "Model");

                    b.ToTable("VehicleModels");

                    b.HasData(
                        new
                        {
                            Id = new Guid("933afee2-fbb1-4174-9fb4-16ac4b27a080"),
                            Brand = "Fiat",
                            Currency = "PLN",
                            DefaultPrice = 50m,
                            Model = "Punto"
                        },
                        new
                        {
                            Id = new Guid("84d23d56-6be7-48e7-b0e1-51166a558009"),
                            Brand = "Audi",
                            Currency = "PLN",
                            DefaultPrice = 80m,
                            Model = "RS7"
                        });
                });

            modelBuilder.Entity("CarRentalApi.Services.Models.Quote", b =>
                {
                    b.HasOne("CarRentalApi.Services.Models.VehicleModel", "Model")
                        .WithMany()
                        .HasForeignKey("ModelId");

                    b.HasOne("CarRentalApi.Services.Models.Rent", null)
                        .WithOne("Quote")
                        .HasForeignKey("CarRentalApi.Services.Models.Quote", "RentId");

                    b.Navigation("Model");
                });

            modelBuilder.Entity("CarRentalApi.Services.Models.Rent", b =>
                {
                    b.HasOne("CarRentalApi.Services.Models.Vehicle", "Vehicle")
                        .WithMany()
                        .HasForeignKey("VehicleId");

                    b.Navigation("Vehicle");
                });

            modelBuilder.Entity("CarRentalApi.Services.Models.Vehicle", b =>
                {
                    b.HasOne("CarRentalApi.Services.Models.VehicleModel", "Model")
                        .WithMany()
                        .HasForeignKey("ModelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Model");
                });

            modelBuilder.Entity("CarRentalApi.Services.Models.Rent", b =>
                {
                    b.Navigation("Quote");
                });
#pragma warning restore 612, 618
        }
    }
}
