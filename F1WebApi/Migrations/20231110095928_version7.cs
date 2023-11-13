using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace F1WebApi.Migrations
{
    /// <inheritdoc />
    public partial class version7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cars");

            migrationBuilder.DropColumn(
                name: "NumberOfLaps",
                table: "Races");

            migrationBuilder.RenameColumn(
                name: "Manufacturer",
                table: "Teams",
                newName: "WorldChampionships");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Teams",
                newName: "TechnicalChief");

            migrationBuilder.RenameColumn(
                name: "CarImageDriver2",
                table: "Teams",
                newName: "TeamChief");

            migrationBuilder.RenameColumn(
                name: "CarImageDriver1",
                table: "Teams",
                newName: "PowerUnit");

            migrationBuilder.RenameColumn(
                name: "Nationality",
                table: "Drivers",
                newName: "Team");

            migrationBuilder.RenameColumn(
                name: "Age",
                table: "Drivers",
                newName: "WorldChampionships");

            migrationBuilder.AddColumn<string>(
                name: "Base",
                table: "Teams",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Chassis",
                table: "Teams",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FastestLaps",
                table: "Teams",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstTeamEntry",
                table: "Teams",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullTeamName",
                table: "Teams",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HighestRaceFinish",
                table: "Teams",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Teams",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PolePositions",
                table: "Teams",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CircuitName",
                table: "Races",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfRace",
                table: "Races",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "FastestLap",
                table: "Races",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Races",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<TimeSpan>(
                name: "RaceDuration",
                table: "Races",
                type: "TEXT",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Drivers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "Drivers",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "GrandsPrixEntered",
                table: "Drivers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "HighestGridPosition",
                table: "Drivers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "HighestRaceFinish",
                table: "Drivers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PlaceOfBirth",
                table: "Drivers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Podiums",
                table: "Drivers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Points",
                table: "Drivers",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Base",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "Chassis",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "FastestLaps",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "FirstTeamEntry",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "FullTeamName",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "HighestRaceFinish",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "PolePositions",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "CircuitName",
                table: "Races");

            migrationBuilder.DropColumn(
                name: "DateOfRace",
                table: "Races");

            migrationBuilder.DropColumn(
                name: "FastestLap",
                table: "Races");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Races");

            migrationBuilder.DropColumn(
                name: "RaceDuration",
                table: "Races");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "GrandsPrixEntered",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "HighestGridPosition",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "HighestRaceFinish",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "PlaceOfBirth",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "Podiums",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "Points",
                table: "Drivers");

            migrationBuilder.RenameColumn(
                name: "WorldChampionships",
                table: "Teams",
                newName: "Manufacturer");

            migrationBuilder.RenameColumn(
                name: "TechnicalChief",
                table: "Teams",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "TeamChief",
                table: "Teams",
                newName: "CarImageDriver2");

            migrationBuilder.RenameColumn(
                name: "PowerUnit",
                table: "Teams",
                newName: "CarImageDriver1");

            migrationBuilder.RenameColumn(
                name: "WorldChampionships",
                table: "Drivers",
                newName: "Age");

            migrationBuilder.RenameColumn(
                name: "Team",
                table: "Drivers",
                newName: "Nationality");

            migrationBuilder.AddColumn<int>(
                name: "NumberOfLaps",
                table: "Races",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Chassis = table.Column<string>(type: "TEXT", nullable: true),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: true),
                    Motor = table.Column<string>(type: "TEXT", nullable: true),
                    Place = table.Column<int>(type: "INTEGER", nullable: false),
                    Point = table.Column<int>(type: "INTEGER", nullable: false),
                    Season = table.Column<int>(type: "INTEGER", nullable: false),
                    Tires = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                });
        }
    }
}
