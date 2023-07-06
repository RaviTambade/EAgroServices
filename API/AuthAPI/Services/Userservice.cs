using AuthAPI.Models;
using AuthAPI.Repository.Interfaces;
using AuthAPI.Services.Interfaces;
namespace AuthAPI.Services;

public class UserServices : IUserServices
{
    private readonly IUserRepository _repo;

    public UserServices(IUserRepository repo)
    {
        _repo = repo;
    }

    public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest request) =>
        await _repo.Authenticate(request);
}
