using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace F1WebApi.Migrations
{
    /// <inheritdoc />
    public partial class version3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Year",
                table: "Cars",
                newName: "Season");

            migrationBuilder.RenameColumn(
                name: "Model",
                table: "Cars",
                newName: "Tires");

            migrationBuilder.RenameColumn(
                name: "Make",
                table: "Cars",
                newName: "Motor");

            migrationBuilder.RenameColumn(
                name: "Hp",
                table: "Cars",
                newName: "Point");

            migrationBuilder.AddColumn<int>(
                name: "Place",
                table: "Cars",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Place",
                table: "Cars");

            migrationBuilder.RenameColumn(
                name: "Tires",
                table: "Cars",
                newName: "Model");

            migrationBuilder.RenameColumn(
                name: "Season",
                table: "Cars",
                newName: "Year");

            migrationBuilder.RenameColumn(
                name: "Point",
                table: "Cars",
                newName: "Hp");

            migrationBuilder.RenameColumn(
                name: "Motor",
                table: "Cars",
                newName: "Make");
        }
    }
}
