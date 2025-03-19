using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using VTCShop.Application.Domain.Services;
using VTCShop.Contracts;
namespace VTCShop.Endpoints
{
    public static class ProductEndpoints
    {
        public static IEndpointRouteBuilder MapProductEndpoint(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("products")
                           .WithTags("Product endpoints")
                           .WithOpenApi();

            group.BuildGroup();

            return app;
        }

        private static RouteGroupBuilder BuildGroup(this RouteGroupBuilder group)
        {
            group.MapGet("", async (IProductService productService, int id) =>
                 {
                     var result = await productService.GetById(id);
                     return Results.Ok(result);
                 })
                 .Produces<ProductInListResponse>();

            group.MapGet("/list", async (IProductService productService, int pageNumber, int pageSize) =>
                 {
                     var result = await productService.GetPaged(pageNumber, pageSize);
                     return Results.Ok(result);
                 })
                 .Produces<IEnumerable<ProductInListResponse>>();

            group.MapPost("", async (IProductService productService, ProductCreateRequest request) =>
            {
                await productService.Create(request);
                return Results.Ok();
            }).RequireAuthorization("AdminOnly");
            
            group.MapPut("addImage", async (IProductService productService, int productId, [FromForm]IFormFile image) =>
                {
                    await productService.UpdateImage(productId, image);
                    return Results.Ok();
                })
                 .DisableAntiforgery()
                 .RequireAuthorization("AdminOnly");

            group.MapDelete("", async (IProductService productService, int id) =>
            {
                await productService.Delete(id);
                return Results.Ok();
            }).RequireAuthorization("AdminOnly");

            return group;
        }
    }
}
