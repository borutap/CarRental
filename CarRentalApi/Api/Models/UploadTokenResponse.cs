using System;

namespace CarRentalApi.WebApi.Models
{
    public record UploadTokenResponse
    {
        public string UploadSasToken { get; init; }
        public DateTimeOffset ExpiresOn { get; init; }
    }
}
