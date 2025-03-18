using Mapster;
using Microsoft.EntityFrameworkCore;
using VTCShop.Application.DAL;
using VTCShop.Application.Domain.Services;
using VTCShop.Contracts;
namespace VTCShop.Application.BLL
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProductInListResponse>> GetPaged(int pageNumber, int pageSize)
        {
            var result = await _context.Products
                                       .Skip((pageNumber-1) * pageSize)
                                       .Take(pageSize)
                                       .ToListAsync();

            return result.Adapt<IEnumerable<ProductInListResponse>>();
        }

        public async Task<ProductInListResponse?> GetById(int id)
        {
            return (await _context.Products.FindAsync(id)).Adapt<ProductInListResponse>();
        }
    }
}
