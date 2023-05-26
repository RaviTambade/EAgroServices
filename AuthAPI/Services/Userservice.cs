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
    public async Task<IEnumerable<User>> GetAll() => await _repo.GetAll();
    public async Task<bool> Insert(User user) => await _repo.Insert(user);
    public async Task<bool> Update(int userId, User user) => await _repo.Update(userId, user);
    public async Task<bool> Delete(int userId) => await _repo.Delete(userId);
    public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest request) => await _repo.Authenticate(request);
    public async Task<User> GetUser(AuthenticateRequest request) => await _repo.GetUser(request);
    public async Task<IEnumerable<Role>> GetAllRoles() => await _repo.GetAllRoles();

}