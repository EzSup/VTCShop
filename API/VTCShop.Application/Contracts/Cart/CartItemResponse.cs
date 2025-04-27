using VTCShop.Application.DAL.Models.Enum;
namespace VTCShop.Application.Contracts.Cart
{
    public record CartItemResponse(
        int ProductId,
        int Quantity,
        SizeEnum Size,
        string ProductName,
        string Category,
        decimal PriceForUnit,
        decimal Sum,
        string ImageLink);
}
