using System.Text.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System;

namespace CarRentalApi.WebApi.Login
{
    public class LoginService : ILoginService
    {
        private readonly HttpClient client = new();
        private readonly Dictionary<string, string> userBody = new();
        private readonly Dictionary<string, string> workerBody = new();
        private string identityServer;

        public LoginService()
        {
        }

        public void OnStartup(Config config)
        {
            // TODO na produkcji dodac identityServerUrl do appsettings.json
            identityServer = $"{config.IdentityServerUrl}/connect/token";

            userBody.Add("client_id", config.UserClientId);
            userBody.Add("scope", config.UserScope);
            userBody.Add("client_secret", config.UserPassword);
            userBody.Add("grant_type", "client_credentials");

            workerBody.Add("client_id", config.WorkerClientId);
            workerBody.Add("scope", config.WorkerScope);
            workerBody.Add("client_secret", config.WorkerPassword);
            workerBody.Add("grant_type", "client_credentials");
        }

        public bool ValidateToken(string idToken)
        {
            // Tu bedzie Google
            if (idToken != "abcd1234")
            {
                return false;
            }
            return true;
        }

        public async Task<LoginResponse> RequestTokenAsync(bool isWorker)
        {
            try
            {
                var req = new HttpRequestMessage(HttpMethod.Post, identityServer) { Content = new FormUrlEncodedContent(isWorker ? workerBody : userBody) };
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
