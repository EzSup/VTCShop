using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VTCShop.Application.Migrations
{
    /// <inheritdoc />
    public partial class SizesToCartItemsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductSize",
                table: "UserCartItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductSize",
                table: "OrderItems",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductSize",
                table: "UserCartItems");

            migrationBuilder.DropColumn(
                name: "ProductSize",
                table: "OrderItems");
        }
    }
}
