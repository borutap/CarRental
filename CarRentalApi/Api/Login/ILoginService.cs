using System.Threading.Tasks;

namespace CarRentalApi.WebApi.Login
{
    public interface ILoginService
    {
        void OnStartup(Config config);
        Task<bool> ValidateTokenAsync(string idToken);
        Task<LoginResponse> RequestOurTokenAsync(bool isWorker);
        Task<LoginResponse> RequestTeacherTokenAsync();
    }
}
