using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Car_Rental.Services;
using Car_Rental.Models;

namespace Car_Rental.Controllers
{
    [ApiController]
    [Route("vehicle")]

    public class VehiclesControler: ControllerBase
    {
        private readonly VehiclesFakeMongo repository;

        public VehiclesControler()
        {
            repository = new VehiclesFakeMongo();
        }

        [HttpGet]
        public IEnumerable<Vehicle> GetVehicles()
        {
            return repository.GetVehicles();
        }

        [HttpGet("{brand}/{model}")]
        public Model GetModel(string brand, string model)
        {
            return repository.GetModel(brand, model);
        }
    }
}