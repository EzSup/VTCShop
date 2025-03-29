using VTCShop.Application.Contracts.Categories;
using VTCShop.Application.Domain.Services;
namespace VTCShop.Endpoints
{
    public static class CategoryEndpoints
    {
        public static IEndpointRouteBuilder MapCategoryEndpoint(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("categories")
                           .WithTags("Category endpoints")
                           .WithOpenApi();

            group.BuildGroup();

            return app;
        }

        private static RouteGroupBuilder BuildGroup(this RouteGroupBuilder group)
        {
            group.MapPost("", async (ICategoryService service, CategoryCreateRequest request) =>
                 {
                     var result = await service.Create(request);
                     return Results.Ok(result);
                 })
                 .Produces<int>()
                 .RequireAuthorization("AdminOnly");

            group.MapPut("", async (ICategoryService service, CategoryUpdateRequest request) =>
            {
                await service.Update(request);
                return Results.Ok();
            }).RequireAuthorization("AdminOnly");

            group.MapDelete("", async (ICategoryService service, int id) =>
            {
                await service.Delete(id);
                return Results.Ok();
            }).RequireAuthorization("AdminOnly");

            group.MapGet("", async (ICategoryService service, int id)
                             => Results.Ok(await service.GetCategoryById(id)))
                 .Produces<CategoryResponse>();

            group.MapGet("all", async (ICategoryService service) =>
                 {
                     var result = await service.GetCategories(int.MaxValue, 1);
                     return Results.Json(result, statusCode: 200);
                 })
                 .Produces<IEnumerable<CategoryResponse>>();

            return group;
        }
    }
}
