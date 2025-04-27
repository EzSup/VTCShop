namespace VTCShop.Application.Contracts.Auth
{
    public record MeResponse(int Id, string FullName, string Email, string? PhoneNumber);
}
