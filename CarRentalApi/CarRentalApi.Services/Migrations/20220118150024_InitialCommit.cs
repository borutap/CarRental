using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarRentalApi.Services.Migrations
{
    public partial class InitialCommit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Audits",
                columns: table => new
                {
                    AuditID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Audits", x => x.AuditID);
                });

            migrationBuilder.CreateTable(
                name: "VehicleModels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Brand = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Model = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DefaultPrice = table.Column<decimal>(type: "decimal(14,2)", precision: 14, scale: 2, nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleModels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    EnginePower = table.Column<int>(type: "int", nullable: false),
                    EnginePowerType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Capacity = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vehicles_VehicleModels_ModelId",
                        column: x => x.ModelId,
                        principalTable: "VehicleModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    VehicleId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rents_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Quotes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GeneratedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpiredAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TeamName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModelId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    RentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(14,2)", precision: 14, scale: 2, nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quotes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Quotes_Rents_RentId",
                        column: x => x.RentId,
                        principalTable: "Rents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Quotes_VehicleModels_ModelId",
                        column: x => x.ModelId,
                        principalTable: "VehicleModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "VehicleModels",
                columns: new[] { "Id", "Brand", "Currency", "DefaultPrice", "Model" },
                values: new object[] { new Guid("933afee2-fbb1-4174-9fb4-16ac4b27a080"), "Fiat", "PLN", 50m, "Punto" });

            migrationBuilder.InsertData(
                table: "VehicleModels",
                columns: new[] { "Id", "Brand", "Currency", "DefaultPrice", "Model" },
                values: new object[] { new Guid("84d23d56-6be7-48e7-b0e1-51166a558009"), "Audi", "PLN", 80m, "RS7" });

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

            migrationBuilder.CreateIndex(
                name: "IX_Quotes_ModelId",
                table: "Quotes",
                column: "ModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Quotes_RentId",
                table: "Quotes",
                column: "RentId",
                unique: true,
                filter: "[RentId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Rents_VehicleId",
                table: "Rents",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleModels_Brand_Model",
                table: "VehicleModels",
                columns: new[] { "Brand", "Model" });

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_Id",
                table: "Vehicles",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_ModelId",
                table: "Vehicles",
                column: "ModelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Audits");

            migrationBuilder.DropTable(
                name: "Quotes");

            migrationBuilder.DropTable(
                name: "Rents");

            migrationBuilder.DropTable(
                name: "Vehicles");

            migrationBuilder.DropTable(
                name: "VehicleModels");
        }
    }
}
