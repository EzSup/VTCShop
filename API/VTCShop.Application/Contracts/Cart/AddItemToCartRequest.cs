using VTCShop.Application.DAL.Models.Enum;
namespace VTCShop.Application.Contracts.Cart
{
    public record AddItemToCartRequest(int ProductId, int Quantity, SizeEnum Size);
}
