using BIService.Models;
using BIService.Repositories.Interfaces;
using System.Globalization;
using MySql.Data.MySqlClient;
using System.Data;

namespace BIService.Repositories;

public class CollectionCenterRepository : ICollectionCenterRepository
{
    private readonly IConfiguration _configuration;
    private string _connectionString;

    public CollectionCenterRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = this._configuration.GetConnectionString("DefaultConnection");
    }

    public async Task<List<IRevenueModel>> GetRevenuesByType(
        int centerId,
        RevenueType revenueType,
        int forYear
    )
    {
        List<IRevenueModel> result = new List<IRevenueModel>();
        using MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand("GetRevenuesByType", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@centerId", centerId);
            command.Parameters.AddWithValue("@revenueType", revenueType.ToString());
            command.Parameters.AddWithValue("@forYear", forYear);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            switch (revenueType)
            {
                case RevenueType.Yearly:
                    while (await reader.ReadAsync())
                    {
                        result.Add(
                            new YearRevenue
                            {
                                Year = reader.GetInt32("Year"),
                                Amount = reader.GetDouble("Amount")
                            }
                        );
                    }
                    await reader.CloseAsync();
                    break;

                case RevenueType.Quarterly:
                    while (await reader.ReadAsync())
                    {
                        result.Add(
                            new QuarterRevenue
                            {
                                Quarter = reader.GetInt32("quarter"),
                                Amount = reader.GetDouble("Amount")
                            }
                        );
                    }
                    await reader.CloseAsync();
                    break;

                case RevenueType.Monthly:
                    while (await reader.ReadAsync())
                    {
                        result.Add(
                            new MonthRevenue
                            {
                                Month = reader.GetString("Month"),
                                Amount = reader.GetDouble("Amount")
                            }
                        );
                    }
                    await reader.CloseAsync();
                    var months = Enumerable
                        .Range(1, 12)
                        .Select(
                            monthNumber =>
                                CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(monthNumber)
                        );
                    var existingMonths = result
                        .OfType<MonthRevenue>()
                        .Select(monthRevenue => monthRevenue.Month);

                    var missingMonths = months.Except(existingMonths);

                    var missingMonthRevenues = missingMonths.Select(
                        month => new MonthRevenue { Month = month, Amount = 0 }
                    );

                    result = result
                        .OfType<MonthRevenue>()
                        .Concat(missingMonthRevenues)
                        .OrderBy(
                            monthRevenue => Array.IndexOf(months.ToArray(), monthRevenue.Month)
                        )
                        .Cast<IRevenueModel>()
                        .ToList();
                    break;

                case RevenueType.Weekly:
                    while (await reader.ReadAsync())
                    {
                        result.Add(
                            new WeekRevenue
                            {
                                WeekNumber = reader.GetInt32("WeekNumber"),
                                Amount = reader.GetDouble("Amount")
                            }
                        );
                    }
                    await reader.CloseAsync();
                    var weeks = Enumerable.Range(1, 52);
                    var existingWeekNumbers = result
                        .OfType<WeekRevenue>()
                        .Select(weekRevenue => weekRevenue.WeekNumber);

                    var missingWeekNumbers = weeks.Except(existingWeekNumbers);

                    var missingWeekRevenues = missingWeekNumbers.Select(
                        weekNumber => new WeekRevenue { WeekNumber = weekNumber, Amount = 0 }
                    );

                    result = result
                        .OfType<WeekRevenue>()
                        .Concat(missingWeekRevenues)
                        .OrderBy(weekRevenue => weekRevenue.WeekNumber)
                        .Cast<IRevenueModel>()
                        .ToList();
                    break;

                default:
                    break;
            }
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            connection.Close(); 
        }

        return result;
    }
}

//         public async Task<List<MonthOrderCount>> GetMonthOrders(int collectionCenterId)
//         {
//             try
//             {
//                 using (var context = new BIContext(_configuration))
//                 {
//                     var revenueData = await (
//                         from collection in context.GoodsCollections
//                         where collection.CollectionCenterId == collectionCenterId
//                         group collection by collection.CollectionDate.Month into g
//                         orderby g.Key
//                         select new MonthOrderCount()
//                         {
//                             Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key),
//                             OrderCount = g.Count()
//                         }
//                     ).ToListAsync();
//                     return revenueData;
//                 }
//             }
//             catch (Exception e)
//             {
//                 throw e;
//             }
//         }

//         public async Task<List<CropRevenue>> GetCropRevenues(int collectionCenterId)
//         {
//             try
//             {
//                 using (var context = new BIContext(_configuration))
//                 {
//                     var revenueData = await (
//                         from goodServicePayment in context.GoodsServicesPayments
//                         join collection in context.GoodsCollections
//                             on goodServicePayment.CollectionId equals collection.Id
//                         join crop in context.Crops on collection.CropId equals crop.Id
//                         join payment in context.Payments
//                             on goodServicePayment.PaymentId equals payment.Id
//                         where collection.CollectionCenterId == collectionCenterId
//                         group new { crop, payment } by crop.Title into g
//                         orderby g.Key
//                         select new CropRevenue()
//                         {
//                             CropName = g.Key,
//                             TotalAmount = g.Sum(cropPayment => cropPayment.payment.Amount)
//                         }
//                     ).ToListAsync();
//                     return revenueData;
//                 }
//             }
//             catch (Exception e)
//             {
//                 throw e;
//             }
//         }

//         public string GetStartOfWeekForWeekNumber(int year, int weekNumber)
//         {
//             DateTime referenceDate = new DateTime(year, 1, 1);
//             DateTime startOfWeek = referenceDate.AddDays(
//                 (weekNumber - 1) * 7 - (int)referenceDate.DayOfWeek
//             );
//             return startOfWeek.ToLongDateString();
//         }

//         private DateTime GetStartOfQuarter(int year, int quarter)
//         {
//             int month = (quarter - 1) * 3 + 1;
//             return new DateTime(year, month, 1);
//         }
//     }
// }
