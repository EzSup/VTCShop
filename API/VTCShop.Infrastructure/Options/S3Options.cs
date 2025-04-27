using Microsoft.Extensions.Configuration;
namespace VTCShop.Infrastructure.Options
{
    public class S3Options
    {
        [ConfigurationKeyName("AccessKey")] 
        public string AccessKey { get; set; }
        [ConfigurationKeyName("SecretKey")] 
        public string SecretKey { get; set; }
        [ConfigurationKeyName("Region")] 
        public string Region { get; set; }
        [ConfigurationKeyName("S3Bucket")] 
        public string S3BucketName { get; set; }
        [ConfigurationKeyName("S3ProductsFolder")] 
        public string S3ProductsFolder { get; set; }
        [ConfigurationKeyName("S3FileLinkTTLInMinutes")] 
        public int TTLInMinutes { get; set; }
    }
}
