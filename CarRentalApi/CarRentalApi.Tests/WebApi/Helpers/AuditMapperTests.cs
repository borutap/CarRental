using CarRentalApi.WebApi.Helpers;
using CarRentalApi.WebApi.Models;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRentalApi.Tests.WebApi.Helpers
{
    [TestClass]
    public class AuditMapperTests
    {
        [TestMethod]
        public void Map_ReturnsValidModel_ForGivenJson()
        {
            //arrange
            AuditResponse expectedAudit = new AuditResponse
            {
                Duration = 2109,
                HttpStatus = 200,
                IsSwaggerCall = true,
                Method = "POST VehiclesControler.GetModel",
                Request = "{\"Type\":\"application/json\",\"Length\":125}",
                Response = "{\"Type\":\"ObjectResult\",\"Value\":{\"Price\":50.00,\"Currency\":\"PLN\",\"GeneratedAt\":\"2022-01-18T15:23:42.2752373Z\",\"ExpiredAt\":\"2022-01-18T17:23:42.2752373Z\",\"QuoteId\":\"fe414f19-a7bf-46f0-5f8f-08d9da9682be\"}}",
                Route = @"https://localhost:44329/vehicle/Fiat/Punto",
                TeamName = "teamC",
                TimeStamp = DateTime.Parse("2022-01-18T15:23:40.3978577Z").ToUniversalTime()
            };
            string input = @"{""Action"":{""TraceId"":""80000028-0005-ff00-b63f-84710c7967bb"",""HttpMethod"":""POST"",""ControllerName"":""VehiclesControler"",""ActionName"":""GetModel"",""ActionParameters"":{""brand"":""Fiat"",""model"":""Punto"",""request"":{""Age"":0,""YearsOfHavingDriverLicense"":0,""RentDuration"":0,""Location"":""string"",""CurrentlyRentedCount"":0,""OverallRentedCount"":0}},""RequestUrl"":""https://localhost:44329/vehicle/Fiat/Punto"",""IpAddress"":""::1"",""ResponseStatus"":""OK"",""ResponseStatusCode"":200,""RequestBody"":{""Type"":""application/json"",""Length"":125},""ResponseBody"":{""Type"":""ObjectResult"",""Value"":{""Price"":50.00,""Currency"":""PLN"",""GeneratedAt"":""2022-01-18T15:23:42.2752373Z"",""ExpiredAt"":""2022-01-18T17:23:42.2752373Z"",""QuoteId"":""fe414f19-a7bf-46f0-5f8f-08d9da9682be""}}},""Environment"":{""UserName"":""A4BEE"",""MachineName"":""DESKTOP-J33HFV7"",""DomainName"":""DESKTOP-J33HFV7"",""CallingMethodName"":""CarRentalApi.WebApi.Controllers.VehiclesControler.GetModel()"",""AssemblyName"":""CarRentalApi.WebApi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null"",""Culture"":""pl-PL""},""EventType"":""POST VehiclesControler.GetModel"",""StartDate"":""2022-01-18T15:23:40.3978577Z"",""EndDate"":""2022-01-18T15:23:42.5071836Z"",""Duration"":2109}";

            //act
            var actualAudit = AuditMapper.Map(input);

            //assert
            actualAudit.Request.Should().BeEquivalentTo(expectedAudit.Request);
            actualAudit.Response.Should().BeEquivalentTo(expectedAudit.Response);
            actualAudit.Duration.Should().Be(expectedAudit.Duration);
            actualAudit.HttpStatus.Should().Be(expectedAudit.HttpStatus);
            actualAudit.IsSwaggerCall.Should().Be(expectedAudit.IsSwaggerCall);
            actualAudit.TeamName.Should().Be(expectedAudit.TeamName);
            actualAudit.Method.Should().Be(expectedAudit.Method);
            actualAudit.Route.Should().Be(expectedAudit.Route);
            actualAudit.TimeStamp.Should().Be(expectedAudit.TimeStamp);
        }
    }
}
