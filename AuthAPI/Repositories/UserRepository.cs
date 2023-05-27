using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AuthAPI.Context;
using AuthAPI.Helpers;
using AuthAPI.Models;
using AuthAPI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
namespace AuthAPI.Repository;
public class UserRepository : IUserRepository
{
    private readonly IConfiguration _configuration;
    private readonly AppSettings _appsettings;
    public UserRepository(IConfiguration configuration, IOptions<AppSettings> appsettings)
    {
        _configuration = configuration;
        _appsettings = appsettings.Value;
    }

    public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest request)
    {
        User user = await GetUser(request);
        // return null if user not found
        if (user == null) { return null; }
        // authentication successful so generate jwt token
        var token = await generateJwtToken(user);
        return new AuthenticateResponse( token);
    }
    private async Task<string> generateJwtToken(User user)
    {
        // generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = System.Text.Encoding.ASCII.GetBytes(_appsettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(await AllClaims(user)),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
       SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
    private async Task<List<Claim>> AllClaims(User user)
    {
        List<Claim> claims = new List<Claim>();
        //you can add custom Claims here
        claims.Add(new Claim("userId", user.Id.ToString()));
        List<string> roles = await GetRolesOfUser(user.Id);
        foreach (string role in roles)
        {
            claims.Add(new Claim("role", role));
        }
        return claims;
    }
    private async Task<List<string>> GetRolesOfUser(int userId)
    {
        try
        {
            using (var context = new UserContext(_configuration))
            {
                var roles = await (from role in context.Roles
                                   join userRole in context.UserRoles on role.Id equals userRole.RoleId
                                   where userRole.UserId == userId
                                   select role.RoleName).ToListAsync();
                return roles;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    
    private async Task<User> GetUser(AuthenticateRequest request)
    {
        using (var context = new UserContext(_configuration))
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.ContactNumber == request.ContactNumber && u.Password == request.Password);
            return user;
        }
    }
}
