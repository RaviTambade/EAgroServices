using System.Collections.Generic;
using System.Numerics;
using System.Security;
using System.Threading.Tasks;
using UsersAPI.Context;
using UsersAPI.Models;
using UsersAPI.Repositories.Interfaces;
using UsersAPI.Context;
using Microsoft.EntityFrameworkCore;
namespace UsersAPI.Repositories;
public class UserRepository : IUserRepository
{
    private readonly IConfiguration _configuration;
    public UserRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<User>> GetAll(){
        try{
            using(var context=new UserContext(_configuration))
            {
                List<User> users=await context.Users.ToListAsync();
                if(users == null)
                {
                        return null;
                }
                return users;
            }
        }
         catch (Exception e)
        {
            throw e;
        }
    }
      public async Task<User> GetUser(int userId){
        try{
            using(var context=new UserContext(_configuration))
            {
                User user=await context.Users.FindAsync(userId);
                if(user == null)
                {
                        return null;
                }
                return user;
            }
        }
         catch (Exception e)
        {
            throw e;
        }
    }
}