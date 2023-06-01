using CropsAPI.Contexts;
using CropsAPI.Models;
using CropsAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace CropsAPI.Repositories;
public class CropRepository : ICropRepository
{
    private readonly IConfiguration _configuration;
    public CropRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<Crop>> GetAll()
    {
        try
        {
               using (var context = new CropContext(_configuration))
            {
                List<Crop> varieties = await context.Crop.ToListAsync();
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

    public async Task<Crop> GetById(int varietyId)
    {
        try
        {
            using (var context = new CropContext(_configuration))
            {
                Crop variety = await context.Crop.FindAsync(varietyId);
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
    public async Task<bool> Insert(Crop variety)
    {
        bool status = false;
        try
        {
            using (var context = new CropContext(_configuration))
            {
                
                await context.Crop.AddAsync(variety);
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

    public async Task<bool> Update(int varietyId, Crop variety)
    {
        bool status = false;
        try
        {
            using (var context = new CropContext(_configuration))
            {
                Crop? oldVariety = await context.Crop.FindAsync(varietyId);
                if (oldVariety != null)
                {
                    oldVariety.Title = variety.Title;
                    oldVariety.ImageUrl = variety.ImageUrl;
                    oldVariety.Rate=variety.Rate;
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
            using (var context = new CropContext(_configuration))
            {
                Crop? variety = await context.Crop.FindAsync(varietyId);
                if (variety != null)
                {
                    context.Crop.Remove(variety);
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