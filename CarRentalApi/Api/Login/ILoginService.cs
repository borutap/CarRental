using System.Threading.Tasks;

namespace CarRentalApi.WebApi.Login
{
    public interface ILoginService
    {
        void OnStartup(Config config);
        Task<bool> ValidateTokenAsync(string idToken);
        Task<LoginResponse> RequestTokenAsync(bool isWorker);
    }
}
