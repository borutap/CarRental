using Audit.Core;
using Audit.WebApi;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace CarRentalApi.WebApi.AuditConfiguration
{
    public static class AuditConfiguration
    {
        public static void AddAudit(MvcOptions mvcOptions)
        {
            mvcOptions.AddAuditFilter(config => config
                .LogAllActions()
                .WithEventType("{verb} {controller}.{action}")
                .IncludeRequestBody()
                .IncludeHeaders()
                .IncludeResponseBody()
            );
        }

        // Configures what and how is logged or is not logged
        public static void ConfigureAudit(IServiceCollection serviceCollection, IConfiguration Configuration)
        {
            Audit.Core.Configuration.Setup()
                .UseSqlServer(_ => _
                .ConnectionString(Configuration["connectionString"])
                .TableName("Audits")
                .IdColumnName("AuditID")
                .JsonColumnName("Data"));

            //Audit.Core.Configuration.AddCustomAction(ActionType.OnEventSaving, scope =>
            //{
            //    var auditAction = scope.Event.GetWebApiAuditAction();
            //    if (auditAction == null)
            //    {
            //        return;
            //    }

            //    // Removing sensitive headers
            //    auditAction.Headers.Remove("Authorization");

            //    // Adding custom details to the log
            //    scope.Event.CustomFields.Add("User", new { Name = "UserName", Id = "1234" });

            //    // Removing request body conditionally as an example
            //    if (auditAction.HttpMethod.Equals("DELETE"))
            //    {
            //        auditAction.RequestBody = null;
            //    }
            //});
        }
    }
}
