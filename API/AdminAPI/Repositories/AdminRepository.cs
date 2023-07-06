using AdminAPI.Context;
using AdminAPI.Models;
using AdminAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
namespace AdminAPI.Repositories;
public class AdminRepository : IAdminRepository
{
    private readonly IConfiguration _configuration;
    public AdminRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<Admin>> GetAll()
    {
        try
        {
            using (var context = new AdminContext(_configuration))
            {
                List<Admin> admin = await context.Admin.ToListAsync();
                if (admin == null)
                {
                    return null;
                }
                return admin;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<Admin> GetById(int adminId)
    {
        try
        {
            using (var context = new AdminContext(_configuration))
            {
                Admin admin = await context.Admin.FindAsync(adminId);
                if (admin == null)
                {
                    return null;
                }
                return admin;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<bool> Insert(Admin admin,User user,UserRole userRole)
    {
        bool status = false;
        int userId=0;
        try
        {
            using (var context = new AdminContext(_configuration))
            {
                await context.Users.AddAsync(user);
                await context.SaveChangesAsync();
                userId=user.Id;
                Console.WriteLine(userId);
                admin.Id=userId;
                userRole.UserId=userId;
                await context.UserRoles.AddAsync(userRole);
                await context.Admin.AddAsync(admin);
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
    public async Task<bool> Update(int adminId, Admin admin)
    {
        bool status = false;
        try
        {
            using (var context = new AdminContext(_configuration))
            {
                Admin? oldAdmin = await context.Admin.FindAsync(adminId);
                if (oldAdmin != null)
                {
                    oldAdmin.FirstName = admin.FirstName;
                    oldAdmin.LastName = admin.LastName;
                    oldAdmin.Location = admin.Location;
                    await context.SaveChangesAsync();
                    return true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }
    public async Task<bool> Delete(int adminId)
    {
        bool status = false;
        try
        {
            using (var context = new AdminContext(_configuration))
            {
                Admin? admin = await context.Admin.FindAsync(adminId);
                if (admin != null)
                {
                    context.Admin.Remove(admin);
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
}