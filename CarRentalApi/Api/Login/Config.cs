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
        public string UserTeacherClientId { get; set; }
        public string UserTeacherPassword { get; set; }
        public string UserTeacherScope { get; set; }
        public string IdentityServerUrl { get; set; }
        public string TeacherIdentityServerUrl { get; set; }
        public string GoogleClientId { get; set; }
    }
}
