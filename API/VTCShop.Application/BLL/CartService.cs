using Mapster;
using Microsoft.EntityFrameworkCore;
using VTCShop.Application.Contracts.Cart;
using VTCShop.Application.DAL;
using VTCShop.Application.DAL.Models;
using VTCShop.Application.Domain.Services;
using VTCShop.Infrastructure.Services;
namespace VTCShop.Application.BLL
{
    public class CartService : ICartService
    {
        private readonly AppDbContext _context;
        private readonly FileStorageRepository _fileStorageRepository;

        public CartService(AppDbContext context, FileStorageRepository fileStorageRepository)
        {
            _context = context;
            _fileStorageRepository = fileStorageRepository;
        }

        public async Task AddItemToCart(int userId, AddItemToCartRequest request)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            var cartItem = await _context.UserCartItems
                                         .FirstOrDefaultAsync(x => x.UserId == userId
                                                                   && x.ProductId == request.ProductId);

            if (cartItem != null)
            {
                cartItem.Quantity += request.Quantity;
                _context.UserCartItems.Update(cartItem);
                await _context.SaveChangesAsync();
                return;
            }

            if (!await _context.Products.AnyAsync(x => x.Id == request.ProductId))
                throw new Exception("No such product found!");

            cartItem = new UserCartItemEntity
            {
                UserId = userId,
                ProductId = request.ProductId,
                Quantity = request.Quantity
            };

            await _context.UserCartItems.AddAsync(cartItem);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveItemFromCart(int userId, int productId)
        {
            var cartItem = await _context.UserCartItems
                                         .FirstOrDefaultAsync(x => x.UserId == userId
                                                                   && x.ProductId == productId);
            if (cartItem == null)
                return;

            _context.UserCartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<CartItemResponse>> GetCartItems(int userId)
        {
            var result = await _context.UserCartItems
                                       .AsNoTracking()
                                       .Include(x => x.Product)
                                       .ThenInclude(x => x.Category)
                                       .Where(x => x.UserId == userId)
                                       .ToListAsync();

            foreach (var item in result)
            {
                if (!string.IsNullOrWhiteSpace(item.Product.ImageKey))
                {
                    item.Product.ImageKey = await _fileStorageRepository.GetObjectTempUrlAsync(item.Product.ImageKey);
                }
            }

            var mapped = result.Adapt<IEnumerable<CartItemResponse>>();
            return mapped;
        }
    }
}
