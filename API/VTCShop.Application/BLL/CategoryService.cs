using Mapster;
using Microsoft.EntityFrameworkCore;
using VTCShop.Application.Contracts.Categories;
using VTCShop.Application.DAL;
using VTCShop.Application.DAL.Models;
using VTCShop.Application.Domain.Services;
namespace VTCShop.Application.BLL
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;

        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CategoryResponse> GetCategoryById(int id)
        {
            var result = await _context.Categories.FindAsync(id);
            return result.Adapt<CategoryResponse>();
        }

        public async Task<IEnumerable<CategoryResponse>> GetCategories(int pageSize, int pageNumber)
        {
            var result = await _context.Categories
                                       .Skip(pageSize * (pageNumber-1))
                                       .Take(pageSize)
                                       .ToListAsync();

            return result.Adapt<IEnumerable<CategoryResponse>>();
        }

        public async Task<int> Create(CategoryCreateRequest request)
        {
            var entity = request.Adapt<CategoryEntity>();
            await _context.Categories.AddAsync(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            await _context.Categories
                          .Where(x => x.Id == id)
                          .ExecuteDeleteAsync();
        }

        public async Task Update(CategoryUpdateRequest request)
        {
            var entity = request.Adapt<CategoryEntity>();
            _context.Categories.Update(entity);
            await _context.SaveChangesAsync();
        }

        public Task<IEnumerable<CategoryResponse>> GetCategories()
        {
            throw new NotImplementedException();
        }
    }
}
