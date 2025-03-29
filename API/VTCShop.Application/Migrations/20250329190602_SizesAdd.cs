using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VTCShop.Application.Migrations
{
    /// <inheritdoc />
    public partial class SizesAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int[]>(
                name: "AvailableSizes",
                table: "Products",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvailableSizes",
                table: "Products");
        }
    }
}
