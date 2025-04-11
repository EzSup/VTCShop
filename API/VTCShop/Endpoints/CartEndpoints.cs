using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VTCShop.Application.Contracts.Cart;
using VTCShop.Application.Domain.Services;
using VTCShop.Application.Helpers;
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
            group.MapPost("", async (ClaimsPrincipal user, [FromServices]ICartService cartService, [FromBody]AddItemToCartRequest request) =>
            {
                var id = user.GetUserId();
                await cartService.AddItemToCart(id, request);
                return Results.Created();
            });

            group.MapGet("", async (ClaimsPrincipal user, [FromServices]ICartService cartService) =>
            {
                var id = user.GetUserId();
                var result = await cartService.GetCart(id);
                return Results.Ok(result);
            }).Produces<CartResponse>();

            group.MapDelete("", async (ClaimsPrincipal user, [FromServices]ICartService cartService, [FromQuery]int productId) =>
            {
                var id = user.GetUserId();
                await cartService.RemoveItemFromCart(id, productId);
                return Results.Ok();
            });

            group.MapPatch("", async (ClaimsPrincipal user, [FromServices]ICartService cartService, [FromQuery]int productId, [FromQuery]int newQuantity) =>
            {
                var id = user.GetUserId();
                await cartService.UpdateCartItemQuantity(id, productId, newQuantity);
                return Results.Ok();
            });
        }
    }
}
