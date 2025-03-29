using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VTCShop.Application.Contracts.Cart;
using VTCShop.Application.Domain.Services;
namespace VTCShop.Endpoints
{
    public static class CartEndpoints
    {
        public static void MapCartEndpoint(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("cart")
                           .WithTags("Cart management endpoints")
                           .WithOpenApi()
                           .RequireAuthorization("CustomerOnly");

            group.BuildGroup();
        }

        private static void BuildGroup(this RouteGroupBuilder group)
        {
            group.MapPost("", async (ClaimsPrincipal User, [FromServices]ICartService cartService, [FromBody]AddItemToCartRequest request) =>
            {
                var id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                await cartService.AddItemToCart(id, request);
                return Results.Created();
            });

            group.MapGet("", async (ClaimsPrincipal User, [FromServices]ICartService cartService) =>
            {
                var id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                var result = await cartService.GetCartItems(id);
                return Results.Ok(result.ToArray());
            }).Produces<CartItemResponse[]>();

            group.MapDelete("", async (ClaimsPrincipal User, [FromServices]ICartService cartService, [FromQuery]int productId) =>
            {
                var id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
                await cartService.RemoveItemFromCart(id, productId);
                return Results.Ok();
            });
        }
    }
}
