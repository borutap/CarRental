using System.Threading.Tasks;

namespace CarRentalApi.WebApi.Login
{
    public interface ILoginService
    {
        void OnStartup(Config config);
        bool ValidateToken(string idToken);
        Task<LoginResponse> RequestTokenAsync(bool isWorker);
    }
}
