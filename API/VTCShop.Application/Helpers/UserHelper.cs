using System.Security.Claims;
namespace VTCShop.Application.Helpers
{
    public static class UserHelper
    {
        public static int GetUserId(this ClaimsPrincipal user)
        {
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        }
    }
}
