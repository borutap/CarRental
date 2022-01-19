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
                UserTeacherClientId = configuration["userTeacherClientId"],
                UserTeacherPassword = configuration["userTeacherPassword"],
                UserTeacherScope = configuration["userTeacherScope"],
                WorkerClientId = configuration["workerClientId"],
                WorkerPassword = configuration["workerPassword"],
                WorkerScope = configuration["workerScope"],
                IdentityServerUrl = configuration["identityServerUrl"],
                TeacherIdentityServerUrl = configuration["teacherIdentityServerUrl"],
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

            var ourRes = await _loginService.RequestOurTokenAsync(isWorker);
            var teacherRes = await _loginService.RequestTeacherTokenAsync();
            var invalidResponse = new LoginResponse();
            if (ourRes == null && teacherRes == null)
            {
                return NotFound(new { Error = "Identity server probably down" });
            }
            if (ourRes == null)
            {            
                return Ok(new[] { invalidResponse, teacherRes });
            }
            if (teacherRes == null)
            {
                return Ok(new[] { ourRes, invalidResponse });
            }
            return Ok(new[] { ourRes, teacherRes });
        }
    }
}
