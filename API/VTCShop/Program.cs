using Amazon;
using Amazon.S3;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using VTCShop.Application.DAL;
using VTCShop.Application.Mapping;
using VTCShop.Endpoints;
using VTCShop.Extensions;
using VTCShop.Helpers;
using VTCShop.Infrastructure.Options;
using VTCShop.Infrastructure.Services;
namespace VTCShop
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddOpenApi();
            builder.Services.AddLoggingServices();
            builder.Services.AddAntiforgery();

            TypeAdapterConfig.GlobalSettings.Apply(new MappingConfig());

            var constring = builder.Configuration.GetConnectionString("DefaultConnection");

            builder.Services.AddDbContext<AppDbContext>(
                options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddCustomAuthorization();

            builder.Services.Configure<S3Options>(builder.Configuration.GetSection("AWS"));
            builder.Services.AddScoped<IAmazonS3>(sp =>
            {
                return new AmazonS3Client(
                    builder.Configuration["AWS:AccessKey"],
                    builder.Configuration["AWS:SecretKey"],
                    RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"]));
            });

            builder.Services.AddCors(x =>
                                         x.AddDefaultPolicy(options =>
                                                                options
                                                                    .WithOrigins("http://localhost:5173", "http://localhost:3000")
                                                                    .AllowAnyMethod()
                                                                    .AllowAnyHeader()
                                                                    .AllowCredentials()));

            builder.Services.AddScoped<FileStorageRepository>();
            builder.Services.AddServices();

            builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference();
            }

            app.UseCors();

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
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

            app.MapProductEndpoint();
            app.MapCategoryEndpoint();
            app.MapAuthorizationEndpoint();
            app.MapCartEndpoint();
            app.MapOrderEndpoint();

            app.Run();
        }
    }
}
