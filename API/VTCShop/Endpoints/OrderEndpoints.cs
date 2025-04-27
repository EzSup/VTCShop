using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VTCShop.Application.Contracts.Cart;
using VTCShop.Application.Domain.Services;
using VTCShop.Application.Helpers;
namespace VTCShop.Endpoints
{
    public static class OrderEndpoints
    {
        public static void MapOrderEndpoint(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("order")
                           .WithTags("Order management endpoints")
                           .WithOpenApi();

            group.BuildGroup();
        }

        private static void BuildGroup(this RouteGroupBuilder group)
        {
            group.MapPost("", async (ClaimsPrincipal user, [FromServices]IOrderService orderService, OrderRequest request)
                              => Results.Ok(await orderService.MakeOrder(user.GetUserId(), request))).RequireAuthorization("CustomerOnly");
            group.MapGet("", async ([FromServices]IOrderService orderService)
                             => Results.Ok(await orderService.GetAllOrders()))
                 .Produces<IEnumerable<OrderInListResponse>>().RequireAuthorization("AdminOnly");
        }
    }
}
