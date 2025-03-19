namespace VTCShop.Contracts
{
    public record ProductCreateRequest(string Name, string? Description, decimal Price, int? CategoryId);
}
