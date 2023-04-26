using AuthAPI.Repository.Interfaces;
using AuthAPI.Repository;
using AuthAPI.Models;
using AuthAPI.Services.Interfaces;
using System.Threading.Tasks;
using System.Collections;

namespace AuthAPI.Services;
public class UserServices:IUserServices{
    private readonly IUserRepository _repo;
    public UserServices(IUserRepository repo){
        _repo=repo;

    }

public async Task<IEnumerable<User>> GetAllUsers()=>await _repo.GetAllUsers();
public async Task<User> GetUser(int userId)=> await _repo.GetUser(userId);
public async Task<bool> Insert(User user)=> await _repo.Insert(user);
public async Task<bool> Update(int userId,User user)=> await _repo.Update(userId,user);
public async Task<bool> Delete(int userId)=> await _repo.Delete(userId);
public async Task<AuthenticateResponse> Authenticate(AuthenticateRequest request)=> await _repo.Authenticate(request);
public async Task<User> GetUserRequest(AuthenticateRequest request)=> await _repo.GetUserRequest(request);

}