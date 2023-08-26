using Transflower.EAgroServices.CollectionCenters.Models;
using Transflower.EAgroServices.CollectionCenters.Repositories.Interfaces;
using Transflower.EAgroServices.CollectionCenters.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using Transflower.EAgroServices.CollectionCenters.Entities;

namespace Transflower.EAgroServices.CollectionCenters.Repositories;

public class CollectionCenterRepository : ICollectionCenterRepository
{
    private readonly CollectionCenterContext _context;

    public CollectionCenterRepository(CollectionCenterContext context)
    {
        _context = context;
    }

    public async Task<List<CollectionCenter>> GetAll()
    {
        try
        {
            List<CollectionCenter> collectionCenters =
                await _context.CollectionCenters.ToListAsync();
            return collectionCenters;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<CollectionCenter?> GetById(int collectionCenterId)
    {
        try
        {
            CollectionCenter? collectionCenter = await _context.CollectionCenters.FindAsync(
                collectionCenterId
            );
            return collectionCenter;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Insert(CollectionCenter collectionCenter)
    {
        try
        {
            await _context.CollectionCenters.AddAsync(collectionCenter);
            bool status = await SaveChanges(_context);
            return status;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Update(CollectionCenter collectionCenter)
    {
        bool status = false;

        try
        {
            CollectionCenter? oldCollectionCenter = await _context.CollectionCenters.FindAsync(
                collectionCenter.Id
            );
            if (oldCollectionCenter is not null)
            {
                oldCollectionCenter.CorporateId = collectionCenter.CorporateId;
                oldCollectionCenter.ManagerId = collectionCenter.ManagerId;
                status = await SaveChanges(_context);
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<bool> Delete(int collectionCenterId)
    {
        bool status = false;
        try
        {
            CollectionCenter? collectionCenter = await _context.CollectionCenters.FindAsync(
                collectionCenterId
            );
            if (collectionCenter is not null)
            {
                _context.CollectionCenters.Remove(collectionCenter);
                status = await SaveChanges(_context);
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<int> GetCollectionCenterIdByManagerId(int managerId)
    {
        try
        {
            int collectionCenterId = await (
                from CollectionCenter in _context.CollectionCenters
                where CollectionCenter.ManagerId == managerId
                select CollectionCenter.Id
            ).FirstOrDefaultAsync();
            return collectionCenterId;
        }
        catch (Exception)
        {
            throw;
        }
    }

    private async Task<bool> SaveChanges(CollectionCenterContext context)
    {
        int rowsAffected = await context.SaveChangesAsync();
        return rowsAffected > 0;
    }

    public async Task<List<CollectionCenterCorporate>> GetCollectionCenterAndCorporateId()
    {
        try
        {
            List<CollectionCenterCorporate> collectionCenterCorporates =
                await _context.CollectionCenters
                    .Select(
                        collectionCenter =>
                            new CollectionCenterCorporate()
                            {
                                Id = collectionCenter.Id,
                                CorporateId = collectionCenter.CorporateId
                            }
                    )
                    .ToListAsync();
            return collectionCenterCorporates;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<int> GetCorporateIdByCollectionCenterId(int collectionCenterId)
    {
        try
        {
            int corporateId = await (
                from CollectionCenter in _context.CollectionCenters
                where CollectionCenter.Id == collectionCenterId
                select CollectionCenter.CorporateId
            ).FirstOrDefaultAsync();
            return corporateId;
        }
        catch (Exception)
        {
            throw;
        }
    }
}
