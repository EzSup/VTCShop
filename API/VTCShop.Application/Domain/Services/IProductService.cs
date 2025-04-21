using Microsoft.AspNetCore.Http;
using VTCShop.Application.DTOs;
using VTCShop.Contracts;
namespace VTCShop.Application.Domain.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductInListResponse>> GetPaged(int pageNumber, int pageSize);
        Task<IEnumerable<ProductInListResponse>> GetBestSellersAsync(int maxCount);
        Task<IEnumerable<ProductInListResponse>> GetFiltered(int pageNumber, int pageSize, PersonFiltrationDTO filtrationDto);
        Task<ProductResponse?> GetById(int id);
        Task<int> Create(ProductCreateRequest request);
        Task Update(ProductUpdateRequest request);
        Task UpdateImage(int productId, IFormFile imageFile);
        Task Delete(int productId);
    }
}
