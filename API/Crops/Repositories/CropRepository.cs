using Microsoft.EntityFrameworkCore;
using Transflower.EAgroServices.Crops.Contexts;
using Transflower.EAgroServices.Crops.Entities;
using Transflower.EAgroServices.Crops.Models;
using Transflower.EAgroServices.Crops.Repositories.Interfaces;

namespace Transflower.EAgroServices.Crops.Repositories;

public class CropRepository : ICropRepository
{
    private readonly CropContext _context;

    public CropRepository(CropContext context)
    {
        _context = context;
    }

    public async Task<List<Crop>> GetAll()
    {
        try
        {
            List<Crop> crops = await _context.Crops.ToListAsync();
            return crops;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<CropDetail>> GetCropNamesWithId()
    {
        try
        {
            List<CropDetail> cropDetails = await (
                from crop in _context.Crops
                select new CropDetail() { Id = crop.Id, Name = crop.Title }
            ).ToListAsync();
            return cropDetails;
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
            List<string> cropNames = await (
                from crop in _context.Crops
                select crop.Title
            ).ToListAsync();
            return cropNames;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<Crop?> GetById(int cropId)
    {
        try
        {
            Crop? crop = await _context.Crops.FindAsync(cropId);
            return crop;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Insert(Crop crop)
    {
        bool status = false;
        try
        {
            await _context.Crops.AddAsync(crop);
            status = await SaveChanges(_context);
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<bool> Update(int cropId, Crop crop)
    {
        bool status = false;
        try
        {
            Crop? oldVariety = await _context.Crops.FindAsync(cropId);
            if (oldVariety != null)
            {
                oldVariety.Title = crop.Title;
                oldVariety.ImageUrl = crop.ImageUrl;
                oldVariety.Rate = crop.Rate;
                status = await SaveChanges(_context);
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<bool> Delete(int cropId)
    {
        bool status = false;
        try
        {
            Crop? crop = await _context.Crops.FindAsync(cropId);
            if (crop is not null)
            {
                _context.Crops.Remove(crop);
                status = await SaveChanges(_context);
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    private async Task<bool> SaveChanges(CropContext context)
    {
        int rowsAffected = await context.SaveChangesAsync();
        return rowsAffected > 0;
    }
}
