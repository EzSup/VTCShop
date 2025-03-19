using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using VTCShop.Application.DAL;
using VTCShop.Application.DAL.Models;
using VTCShop.Application.Domain.Services;
using VTCShop.Contracts;
using VTCShop.Infrastructure.Options;
using VTCShop.Infrastructure.Services;
namespace VTCShop.Application.BLL
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;
        private readonly FileStorageRepository _fileStorageRepository;
        private readonly string _folderName;

        public ProductService(AppDbContext context, FileStorageRepository fileStorageRepository, IOptions<S3Options> options)
        {
            _context = context;
            _fileStorageRepository = fileStorageRepository;
            _folderName = options.Value.S3ProductsFolder;
        }

        public async Task<IEnumerable<ProductInListResponse>> GetPaged(int pageNumber, int pageSize)
        {
            var result = await _context.Products
                                       .Skip((pageNumber-1) * pageSize)
                                       .Take(pageSize)
                                       .ToListAsync();
            
            var mapped = result.Adapt<List<ProductInListResponse>>(); 
            var productsWithImages = mapped.Where(x => !String.IsNullOrWhiteSpace(x.ImageLink) );
            foreach (var item in productsWithImages)
            {
                item.ImageLink = await _fileStorageRepository.GetObjectTempUrlAsync(item.ImageLink);
            }

            return mapped;
        }

        public async Task<ProductInListResponse?> GetById(int id)
        {
            var result = (await _context.Products.FindAsync(id)).Adapt<ProductInListResponse>();
            result.ImageLink = await _fileStorageRepository.GetObjectTempUrlAsync(result.ImageLink);
            return result;
        }

        public async Task Create(ProductCreateRequest request)
        {
            var product = request.Adapt<Product>();
            product.Category = await _context.Categories.FindAsync(request.CategoryId);
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateImage(int productId, IFormFile imageFile)
        {
            var product = await _context.Products.FindAsync(productId);
            if(product == null)
                return;
            product.ImageKey = await _fileStorageRepository.UploadFileAsync(imageFile, _folderName, null);
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int productId)
        {
            await _context.Products.Where(x => x.Id == productId).ExecuteDeleteAsync();
        }
    }
}
