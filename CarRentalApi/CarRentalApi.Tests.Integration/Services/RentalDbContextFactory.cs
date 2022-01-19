using CarRentalApi.Services.Databases;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading;

namespace CarRentalApi.Tests.Integration.Services
{
    public static class RentalDbContextFactory
    {
        private static RentalDbContext _context;

        static RentalDbContextFactory()
        {
            var serviceProvider = new ServiceCollection()
           .AddEntityFrameworkSqlite()
           .AddEntityFrameworkProxies()
           .BuildServiceProvider();

            var connectionStringBuilder = new SqliteConnectionStringBuilder
            { DataSource = ":memory:" };
            var connectionString = connectionStringBuilder.ToString();

            var connection = new SqliteConnection(connectionString);

            connection.Open();
            var builder = new DbContextOptionsBuilder<RentalDbContext>();

            builder.UseSqlite(connection)
                .UseInternalServiceProvider(serviceProvider);

            var context = new RentalDbContext(builder.Options);
            context.Database.EnsureCreated();

            _context =  context;
        }

        public static RentalDbContext Create()
        {
            return _context;
        }
    }
}
