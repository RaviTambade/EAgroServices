using AuthAPI.Models;
namespace AuthAPI.Repository.Interfaces;
public interface IUserRepository {
    Task<IEnumerable<User>> GetAll();
    Task<bool> Insert(User user);
    Task<bool> Update(int userId,User user);
    Task<bool> Delete(int userId);
    Task<User> GetUser(AuthenticateRequest request);
    Task<AuthenticateResponse> Authenticate(AuthenticateRequest request);
    Task<IEnumerable<Role>> GetAllRoles();
}