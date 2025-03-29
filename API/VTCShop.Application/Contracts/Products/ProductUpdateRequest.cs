namespace VTCShop.Contracts
{
    public record ProductUpdateRequest(int id, string Name, string? Description, decimal Price, int? CategoryId);
}
