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

        // public async Task<IEnumerable<IRevenueModel>> GetMonthRevenues(int collectionCenterId)
        // {
        //     try
        //     {
        //         using (var context = new BIContext(_configuration))
        //         {
        //             var revenueData = await (
        //                 from goodServicePayment in context.GoodsServicesPayments
        //                 join collection in context.GoodsCollections
        //                     on goodServicePayment.CollectionId equals collection.Id
        //                 join payment in context.Payments
        //                     on goodServicePayment.PaymentId equals payment.Id
        //                 where collection.CollectionCenterId == collectionCenterId
        //                 group payment by payment.Date.Month into g
        //                 orderby g.Key
        //                 select new MonthRevenue()
        //                 {
        //                     Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key),
        //                     Amount = g.Sum(p => p.Amount),
        //                 }
        //             ).ToListAsync();
        //             return revenueData;
        //         }
        //     }
        //     catch (Exception e)
        //     {
        //         throw e;
        //     }
        // }

        public async Task<IEnumerable<IRevenueModel>> GetMonthRevenues(int collectionCenterId)
        {
            try
            {
                RevenueType revenueType = RevenueType.Yearly;
                using (var context = new BIContext(_configuration))
                {
                    var baseQuery =
                        from goodServicePayment in context.GoodsServicesPayments
                        join collection in context.GoodsCollections
                            on goodServicePayment.CollectionId equals collection.Id
                        join payment in context.Payments
                            on goodServicePayment.PaymentId equals payment.Id
                        where
                            collection.CollectionCenterId == collectionCenterId
                            && payment.Date.Year == 2023
                        select new { Date = payment.Date, Amount = payment.Amount };

                    switch (revenueType)
                    {
                        case RevenueType.Yearly:

                            var query = await (
                                from goodServicePayment in context.GoodsServicesPayments
                                join collection in context.GoodsCollections
                                    on goodServicePayment.CollectionId equals collection.Id
                                join payment in context.Payments
                                    on goodServicePayment.PaymentId equals payment.Id
                                where collection.CollectionCenterId == collectionCenterId
                                group payment by payment.Date.Year into g
                                select new YearRevenue()
                                {
                                    Year = 2023,
                                    Amount = g.Sum(p => p.Amount)
                                }
                            ).ToListAsync();
                            return query;

                        case RevenueType.Quarterly:
                            var dataRecords = await baseQuery.ToListAsync();
                            var quarterRevenues = (
                                from quarter in Enumerable.Range(1, 4)
                                let startDate = GetStartOfQuarter(2023, quarter)
                                let endDate = startDate.AddMonths(3)
                                let quarterRecords = dataRecords.Where(
                                    record => record.Date >= startDate && record.Date <= endDate
                                )

                                select new QuarterRevenue()
                                {
                                    Quarter = quarter,
                                    StartOfQuarter = startDate.ToLongDateString(),
                                    Amount = quarterRecords.Sum(p => p?.Amount ?? 0),
                                }
                            ).ToList();

                            return quarterRevenues;

                        case RevenueType.Monthly:

                            var monthRevenues = (
                                from month in Enumerable.Range(1, 12)
                                join record in baseQuery
                                    on month equals record.Date.Month
                                    into monthRecords
                                select new MonthRevenue()
                                {
                                    Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(
                                        month
                                    ),
                                    Amount = monthRecords.Sum(p => p?.Amount ?? 0)
                                }
                            ).ToList();

                            return monthRevenues;

                        case RevenueType.Weekly:

                            var dataFromDatabase = await baseQuery.ToListAsync();

                            var maxWeekNumber = dataFromDatabase
                                .Select(
                                    record =>
                                        CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(
                                            record.Date,
                                            CalendarWeekRule.FirstDay,
                                            DayOfWeek.Monday
                                        )
                                )
                                .DefaultIfEmpty()
                                .Max();

                            var weekRevenues = (
                                from weekNumber in Enumerable.Range(1, maxWeekNumber)
                                join record in dataFromDatabase
                                    on weekNumber equals CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(
                                        record.Date,
                                        CalendarWeekRule.FirstDay,
                                        DayOfWeek.Sunday
                                    )
                                    into weekGroup
                                from g in weekGroup.DefaultIfEmpty()
                                orderby weekNumber
                                select new WeekRevenue()
                                {
                                    WeekNumber = weekNumber,
                                    StartOfWeek = GetStartOfWeekForWeekNumber(2023, weekNumber), //pass year
                                    Amount = weekGroup.Sum(p => p?.Amount ?? 0),
                                }
                            ).DistinctBy(w => w.WeekNumber).ToList();

                            return weekRevenues;

                        default:
                            throw new ArgumentOutOfRangeException(nameof(revenueType));
                    }
                }
            }
            catch (Exception)
            {
                throw;
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
                        group new { crop, payment } by crop.Title into g
                        orderby g.Key
                        select new CropRevenue()
                        {
                            CropName = g.Key,
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

        public string GetStartOfWeekForWeekNumber(int year, int weekNumber)
        {
            DateTime referenceDate = new DateTime(year, 1, 1);
            DateTime startOfWeek = referenceDate.AddDays(
                (weekNumber - 1) * 7 - (int)referenceDate.DayOfWeek
            );
            return startOfWeek.ToLongDateString();
        }

        private DateTime GetStartOfQuarter(int year, int quarter)
        {
            int month = (quarter - 1) * 3 + 1;
            return new DateTime(year, month, 1);
        }
    }
}
