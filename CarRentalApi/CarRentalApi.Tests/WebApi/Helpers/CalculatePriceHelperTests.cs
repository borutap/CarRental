using CarRentalApi.WebApi.Helpers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Globalization;

namespace CarRentalApi.Tests.WebApi.Helpers
{
    [TestClass]
    public class CalculatePriceHelperTests
    {
        [DataTestMethod]
        [DataRow(34, 5, "500.00", "500.00")]
        [DataRow(35, 5, "500.00", "450.00")]
        [DataRow(40, 5, "500.00", "450.00")]
        [DataRow(30, 9, "500.00", "500.00")]
        [DataRow(30, 10, "500.00", "400.00")]
        [DataRow(30, 15, "500.00", "400.00")]
        [DataRow(35, 10, "500.00", "350.00")]
        public void Calculate_ReturnsValidPrice_ForGivenArguments(int age, int yearsOfHavingDrivingLicense, string basePrice, string expectedPrice)
        {
            // arrange
            var decimalBasePrice = decimal.Parse(basePrice, CultureInfo.InvariantCulture);
            var decimalExpectedPrice = decimal.Parse(expectedPrice, CultureInfo.InvariantCulture);
            // act
            decimal actualPrice = CalculatePriceHelper.Calculate(decimalBasePrice, age, yearsOfHavingDrivingLicense);

            //assert
            Assert.AreEqual(actualPrice, decimalExpectedPrice);
        }

    }
}
