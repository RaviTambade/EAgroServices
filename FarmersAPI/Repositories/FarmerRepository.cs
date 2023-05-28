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
    public async Task<List<Farmer>> GetFarmers()
    {
        try
        {
               using (var context = new FarmersContext(_configuration))
            {
                var  farmers =
                        await (from farmer in context.Farmers 
                        join  userRole in context.UserRoles
                        on farmer.Id equals userRole.UserId
                        join role in context.Roles
                        on userRole.RoleId equals role.Id
                        where role.Name=="farmer"
                        select farmer).ToListAsync();
                if (farmers == null)
                {
                    return null;
                }
                return  farmers;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<Farmer> GetFarmer(int farmerId)
    {
        try
        {
            using (var context = new FarmersContext(_configuration))
            {
                Farmer? farmer = 
                 await (from f in context.Farmers 
                        join  userRole in context.UserRoles
                        on f.Id equals userRole.UserId
                        join role in context.Roles
                        on userRole.RoleId equals role.Id
                        where role.Name=="farmer" && f.Id==farmerId
                        select f).FirstOrDefaultAsync();
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
   
}