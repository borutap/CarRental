using System;

namespace CarRentalApi.WebApi.Models
{
    public record SasTokenResponse
    {
        public string SasToken { get; init; }
        public DateTimeOffset ExpiresOn { get; init; }
    }
}
