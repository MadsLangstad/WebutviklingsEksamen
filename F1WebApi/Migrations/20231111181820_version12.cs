using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace F1WebApi.Migrations
{
    /// <inheritdoc />
    public partial class version12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CircuitName",
                table: "Races");

            migrationBuilder.DropColumn(
                name: "FastestLap",
                table: "Races");

            migrationBuilder.DropColumn(
                name: "WinnerTime",
                table: "Races");

            migrationBuilder.RenameColumn(
                name: "WinnerName",
                table: "Races",
                newName: "Winner");

            migrationBuilder.RenameColumn(
                name: "RaceDuration",
                table: "Races",
                newName: "Time");

            migrationBuilder.RenameColumn(
                name: "Location",
                table: "Races",
                newName: "Car");

            migrationBuilder.RenameColumn(
                name: "DateOfRace",
                table: "Races",
                newName: "Date");

            migrationBuilder.AddColumn<int>(
                name: "Laps",
                table: "Races",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Laps",
                table: "Races");

            migrationBuilder.RenameColumn(
                name: "Winner",
                table: "Races",
                newName: "WinnerName");

            migrationBuilder.RenameColumn(
                name: "Time",
                table: "Races",
                newName: "RaceDuration");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Races",
                newName: "DateOfRace");

            migrationBuilder.RenameColumn(
                name: "Car",
                table: "Races",
                newName: "Location");

            migrationBuilder.AddColumn<string>(
                name: "CircuitName",
                table: "Races",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FastestLap",
                table: "Races",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "WinnerTime",
                table: "Races",
                type: "REAL",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
