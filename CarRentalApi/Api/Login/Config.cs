namespace CarRentalApi.WebApi.Login
{
    public class Config
    {
        public string UserClientId { get; set; }
        public string UserPassword { get; set; }
        public string UserScope { get; set; }
        public string WorkerClientId { get; set; }
        public string WorkerPassword { get; set; }
        public string WorkerScope { get; set; }
        public string IdentityServerUrl { get; set; }
    }
}
