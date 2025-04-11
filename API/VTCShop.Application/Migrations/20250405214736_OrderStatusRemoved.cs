using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VTCShop.Application.Migrations
{
    /// <inheritdoc />
    public partial class OrderStatusRemoved : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Orders");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
