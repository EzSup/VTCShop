using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using VTCShop.Application.DAL;
using VTCShop.Endpoints;
using VTCShop.Extensions;
namespace VTCShop
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddOpenApi();
            builder.Services.AddLoggingServices();

            builder.Services.AddDbContext<AppDbContext>(
                options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddCustomAuthorization();

            builder.Services.AddServices();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.Use(async (context, next) =>
            {
                var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
                logger.LogInformation("Request Path: {Path}", context.Request.Path);
                logger.LogInformation("IsAuthenticated: {IsAuthenticated}", context.User.Identity?.IsAuthenticated);
                logger.LogInformation("Authentication Type: {AuthType}", context.User.Identity?.AuthenticationType);

                await next();
            });

            app.UseAuthorization();

            using (var scope = app.Services.CreateScope())
            {
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<int>>>();
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                await dbContext.Database.MigrateAsync();

                string[] roleNames = { "Admin", "Customer" };

                foreach (var roleName in roleNames)
                {
                    if (!await roleManager.RoleExistsAsync(roleName))
                    {
                        await roleManager.CreateAsync(new IdentityRole<int> { Name = roleName });
                    }
                }
            }

            // app.MapIdentityApi<ApplicationUser>().WithOpenApi();
            app.MapProductEndpoint();
            app.MapCategoryEndpoint();
            app.MapAuthorizationEndpoint();


            app.Run();
        }
    }
}
