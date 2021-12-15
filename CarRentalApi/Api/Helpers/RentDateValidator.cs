using System;

namespace CarRentalApi.WebApi.Helpers
{
    public class RentDateValidator
    {
        public static void Validate(DateTime startDate, DateTime endDate)
        {
            if (startDate < DateTime.UtcNow.Date) throw new InvalidOperationException($"startDay: {startDate} cannot be ealier than today! ");
            if (endDate < startDate) throw new InvalidOperationException($"endDate {endDate} cannot be ealier than startDay: {startDate}! ");
        }
    }
}
