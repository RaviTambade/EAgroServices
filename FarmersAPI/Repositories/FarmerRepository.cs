using FarmersAPI.Contexts;
using FarmersAPI.Models;
using FarmersAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace FarmersAPI.Repositories;
public class FarmerRepository : IFarmerRepository
{
    private readonly IConfiguration _configuration;
    public FarmerRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<Farmer>> GetAll()
    {
        try
        {
               using (var context = new FarmersContext(_configuration))
            {
                List<Farmer> farmers = await context.Farmers.ToListAsync();
                if (farmers == null)
                {
                    return null;
                }
                return farmers;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<Farmer> GetById(int farmerId)
    {
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                Farmer? farmer = await context.Farmers.FindAsync(farmerId);
                if (farmer == null)
                {
                    return null;
                }
                return farmer;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<bool> Insert(User user,Farmer farmer,UserRole userRole)
    {
            Console.WriteLine(user.ContactNumber + " "+ user.Password + " " +farmer.FirstName + " " +farmer.LastName + " "+farmer.Location + " " +userRole.Id); 
        bool status = false;
        int userId=0;
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                await context.Users.AddAsync(user);
                await context.SaveChangesAsync();
                userId=user.UserId;
                farmer.UserId=userId;
                userRole.UserId=userId;
                await context.UserRoles.AddAsync(userRole);
                await context.Farmers.AddAsync(farmer);
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

    public async Task<bool> Update(int farmerId, Farmer farmer)
    {
        bool status = false;
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                Farmer? oldFarmer = await context.Farmers.FindAsync(farmerId);
                if (oldFarmer != null)
                {
                    oldFarmer.FirstName = farmer.FirstName;
                    oldFarmer.LastName = farmer.LastName;
                    oldFarmer.Location = farmer.Location;
                    await context.SaveChangesAsync();
                    status= true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }
    public async Task<bool> Delete(int farmerId)
    {
        bool status = false;
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                Farmer? farmer = await context.Farmers.FindAsync(farmerId);
                if (farmer != null)
                {
                    context.Farmers.Remove(farmer);
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

}