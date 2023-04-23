using System;
using System.Collections;
using System.Threading.Tasks;
using AuthAPI.Context;
using AuthAPI.Models;
using AuthAPI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace AuthAPI.Repository;
public class UserRepository : IUserRepository
{
    private readonly IConfiguration _configuration;
    public UserRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<IEnumerable<User>> GetAllUsers()
    {
        try
        {
            using (var context = new UserContext(_configuration))
            {
                List<User> users = await context.Users.ToListAsync();
                if (users == null)
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

    public async Task<User> GetUser(int userId)
    {
        try
        {
            using (var context = new UserContext(_configuration))
            {
                User user = await context.Users.FindAsync(userId);
                if (user == null)
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

    public async Task<bool> Insert(User user){
        bool status=false;
        try{
            using(var context=new UserContext(_configuration)){
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
            status=true;
            }
        }
        catch(Exception e){
            throw e;
        }
        return status;
    }


     public async Task<bool> Update(int userId,User user){
        bool status=false;
        try{
            using(var context=new UserContext(_configuration)){
               User? oldUser= await context.Users.FindAsync(userId);
               if(oldUser!=null){
                oldUser.ContactNumber=user.ContactNumber;
                oldUser.Password=user.Password;
                await context.SaveChangesAsync();
                status=true;
               }
            }
        }
        catch(Exception e){
            throw e;
        }
        return status;
    }

    public async Task<bool> Delete(int userId){
        bool status=false;
        try{
            using(var context=new UserContext(_configuration)){
                User? user=await context.Users.FindAsync(userId);
                if(user!=null){
                context.Users.Remove(user);
                await context.SaveChangesAsync();
                status=true;
                }
            }
        }
        catch(Exception e){
            throw e;
        }
        return status;
    }

}
