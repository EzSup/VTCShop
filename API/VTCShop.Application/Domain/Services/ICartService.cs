using VTCShop.Application.Contracts.Cart;
namespace VTCShop.Application.Domain.Services
{
    public interface ICartService
    {
        Task AddItemToCart(int userId, AddItemToCartRequest request);
        Task<CartResponse> GetCart(int userId);
        Task RemoveItemFromCart(int userId, int productId);
        Task UpdateCartItemQuantity(int userId, int productId, int newQuantity);
    }
}
