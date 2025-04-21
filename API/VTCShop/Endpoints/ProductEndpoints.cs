using Microsoft.AspNetCore.Mvc;
using VTCShop.Application.Domain.Services;
using VTCShop.Application.DTOs;
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
                 .Produces<ProductResponse>();

            group.MapGet("bestSellers", async (IProductService service, [FromQuery]int? count) => await service.GetBestSellersAsync((count ?? 0) > 0 ? (int)count : 10));

            group.MapPost("/list", async ([FromServices]IProductService productService, [FromQuery]int? pageNumber, [FromQuery]int? pageSize, [FromBody]PersonFiltrationDTO filtrationDto) =>
                 {
                     var result = await productService.GetFiltered(pageNumber ?? 1, pageSize ?? 10, filtrationDto);
                     return Results.Ok(result.ToArray());
                 })
                 .Produces<ProductInListResponse[]>();

            group.MapPost("", async (IProductService productService, ProductCreateRequest request) =>
                 {
                     var result = await productService.Create(request);
                     return Results.Ok(result);
                 })
                 .Produces<int>()
                 .RequireAuthorization("AdminOnly");

            group.MapPut("", async (IProductService productService, ProductUpdateRequest request) =>
            {
                await productService.Update(request);
                return Results.Ok();
            }).RequireAuthorization("AdminOnly");

            group.MapPatch("addImage", async (IProductService productService, int productId, [FromForm]IFormFile image) =>
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
