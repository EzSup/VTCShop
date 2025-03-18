using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VTCShop.Application.DAL;
using VTCShop.Application.DAL.Models;
namespace VTCShop.Extensions
{
    public static class AuthorizationExtension
    {
        public static void AddCustomAuthorization(this IServiceCollection services)
        {
            services.AddAuthentication()
                    .AddJwtBearer(option =>
                    {
                        option.SaveToken = true;

                        option.TokenValidationParameters = new TokenValidationParameters
                        {
                            SaveSigninToken = true,
                            ValidateIssuer = true,
                            ValidateAudience = false,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = "https://localhost:5000",
                            ValidAudience = "https://localhost:3000",
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("123123"))
                        };
                    });

            services.AddIdentity<ApplicationUser, IdentityRole<int>>(options =>
                    {
                        options.Password = new PasswordOptions
                        {
                            RequiredLength = 1,
                            RequireLowercase = false,
                            RequireUppercase = false,
                            RequireDigit = false,
                            RequireNonAlphanumeric = false
                        };

                        options.SignIn.RequireConfirmedEmail = false;
                        options.SignIn.RequireConfirmedPhoneNumber = false;
                        options.SignIn.RequireConfirmedAccount = false;
                    })
                    .AddApiEndpoints()
                    .AddEntityFrameworkStores<AppDbContext>()
                    .AddDefaultTokenProviders();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminOnly", policy => policy.RequireClaim("Admin"));
                options.AddPolicy("CustomerOnly", policy => policy.RequireClaim("Customer"));
            });
        }
    }
}
