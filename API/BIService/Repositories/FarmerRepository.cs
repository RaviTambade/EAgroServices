using BIService.Models;
using BIService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using BIService.Extensions;

namespace BIService.Repositories{

    public class FarmerRepository:IFarmerRepository
    {
         private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public FarmerRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString =
            _configuration.GetConnectionString("DefaultConnection")
            ?? throw new Exception("ConnectionString is not found");
    }
     public async Task<List<YearRevenue>> GetRevenuesByYear(int farmerId)
    {
        List<YearRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query =
                @"    SELECT year(invoices. invoicedate) AS Year, SUM(invoices.totalamount) AS Amount
                FROM invoices 
                JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
                JOIN goodscollections  ON shipmentitems.collectionid = goodscollections.id
                WHERE goodscollections. farmerid =@farmerId 
                GROUP BY year(invoices. invoicedate)
                ORDER BY year(invoices. invoicedate) ASC  ";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@farmerId", farmerId);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
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
            result = result.AddMissingYears();
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

//     public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int collectionCenterId, int year)
//     {
//         List<QuarterRevenue> result = new();
//         MySqlConnection connection = new(_connectionString);
//         try
//         {
//             string query =
//                 @" SELECT QUARTER(payments.Date) AS quarter,  SUM(payments.Amount) AS Amount
//                 FROM goodsservicespayments 
//                 JOIN goodscollections ON goodsservicespayments.collectionid = goodscollections.id
//                 JOIN payments ON goodsservicespayments.paymentid = payments.id
//                 WHERE goodscollections.collectioncenterid = @centerId AND YEAR(payments.Date) = @year
//                 GROUP BY QUARTER(payments.Date)
//                 ORDER BY  QUARTER(payments.Date) ASC; ";
//             MySqlCommand command = new(query, connection);
//             command.Parameters.AddWithValue("@centerId", collectionCenterId);
//             command.Parameters.AddWithValue("@year", year);
//             await connection.OpenAsync();
//             using MySqlDataReader reader = command.ExecuteReader();
//             while (await reader.ReadAsync())
//             {
//                 result.Add(
//                     new QuarterRevenue
//                     {
//                         Quarter = reader.GetInt32("quarter"),
//                         Amount = reader.GetDouble("Amount")
//                     }
//                 );
//             }
//             await reader.CloseAsync();
//             result = result.AddMissingQuarters();
//         }
//         catch (Exception)
//         {
//             throw;
//         }
//         finally
//         {
//             connection.Close();
//         }

//         return result;
//     }

//     public async Task<List<MonthRevenue>> GetRevenuesByMonth(int collectionCenterId, int year)
//     {
//         List<MonthRevenue> result = new();
//         MySqlConnection connection = new(_connectionString);
//         try
//         {
//             string query =
//                 @" SELECT  MONTHNAME(payments.Date) AS Month, SUM(payments.Amount) AS Amount
//                  FROM goodsservicespayments 
//                  JOIN goodscollections ON goodsservicespayments.collectionid = goodscollections.id
//                  JOIN payments ON goodsservicespayments.paymentid = payments.id
//                  WHERE goodscollections.collectioncenterid = @centerId AND YEAR(payments.Date) = @year
//                  GROUP BY  MONTH(payments.Date) ORDER BY MONTH(payments.Date) ASC ";
//             MySqlCommand command = new(query, connection);
//             command.Parameters.AddWithValue("@centerId", collectionCenterId);
//             command.Parameters.AddWithValue("@year", year);
//             await connection.OpenAsync();
//             using MySqlDataReader reader = command.ExecuteReader();
//             while (await reader.ReadAsync())
//             {
//                 result.Add(
//                     new MonthRevenue
//                     {
//                         Month = reader.GetString("Month"),
//                         Amount = reader.GetDouble("Amount")
//                     }
//                 );
//             }
//             await reader.CloseAsync();
//             result = result.AddMissingMonths();
//         }
//         catch (Exception)
//         {
//             throw;
//         }
//         finally
//         {
//             connection.Close();
//         }

//         return result;
//     }

//     public async Task<List<WeekRevenue>> GetRevenuesByWeek(int collectionCenterId, int year)
//     {
//         List<WeekRevenue> result = new();
//         MySqlConnection connection = new(_connectionString);
//         try
//         {
//             string query =
//                 @"SELECT WEEK(payments.Date, 1) AS WeekNumber, SUM(payments.Amount) AS Amount
//                 FROM goodsservicespayments 
//                 JOIN goodscollections ON goodsservicespayments.collectionid = goodscollections.id
//                 JOIN payments ON goodsservicespayments.paymentid = payments.id
//                 WHERE goodscollections.collectioncenterid = @centerId AND YEAR(payments.Date) = @year
//                 GROUP BY WEEK(payments.Date, 1)
//                 ORDER BY WEEK(payments.Date, 1); ";
//             MySqlCommand command = new(query, connection);
//             command.Parameters.AddWithValue("@centerId", collectionCenterId);
//             command.Parameters.AddWithValue("@year", year);
//             await connection.OpenAsync();
//             using MySqlDataReader reader = command.ExecuteReader();
//             while (await reader.ReadAsync())
//             {
//                 result.Add(
//                     new WeekRevenue
//                     {
//                         WeekNumber = reader.GetInt32("WeekNumber"),
//                         Amount = reader.GetDouble("Amount")
//                     }
//                 );
//             }
//             await reader.CloseAsync();
//             result = result.AddMissingWeeks();
//         }
//         catch (Exception)
//         {
//             throw;
//         }
//         finally
//         {
//             connection.Close();
//         }

//         return result;
//     }
     }
 }