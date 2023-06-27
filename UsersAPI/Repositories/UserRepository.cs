using UsersAPI.Context;
using UsersAPI.Models;
using UsersAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace UsersAPI.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IConfiguration _configuration;

    public UserRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<List<User>> GetAll()
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

    public async Task<bool> Insert(User user, UserRole userRole)
    {
        bool status = false;
        int userId = 0;
        try
        {
            using (var context = new UserContext(_configuration))
            {
                await context.Users.AddAsync(user);
                await context.SaveChangesAsync();
                userId = user.Id;
                userRole.UserId = userId;
                await context.UserRoles.AddAsync(userRole);
                await context.SaveChangesAsync();
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }

    public async Task<bool> Update(int userId, User user)
    {
        bool status = false;
        try
        {
            using (var context = new UserContext(_configuration))
            {
                User? oldUser = await context.Users.FindAsync(userId);
                if (oldUser != null)
                {
                    oldUser.ContactNumber = user.ContactNumber;
                    oldUser.Password = user.Password;
                    oldUser.FirstName = user.FirstName;
                    oldUser.LastName = user.LastName;
                    oldUser.ImageUrl = user.ImageUrl;
                    oldUser.AadharId = user.AadharId;
                    await context.SaveChangesAsync();
                    status = true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }

    public async Task<bool> Delete(int userId)
    {
        bool status = false;
        try
        {
            using (var context = new UserContext(_configuration))
            {
                User? user = await context.Users.FindAsync(userId);
                if (user != null)
                {
                    context.Users.Remove(user);
                    await context.SaveChangesAsync();
                    status = true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }

    public async Task<List<Role>> GetRoles()
    {
        try
        {
            using (var context = new UserContext(_configuration))
            {
                var roles = await context.Roles.ToListAsync();
                return roles;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
}