using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdentityServer
{
    public static class Config
    {
        internal static string userPassword;
        internal static string userClientId;
        internal static string workerPassword;
        internal static string workerClientId;
        internal static string introspectionSecret;

        public static IEnumerable<ApiScope> ApiScopes => new[] 
        {
            new ApiScope("carrentalapi.user"),
            new ApiScope("carrentalapi.worker")
        };

        public static IEnumerable<ApiResource> ApiResources => new[]
        {
            new ApiResource("carrentalapi")
            {
                Scopes = new List <string>
                {
                    "carrentalapi.user",
                    "carrentalapi.worker"
                },
                ApiSecrets = new List <Secret>
                {
                    new Secret(introspectionSecret.Sha256())
                },
                UserClaims = new List <string>
                {
                    "role"
                }
            }
        };

        public static IEnumerable<Client> Clients => new[]
        {
            new Client
            {
                ClientId = userClientId,
                ClientName = "Client Credentials Client",

                AllowedGrantTypes = GrantTypes.ClientCredentials,
                ClientSecrets = {
                    new Secret(userPassword.Sha256())
                },

                AllowedScopes = {
                    "carrentalapi.user"
                }
            },
            new Client
            {
                ClientId = workerClientId,
                ClientName = "Client Credentials Worker",

                AllowedGrantTypes = GrantTypes.ClientCredentials,
                ClientSecrets = {
                    new Secret(workerPassword.Sha256())
                },

                AllowedScopes = {
                    "carrentalapi.worker"
                }
            }
        };
    }
}