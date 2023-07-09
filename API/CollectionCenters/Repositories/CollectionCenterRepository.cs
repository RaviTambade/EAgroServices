using CollectionCenters.Models;
using CollectionCenters.Repositories.Interfaces;
using CollectionCenters.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;

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
                    if (collectionCenters == null)
                    {
                        return null;
                    }
                    return collectionCenters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<CollectionCenter> GetById(int collectionCenterId)
        {
            try
            {
                using (var context = new CollectionCenterContext(_configuration))
                {
                    var collectionCenter = await context.CollectionCenters.FindAsync(
                        collectionCenterId
                    );

                    if (collectionCenter == null)
                    {
                        return null;
                    }

                    return collectionCenter;
                }
            }
            catch (Exception e)
            {
                throw e;
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
            catch (Exception e)
            {
                throw e;
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
                        oldCollectionCenter.InspectorId = collectionCenter.InspectorId;
                        status = await SaveChanges(context);
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
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
            catch (Exception e)
            {
                throw e;
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
    }
}
