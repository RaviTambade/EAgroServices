using System.Collections.Generic;
using System.Threading.Tasks;
using UsersAPI.Models;
namespace UsersAPI.Repositories.Interfaces;
public interface IUserRepository{
    Task<List<User>> GetAll();
    Task<User> GetUser(int userId);
    Task<bool> Insert(User user,UserRole userRole);
    Task<bool> Update(int userId,User user);
    Task<bool> Delete(int userId);


}