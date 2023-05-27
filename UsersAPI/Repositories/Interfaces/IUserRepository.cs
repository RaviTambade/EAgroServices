using System.Collections.Generic;
using System.Threading.Tasks;
using UsersAPI.Models;
namespace UsersAPI.Repositories.Interfaces;
public interface IUserRepository{
    Task<List<User>> GetAll();
    Task<User> GetUser(int userId);
}