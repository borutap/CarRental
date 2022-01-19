using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarRentalApi.Services.Migrations
{
    public partial class ReturnDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "Id",
                keyValue: new Guid("5511e3a6-c900-4e33-b593-1f8d21943882"));

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "Id",
                keyValue: new Guid("93766d8c-9f61-42bf-ac1c-c62346601040"));

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "Id",
                keyValue: new Guid("dbe28e09-94ba-4f3d-99e5-7eaa15c2fb02"));

            migrationBuilder.AddColumn<int>(
                name: "OdometerValue",
                table: "Rents",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReturnDescription",
                table: "Rents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Vehicles",
                columns: new[] { "Id", "Capacity", "Description", "EnginePower", "EnginePowerType", "ModelId", "Year" },
                values: new object[] { new Guid("066bc75d-8adf-4ead-a07b-fa3b0e6711b4"), 5, "Fiat Punto", 120, "PB", new Guid("933afee2-fbb1-4174-9fb4-16ac4b27a080"), 2005 });

            migrationBuilder.InsertData(
                table: "Vehicles",
                columns: new[] { "Id", "Capacity", "Description", "EnginePower", "EnginePowerType", "ModelId", "Year" },
                values: new object[] { new Guid("74f07646-4edf-478f-924a-eb017fbb865b"), 6, "Fiat Punto", 140, "PB", new Guid("933afee2-fbb1-4174-9fb4-16ac4b27a080"), 2002 });

            migrationBuilder.InsertData(
                table: "Vehicles",
                columns: new[] { "Id", "Capacity", "Description", "EnginePower", "EnginePowerType", "ModelId", "Year" },
                values: new object[] { new Guid("aca9d20f-32f4-4ccf-a4a2-2b0389962412"), 7, "Audi RS7", 220, "PB", new Guid("84d23d56-6be7-48e7-b0e1-51166a558009"), 2015 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "Id",
                keyValue: new Guid("066bc75d-8adf-4ead-a07b-fa3b0e6711b4"));

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "Id",
                keyValue: new Guid("74f07646-4edf-478f-924a-eb017fbb865b"));

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "Id",
                keyValue: new Guid("aca9d20f-32f4-4ccf-a4a2-2b0389962412"));

            migrationBuilder.DropColumn(
                name: "OdometerValue",
                table: "Rents");

            migrationBuilder.DropColumn(
                name: "ReturnDescription",
                table: "Rents");

            migrationBuilder.InsertData(
                table: "Vehicles",
                columns: new[] { "Id", "Capacity", "Description", "EnginePower", "EnginePowerType", "ModelId", "Year" },
                values: new object[] { new Guid("93766d8c-9f61-42bf-ac1c-c62346601040"), 5, "Fiat Punto", 120, "PB", new Guid("933afee2-fbb1-4174-9fb4-16ac4b27a080"), 2005 });

            migrationBuilder.InsertData(
                table: "Vehicles",
                columns: new[] { "Id", "Capacity", "Description", "EnginePower", "EnginePowerType", "ModelId", "Year" },
                values: new object[] { new Guid("dbe28e09-94ba-4f3d-99e5-7eaa15c2fb02"), 6, "Fiat Punto", 140, "PB", new Guid("933afee2-fbb1-4174-9fb4-16ac4b27a080"), 2002 });

            migrationBuilder.InsertData(
                table: "Vehicles",
                columns: new[] { "Id", "Capacity", "Description", "EnginePower", "EnginePowerType", "ModelId", "Year" },
                values: new object[] { new Guid("5511e3a6-c900-4e33-b593-1f8d21943882"), 7, "Audi RS7", 220, "PB", new Guid("84d23d56-6be7-48e7-b0e1-51166a558009"), 2015 });
        }
    }
}
