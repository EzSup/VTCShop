using Mapster;
using Microsoft.AspNetCore.Identity;
using VTCShop.Application.Contracts.Auth;
using VTCShop.Application.DAL.Models;
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
            group.MapPost("register", async (UserManager<ApplicationUser> userManager,
                              SignInManager<ApplicationUser> signInManager,
                              RegisterRequest request) =>
                          {
                              var user = request.Adapt<ApplicationUser>();
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

            group.MapPost("login", async (UserManager<ApplicationUser> userManager,
                              SignInManager<ApplicationUser> signInManager,
                              LogInRequest request) =>
                          {
                              var user = await userManager.FindByEmailAsync(request.Username);
                              var result = await userManager.CheckPasswordAsync(user, request.Password);

                              if (result)
                              {
                                  await signInManager.SignInAsync(user, false);
                                  return Results.Ok($"User {user.Email} registered successfully logged in!");
                              }

                              return Results.BadRequest("Unsuccessful login attempt.");
                          });

            group.MapDelete("logoutAdmin", async (SignInManager<ApplicationUser> signInManager) =>
            {
                await signInManager.SignOutAsync();
                return Results.Ok("User logged out successfully!");
            }).RequireAuthorization("AdminOnly");

            group.MapDelete("logoutCustomer", async (SignInManager<ApplicationUser> signInManager) =>
            {
                await signInManager.SignOutAsync();
                return Results.Ok("User logged out successfully!");
            }).RequireAuthorization("CustomerOnly");
        }
    }
}
