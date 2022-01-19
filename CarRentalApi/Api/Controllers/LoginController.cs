using CarRentalApi.WebApi.Login;
using CarRentalApi.WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace CarRentalApi.WebApi.Controllers
{
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(IConfiguration configuration, ILoginService loginService)
        {
            _loginService = loginService;

            var config = new Config
            {
                UserClientId = configuration["userClientId"],
                UserPassword = configuration["userPassword"],
                UserScope = configuration["userScope"],
                WorkerClientId = configuration["workerClientId"],
                WorkerPassword = configuration["workerPassword"],
                WorkerScope = configuration["workerScope"],
                IdentityServerUrl = configuration["identityServerUrl"],
                // TODO na produkcji inny googleClientId - uzupelnic appsettings.json
                GoogleClientId = configuration["googleClientId"]
            };

            loginService.OnStartup(config);
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAccessTokenAsync([FromBody] LoginRequest request)
        {
            bool isWorker = false;

            if (request.Role == "worker")
                isWorker = true;
            else if (request.Role != "client")
                return Unauthorized();

            bool tokenValid = await _loginService.ValidateTokenAsync(request.GoogleIdToken);
            if (!tokenValid)
                return Unauthorized();

            var res = await _loginService.RequestTokenAsync(isWorker);
            if (res == null)
            {
                return NotFound(new { Error = "Identity server probably down" });
            }
            return Ok(res);
        }
    }
}
