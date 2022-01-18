namespace CarRentalApi.WebApi.Models
{
    public class LoginRequest
    {
        public string GoogleIdToken { get; set; }
        public string Role { get; set; }
    }
}
