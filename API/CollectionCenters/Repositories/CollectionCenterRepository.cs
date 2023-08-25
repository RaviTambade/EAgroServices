using CollectionCenters.Models;
using CollectionCenters.Repositories.Interfaces;
using CollectionCenters.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using CollectionCenters.Entities;


namespace CollectionCenters.Repositories
{
    public class CollectionCenterRepository : ICollectionCenterRepository
    {
        private readonly IConfiguration _configuration;

        public CollectionCenterRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<CollectionCenter>> GetAll()
        {
            try
            {
                using (var context = new CollectionCenterContext(_configuration))
                {
                    var collectionCenters = await context.CollectionCenters.ToListAsync();
                    return collectionCenters;
                }
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
                using (var context = new CollectionCenterContext(_configuration))
                {
                    var collectionCenter = await context.CollectionCenters.FindAsync(
                        collectionCenterId
                    );
                    return collectionCenter ;
                }
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
                bool status = false;
                using (var context = new CollectionCenterContext(_configuration))
                {
                    await context.CollectionCenters.AddAsync(collectionCenter);
                    status = await SaveChanges(context);
                }
                return status;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Update(CollectionCenter collectionCenter)
        {
            try
            {
                bool status = false;
                using (var context = new CollectionCenterContext(_configuration))
                {
                    var oldCollectionCenter = await context.CollectionCenters.FindAsync(
                        collectionCenter.Id
                    );
                    if (oldCollectionCenter is not null)
                    {
                        oldCollectionCenter.CorporateId = collectionCenter.CorporateId;
                        oldCollectionCenter.ManagerId = collectionCenter.ManagerId;
                        status = await SaveChanges(context);
                    }
                    return status;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Delete(int collectionCenterId)
        {
            try
            {
                bool status = false;
                using (var context = new CollectionCenterContext(_configuration))
                {
                    var collectionCenter = await context.CollectionCenters.FindAsync(
                        collectionCenterId
                    );
                    if (collectionCenter is not null)
                    {
                        context.CollectionCenters.Remove(collectionCenter);
                        status = await SaveChanges(context);
                    }
                    return status;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<int> GetCollectionCenterIdByManagerId(int managerId)
        {
            try
            {
                using (var context = new CollectionCenterContext(_configuration))
                {
                    var collectionCenterId = await (
                        from CollectionCenter in context.CollectionCenters
                        where CollectionCenter.ManagerId == managerId
                        select CollectionCenter.Id
                    ).FirstOrDefaultAsync();
                    return collectionCenterId;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        private async Task<bool> SaveChanges(CollectionCenterContext context)
        {
            int rowsAffected = await context.SaveChangesAsync();
            if (rowsAffected > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<List<CollectionCenterCorporate>> GetCollectionCenterAndCorporateId()
        {
            try
            {
                using (var context = new CollectionCenterContext(_configuration))
                {
                    return await context.CollectionCenters
                        .Select(
                            collectionCenter =>
                                new CollectionCenterCorporate()
                                {
                                    Id = collectionCenter.Id,
                                    CorporateId = collectionCenter.CorporateId
                                }
                        )
                        .ToListAsync();
                }
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
                using (var context = new CollectionCenterContext(_configuration))
                {
                    var corporateId = await (
                        from CollectionCenter in context.CollectionCenters
                        where CollectionCenter.Id == collectionCenterId
                        select CollectionCenter.CorporateId
                    ).FirstOrDefaultAsync();
                    return corporateId;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
