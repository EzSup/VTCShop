using Mapster;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using VTCShop.Application.Contracts.Auth;
using VTCShop.Application.DAL.Models;
using VTCShop.Application.Helpers;
namespace VTCShop.Endpoints
{
    public static class AuthorizationEndpoints
    {
        public static IEndpointRouteBuilder MapAuthorizationEndpoint(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("auth")
                           .WithTags("Authorization endpoints")
                           .WithOpenApi();

            group.BuildGroup();

            return app;
        }

        private static void BuildGroup(this RouteGroupBuilder group)
        {
            group.MapPost("register", async (UserManager<ApplicationUserEntity> userManager,
                              SignInManager<ApplicationUserEntity> signInManager,
                              RegisterRequest request) =>
                          {
                              var user = request.Adapt<ApplicationUserEntity>();
                              user.UserName = request.Email;
                              var registerResult = await userManager.CreateAsync(user, request.Password);

                              if (registerResult.Succeeded)
                              {
                                  await userManager.AddToRoleAsync(user, "Customer");
                                  await signInManager.PasswordSignInAsync(request.Email, request.Password, false, false);
                                  return Results.Ok($"User {user.Email} registered successfully with role Customer");
                              }

                              return Results.BadRequest(registerResult.Errors);
                          });

            group.MapPost("login", async (UserManager<ApplicationUserEntity> userManager,
                              SignInManager<ApplicationUserEntity> signInManager,
                              LogInRequest request) =>
                          {
                              var user = await userManager.FindByEmailAsync(request.Username);
                              var result = await userManager.CheckPasswordAsync(user, request.Password);

                              if (result)
                              {
                                  await signInManager.SignInAsync(user, true);
                                  return Results.Ok(new LogInResponse(user.UserName == "admin", user.UserName));
                              }

                              return Results.BadRequest("Unsuccessful login attempt.");
                          }).Produces<LogInResponse>();

            group.MapDelete("logout", async (SignInManager<ApplicationUserEntity> signInManager) =>
            {
                await signInManager.SignOutAsync();
                return Results.Ok("User logged out successfully!");
            }).RequireAuthorization();

            group.MapGet("me", async (ClaimsPrincipal User, UserManager<ApplicationUserEntity> userManager) =>
                 {
                     var id = User.GetUserId();
                     var userData = await userManager.FindByIdAsync(id.ToString());
                     return Results.Ok(userData.Adapt<MeResponse>());
                 })
                 .RequireAuthorization()
                 .Produces<MeResponse>();
        }
    }
}
