using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Text;

namespace IdentityServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Config.userClientId = Configuration["userClientId"];
            Config.userPassword = Configuration["userPassword"];
            Config.workerClientId = Configuration["workerClientId"];
            Config.workerPassword = Configuration["workerPassword"];
            Config.introspectionSecret = Configuration["introspectionSecret"];

            // DeveloperSigningCredential musi zostac usuniete na produkcji
            services.AddIdentityServer()
                .AddInMemoryClients(Config.Clients)
                .AddInMemoryApiResources(Config.ApiResources)
                .AddInMemoryApiScopes(Config.ApiScopes)
                .AddDeveloperSigningCredential();

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // WebApiAddress podajemy w appsettings.Development.json
                app.UseCors(
                    options => options.WithOrigins(Configuration["WebApiAddress"]).AllowAnyMethod().AllowAnyHeader()
                );
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseIdentityServer();

            string hello = "<a href=\".well-known/openid-configuration\">Konfiguracja OpenID</a>";
            byte[] bytes = Encoding.ASCII.GetBytes(hello);
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.BodyWriter.WriteAsync(bytes);
                });
            });
        }
    }
}
