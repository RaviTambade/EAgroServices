using AuthAPI.Models;
namespace AuthAPI.Repository.Interfaces;
public interface IUserRepository {
    public Task<IEnumerable<User>> GetAllUsers();
    public Task<bool> Insert(User user);
    public Task<bool> Update(int userId,User user);
    public Task<bool> Delete(int userId);
    public Task<User> GetUser(AuthenticateRequest request);
    public Task<AuthenticateResponse> Authenticate(AuthenticateRequest request);
}