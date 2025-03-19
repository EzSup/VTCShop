using Microsoft.AspNetCore.Http;
using VTCShop.Contracts;
namespace VTCShop.Application.Domain.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductInListResponse>> GetPaged(int pageNumber, int pageSize);
        Task<ProductInListResponse?> GetById(int id);
        Task Create(ProductCreateRequest request);
        Task UpdateImage(int productId, IFormFile imageFile);
        Task Delete(int productId);
    }
}
