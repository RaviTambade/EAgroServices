using Crops.Models;
using Crops.Repositories.Interfaces;
using Crops.Contexts;
using Crops.Entities;


namespace Crops.Repositories;
using Microsoft.EntityFrameworkCore;

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
                List<Crop> varieties = await context.Crops.ToListAsync();
                return varieties;
            }
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<CropNameIdDetails>> GetCropNamesWithId()
    {
        try
        {
            using (var context = new CropContext(_configuration))
            {
                var names = await (from crop in context.Crops 
                select new CropNameIdDetails(){
                    Id=crop.Id,
                    Name=crop.Title
                }).ToListAsync();
                return names;
            }
        }
        catch (Exception)
        {
            throw;
        }
    }
      public async Task<List<string>> GetCropNames()
    {
         try
        {
            using (var context = new CropContext(_configuration))
            {
                var names = await (from crop in context.Crops 
                select crop.Title).ToListAsync();
                return names;
            }
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<Crop?> GetById(int varietyId)
    {
        try
        {
            using (var context = new CropContext(_configuration))
            {
                var variety = await context.Crops.FindAsync(varietyId);
                return variety;
            }
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Insert(Crop variety)
    {
        bool status = false;
        try
        {
            using (var context = new CropContext(_configuration))
            {
                await context.Crops.AddAsync(variety);
                await context.SaveChangesAsync();
                status = true;
            }
        }
        catch (Exception)
        {
            throw;
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
                Crop? oldVariety = await context.Crops.FindAsync(varietyId);
                if (oldVariety != null)
                {
                    oldVariety.Title = variety.Title;
                    oldVariety.ImageUrl = variety.ImageUrl;
                    oldVariety.Rate = variety.Rate;
                    await context.SaveChangesAsync();
                    status = true;
                }
            }
        }
        catch (Exception)
        {
            throw;
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
                Crop? variety = await context.Crops.FindAsync(varietyId);
                if (variety != null)
                {
                    context.Crops.Remove(variety);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }
}
