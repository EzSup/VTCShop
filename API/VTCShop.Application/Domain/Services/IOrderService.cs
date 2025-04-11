using VTCShop.Application.Contracts.Cart;
namespace VTCShop.Application.Domain.Services
{
    public interface IOrderService
    {
        Task<int> MakeOrder(int userId, OrderRequest orderRequest);
    }
}
