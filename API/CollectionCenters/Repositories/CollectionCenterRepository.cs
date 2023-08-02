using CollectionCenters.Models;
using CollectionCenters.Repositories.Interfaces;
using CollectionCenters.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

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

        public async Task<int> GetCollectionCenterIdByInspectorId(int inspectorId)
        {
            try
            {
                using (var context = new CollectionCenterContext(_configuration))
                {
                    var collectionCenterId = await (
                        from CollectionCenter in context.CollectionCenters
                        where CollectionCenter.InspectorId == inspectorId
                        select CollectionCenter.Id
                    ).FirstOrDefaultAsync();
                    return collectionCenterId;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<MonthRevenue>> GetMonthRevenue(int collectionCenterId)
        {
            try
            {
                using (var context = new CollectionCenterContext(_configuration))
                {
                    var revenueData = await (
                        from goodServicePayment in context.CollctionCenterPayments
                        join collection in context.GoodsCollections
                            on goodServicePayment.CollectionId equals collection.Id
                        join payment in context.Payments
                            on goodServicePayment.PaymentId equals payment.Id
                        where collection.CollectionCenterId == collectionCenterId
                        group payment by payment.Date.Month into g
                        orderby g.Key
                        select new MonthRevenue()
                        {
                            Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key),
                            TotalAmount = g.Sum(p => p.Amount)
                        }
                    ).ToListAsync();
                    return revenueData;
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
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
