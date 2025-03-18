using VTCShop.Application.Contracts.Categories;
namespace VTCShop.Application.Domain.Services
{
    public interface ICategoryService
    {
        Task<CategoryResponse> GetCategoryById(int id);
        Task<IEnumerable<CategoryResponse>> GetCategories(int pageSize, int pageNumber);
        Task<int> Create(CategoryCreateRequest request);
        Task Delete(int id);
        Task Update(CategoryUpdateRequest request);
    }
}
