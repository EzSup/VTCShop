using VTCShop.Application.BLL;
using VTCShop.Application.Domain.Services;
namespace VTCShop.Extensions
{
    public static class ServicesSetupExtension
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ICartService, CartService>();
        }
    }
}
