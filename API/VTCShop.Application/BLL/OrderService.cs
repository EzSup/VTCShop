using Microsoft.EntityFrameworkCore;
using VTCShop.Application.Contracts.Cart;
using VTCShop.Application.DAL;
using VTCShop.Application.DAL.Models;
using VTCShop.Application.Domain.Services;
namespace VTCShop.Application.BLL
{
    public class OrderService : IOrderService
    {
        private readonly AppDbContext _context;

        public OrderService(AppDbContext context)
        {
            _context = context;
        }
        
        public async Task<int> MakeOrder(int userId, OrderRequest orderRequest)
        {
            var cart = await _context.UserCartItems
                                     .AsNoTracking()
                                     .Include(x => x.Product)
                                     .Where(x => x.UserId == userId)
                                     .ToListAsync();
            if (!cart.Any())
                throw new Exception("Can not order the empty cart!");
            var orderItems = cart.Select(x => new OrderItemEntity
            {
                ProductId = x.ProductId,
                UnitPrice = x.Product.Price,
                Quantity = x.Quantity,
                ProductSize = x.ProductSize
            });

            var orderEntity = new OrderEntity
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                ShippingAddress = orderRequest.ShippingAddress,
                TotalAmount = orderItems.Sum(x => x.Quantity * x.UnitPrice)
            };
            orderEntity.OrderItems.AddRange(orderItems);
            await _context.Orders.AddAsync(orderEntity);
            _context.UserCartItems.RemoveRange(cart);
            await _context.SaveChangesAsync();
            return orderEntity.Id;
        }
    }
}
