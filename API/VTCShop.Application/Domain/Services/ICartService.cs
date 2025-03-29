using VTCShop.Application.Contracts.Cart;
namespace VTCShop.Application.Domain.Services
{
    public interface ICartService
    {
        Task AddItemToCart(int userId, AddItemToCartRequest request);
        Task<IEnumerable<CartItemResponse>> GetCartItems(int userId);
        Task RemoveItemFromCart(int userId, int productId);
    }
}
