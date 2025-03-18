using Serilog;
namespace VTCShop.Extensions
{
    public static class LoggingExtension
    {
        public static IServiceCollection AddLoggingServices(this IServiceCollection services)
        {
            Log.Logger = new LoggerConfiguration()
                         .Enrich.FromLogContext()
                         .WriteTo.Console()
                         .CreateLogger();

            services.AddSerilog();
            return services;
        }
    }
}
