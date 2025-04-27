using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VTCShop.Application.Migrations
{
    /// <inheritdoc />
    public partial class OtherProductUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSellingFastMarked",
                table: "Products",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "SupportsSizes",
                table: "Products",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSellingFastMarked",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SupportsSizes",
                table: "Products");
        }
    }
}
