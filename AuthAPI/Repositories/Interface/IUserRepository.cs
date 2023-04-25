using System.Collections;
using System.Threading.Tasks;
using AuthAPI.Context;
using AuthAPI.Models;
namespace AuthAPI.Repository.Interfaces;
public interface IUserRepository {
    public Task<IEnumerable<User>> GetAllUsers();
    public Task<User> GetUser(int userId);
    public Task<bool> Insert(User user);
    public Task<bool> Update(int userId,User user);
    public Task<bool> Delete(int userId);

    public Task<AuthenticateResponse> Authenticate(AuthenticateRequest request);

}