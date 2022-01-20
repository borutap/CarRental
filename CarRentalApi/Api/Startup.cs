using CarRentalApi.Services.Databases;
using CarRentalApi.Services.Repositories;
using CarRentalApi.WebApi.Attachment;
using CarRentalApi.WebApi.Login;
using CarRentalApi.WebApi.AuditConfiguration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System;
using System.Collections.Generic;

namespace Api
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
            services.AddScoped<IRentalRepository, RentalRepository>();
            services.AddScoped<ILoginService, LoginService>();
            services.AddScoped<IAttachmentService, AttachmentService>();

            services.AddDbContext<RentalDbContext>(x => x.UseSqlServer(Configuration["connectionString"]));

            services.AddControllers(configure =>
            {
                AuditConfiguration.ConfigureAudit(services);
                AuditConfiguration.AddAudit(configure);
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
                c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Description = "Application: API - Swagger",
                    Flows = new OpenApiOAuthFlows()
                    {
                        ClientCredentials = new OpenApiOAuthFlow()
                        {
                            TokenUrl = new Uri($"{Configuration["identityServerUrl"]}/connect/token"),
                            Scopes = new Dictionary<string, string>
                            {
                                { Configuration["userScope"], "API Client access" },
                                { Configuration["workerScope"], "API Worker access" }
                            }
                        }
                    }
                });
                c.OperationFilter<SecurityRequirementsOperationFilter>();
            });
            services.AddCors();
            services.AddAuthentication("Bearer")
                .AddIdentityServerAuthentication("Bearer", options =>
                {
                    options.ApiName = "carrentalapi";
                    options.Authority = Configuration["identityServerUrl"];
                });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("carrentalapi.worker", policy =>
                {
                    policy.RequireClaim("scope", Configuration["workerScope"]);
                });
                options.AddPolicy("carrentalapi.user", policy =>
                {
                    policy.RequireClaim("scope", Configuration["userScope"]);
                });
                options.AddPolicy("carrentalapi.logged", policy =>
                {
                    policy.RequireAssertion(context =>
                    {
                        return context.User.HasClaim("scope", Configuration["userScope"]) ||
                            context.User.HasClaim("scope", Configuration["workerScope"]);
                    });
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api v1"));
                app.UseCors(
                    options => options.WithOrigins("http://localhost:8080").AllowAnyMethod().AllowAnyHeader()
                );
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
