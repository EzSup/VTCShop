namespace VTCShop.Application.Contracts.Cart
{
    public record CartItemResponse(
        int ProductId,
        int Quantity,
        string ProductName,
        string Category,
        decimal PriceForUnit,
        decimal Sum,
        string ImageLink);
}
