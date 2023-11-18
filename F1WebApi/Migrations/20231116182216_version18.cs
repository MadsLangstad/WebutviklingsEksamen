using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace F1WebApi.Migrations
{
    /// <inheritdoc />
    public partial class version18 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "HighestRaceFinish",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "PolePositions",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "PowerUnit",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "TeamChief",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "TechnicalChief",
                table: "Teams");

            migrationBuilder.DropColumn(
                name: "Car",
                table: "Races");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Races");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "Races");

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

            migrationBuilder.DropColumn(
                name: "WorldChampionships",
                table: "Drivers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
                name: "HighestRaceFinish",
                table: "Teams",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PolePositions",
                table: "Teams",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PowerUnit",
                table: "Teams",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TeamChief",
                table: "Teams",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TechnicalChief",
                table: "Teams",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Car",
                table: "Races",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Races",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Time",
                table: "Races",
                type: "TEXT",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

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
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Points",
                table: "Drivers",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "WorldChampionships",
                table: "Drivers",
                type: "INTEGER",
                nullable: true);
        }
    }
}
