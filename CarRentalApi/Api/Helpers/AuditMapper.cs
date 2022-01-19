using CarRentalApi.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.IO;
using System.Threading;

namespace CarRentalApi.WebApi.Helpers
{
    public static class AuditMapper
    {
        

        public static AuditResponse Map(string audit)
        {
            var definition = new
            {
                Action = new
                {
                    RequestUrl = "",
                    ResponseStatusCode = default(int),
                    RequestBody = default(object),
                    ResponseBody = default(object),
                },
                StartDate = default(DateTime),
                Duration = default(int),
                EventType = ""
            };
            
            var response = JsonSerializerExtensions.DeserializeAnonymousType(audit, definition);

            return new AuditResponse
            {
                Duration = response.Duration,
                HttpStatus = response.Action?.ResponseStatusCode,
                IsSwaggerCall = true,
                Method = response.EventType,
                Request = Convert.ToString(response.Action.RequestBody),
                Response = Convert.ToString(response.Action.ResponseBody),
                Route = response.Action.RequestUrl,
                TeamName = "teamC",
                TimeStamp = response.StartDate
            };
        }

        public static partial class JsonSerializerExtensions
        {
            public static T DeserializeAnonymousType<T>(string json, T anonymousTypeObject, JsonSerializerOptions options = default)
                => JsonSerializer.Deserialize<T>(json, options );

            public static ValueTask<TValue> DeserializeAnonymousTypeAsync<TValue>(Stream stream, TValue anonymousTypeObject, JsonSerializerOptions options = default, CancellationToken cancellationToken = default)
                => JsonSerializer.DeserializeAsync<TValue>(stream, options, cancellationToken); // Method to deserialize from a stream added for completeness
        }
    }
}
