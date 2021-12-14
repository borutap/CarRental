namespace CarRentalApi.WebApi.Helpers
{
    public static class CalculatePriceHelper
    {
        private static decimal GetAgeDiscount(int age)
        {
            return (decimal)(age < 35 ? 0 : 0.1d);
        }

        private static decimal GetLicenseDiscount(int years)
        {
            return (decimal)(years < 10 ? 0 : 0.2d);
        }

        public static decimal Calculate(decimal basePrice, int age, int yearsOfHavingDriverLicense)
        {
            return basePrice - basePrice * (GetAgeDiscount(age) + GetLicenseDiscount(yearsOfHavingDriverLicense));
        }
    }
}
