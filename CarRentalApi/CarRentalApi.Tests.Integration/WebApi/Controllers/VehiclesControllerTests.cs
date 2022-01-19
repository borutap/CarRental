using Api;
using CarRentalApi.WebApi.Models;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace CarRentalApi.Tests.Integration
{
    [TestClass]
    public class VehiclesControllerTests
    {
        private HttpClient _client;

        public VehiclesControllerTests()
        {
            _client = new CustomWebApplicationFactory<Startup>().CreateClient();
        }

        [TestMethod]
        public async Task GetVehicles_ReturnsListOfVehicles_WhenExisting()
        {
            // arrange
            var expectedNumberOfSeededVehicles = 3;

            // act
            var httpResponse = await _client.GetAsync("/vehicles");

            var json = await httpResponse.Content.ReadAsStringAsync();
            var vehicles = JsonSerializer.Deserialize<List<VehicleModelResponse>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            // assert 
            httpResponse.IsSuccessStatusCode.Should().BeTrue();
            vehicles.Should().HaveCount(expectedNumberOfSeededVehicles);
        }
    }
}
