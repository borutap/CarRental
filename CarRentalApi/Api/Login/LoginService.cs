using System.Text.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System;
using Google.Apis.Auth;

namespace CarRentalApi.WebApi.Login
{
    public class LoginService : ILoginService
    {
        private readonly HttpClient client = new();
        private readonly Dictionary<string, string> userBody = new();
        private readonly Dictionary<string, string> workerBody = new();
        private string identityServer;
        private string googleClientId;

        public LoginService()
        {
        }

        public void OnStartup(Config config)
        {
            // TODO na produkcji dodac identityServerUrl do appsettings.json
            identityServer = $"{config.IdentityServerUrl}/connect/token";
            googleClientId = config.GoogleClientId;

            userBody.Add("client_id", config.UserClientId);
            userBody.Add("scope", config.UserScope);
            userBody.Add("client_secret", config.UserPassword);
            userBody.Add("grant_type", "client_credentials");

            workerBody.Add("client_id", config.WorkerClientId);
            workerBody.Add("scope", config.WorkerScope);
            workerBody.Add("client_secret", config.WorkerPassword);
            workerBody.Add("grant_type", "client_credentials");
        }

        public async Task<bool> ValidateTokenAsync(string idToken)
        {
            var validationSettings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new string[] { googleClientId }
            };
            try
            {                
                var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, validationSettings);
            }
            catch
            {
                return false;
            }
            return true;
        }

        public async Task<LoginResponse> RequestTokenAsync(bool isWorker)
        {
            var req = new HttpRequestMessage(HttpMethod.Post, identityServer) { Content = new FormUrlEncodedContent(isWorker ? workerBody : userBody) };
            try
            {
                var res = await client.SendAsync(req);
                var resString = await res.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<LoginResponse>(resString);
                return result;
            }
            catch
            {
                return null;
            }            
        }

    }
}
