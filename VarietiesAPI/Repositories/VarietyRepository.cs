using VarietiesAPI.Contexts;
using VarietiesAPI.Models;
using VarietiesAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
namespace VarietiesAPI.Repositories;
public class VarietyRepository : IVarietyRepository
{
    private readonly IConfiguration _configuration;
    public VarietyRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<Variety>> GetAll()
    {
        try
        {
               using (var context = new VarietyContext(_configuration))
            {
                List<Variety> varieties = await context.Variety.ToListAsync();
                if (varieties == null)
                {
                    return null;
                }
                return varieties;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<Variety> GetById(int varietyId)
    {
        try
        {
            using (var context = new VarietyContext(_configuration))
            {
                Variety variety = await context.Variety.FindAsync(varietyId);
                if (variety == null)
                {
                    return null;
                }
                return variety;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<bool> Insert(Variety variety)
    {
        bool status = false;
        try
        {
            using (var context = new VarietyContext(_configuration))
            {
                
                await context.Variety.AddAsync(variety);
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

    public async Task<bool> Update(int varietyId, Variety variety)
    {
        bool status = false;
        try
        {
            using (var context = new VarietyContext(_configuration))
            {
                Variety? oldVariety = await context.Variety.FindAsync(varietyId);
                if (oldVariety != null)
                {
                    oldVariety.VarietyName = variety.VarietyName;
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
    public async Task<bool> Delete(int varietyId)
    {
        bool status = false;
        try
        {
            using (var context = new VarietyContext(_configuration))
            {
                Variety? variety = await context.Variety.FindAsync(varietyId);
                if (variety != null)
                {
                    context.Variety.Remove(variety);
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