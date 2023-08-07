
using BIService.Models;
using BIService.Repositories.Interfaces;
using BIService.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace BIService.Repositories
{
    public class CollectionCenterRepository : ICollectionCenterRepository
    { 
        private readonly IConfiguration _configuration;

        public CollectionCenterRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

              public async Task<List<MonthRevenue>> GetMonthRevenues(int collectionCenterId)
        {
            try
            {
                using (var context = new BIContext(_configuration))
                {
                    var revenueData = await (
                        from goodServicePayment in context.GoodsServicesPayments
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

        public async Task<List<MonthOrderCount>> GetMonthOrders(int collectionCenterId)
        {
            try
            {
                using (var context = new BIContext(_configuration))
                {
                    var revenueData = await (
                        from collection in context.GoodsCollections
                        where collection.CollectionCenterId == collectionCenterId
                        group collection by collection.CollectionDate.Month into g
                        orderby g.Key
                        select new MonthOrderCount()
                        {
                            Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key),
                            OrderCount = g.Count()
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

         public async Task<List<CropRevenue>> GetCropRevenues(int collectionCenterId)
        {
            try
            {
                using (var context = new BIContext(_configuration))
                {
                    var revenueData = await (
                        from goodServicePayment in context.GoodsServicesPayments
                        join collection in context.GoodsCollections
                            on goodServicePayment.CollectionId equals collection.Id
                        join crop in context.Crops on collection.CropId equals crop.Id    
                        join payment in context.Payments
                            on goodServicePayment.PaymentId equals payment.Id
                        where collection.CollectionCenterId == collectionCenterId
                        group new{crop,payment} by crop.Title into g
                        orderby g.Key
                        select new CropRevenue()
                        {
                            CropName=g.Key,
                            TotalAmount = g.Sum(cropPayment => cropPayment.payment.Amount)
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

    }
}