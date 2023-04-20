using FarmersAPI.Contexts;
using FarmersAPI.Models;
using FarmersAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
namespace FarmersAPI.Repositories;
public class FarmerRepository : IFarmerRepository
{
    private readonly IConfiguration _configuration;
    public FarmerRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<Farmer>> GetAllFarmers()
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

    public async Task<Farmer> GetFarmerById(int farmerId)
    {
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                Farmer farmer = await context.Farmers.FindAsync(farmerId);
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
    public async Task<bool> InsertFarmer(Farmer farmer)
    {
        bool status = false;
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
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

    public async Task<bool> UpdateFarmer(int farmerId, Farmer farmer)
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
                    oldFarmer.ContactNumber = farmer.ContactNumber;
                    oldFarmer.Location = farmer.Location;
                    oldFarmer.Password = farmer.Password;
                    oldFarmer.CreditBalance = farmer.CreditBalance;
                    oldFarmer.DebitBalance = farmer.DebitBalance;
                    oldFarmer.TotalBalance = farmer.TotalBalance;
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
    public async Task<bool> DeleteFarmer(int farmerId)
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