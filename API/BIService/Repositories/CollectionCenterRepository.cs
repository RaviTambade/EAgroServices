using BIService.Models;
using BIService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using BIService.Extensions;

namespace BIService.Repositories;

public class CollectionCenterRepository : ICollectionCenterRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public CollectionCenterRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString =
            _configuration.GetConnectionString("DefaultConnection")
            ?? throw new Exception("ConnectionString is not found");
    }

    public async Task<List<YearRevenue>> GetRevenuesByYear(int collectionCenterId)
    {
        List<YearRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query =
                @" SELECT year(payments.Date) AS year, SUM(payments.Amount) AS amount
                FROM goodsservicespayments 
                JOIN goodscollections ON goodsservicespayments.collectionid = goodscollections.id
                JOIN payments  ON goodsservicespayments.paymentid = payments.id
                WHERE goodscollections.collectioncenterid = @centerId
                GROUP BY year(payments.Date)
                ORDER BY year(payments.Date) ASC ";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@centerId", collectionCenterId);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                result.Add(
                    new YearRevenue
                    {
                        Year = reader.GetInt32("year"),
                        Amount = reader.GetDouble("amount")
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

    public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int collectionCenterId, int year)
    {
        List<QuarterRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query =
                @" SELECT QUARTER(payments.Date) AS quarter,  SUM(payments.Amount) AS amount
                FROM goodsservicespayments 
                JOIN goodscollections ON goodsservicespayments.collectionid = goodscollections.id
                JOIN payments ON goodsservicespayments.paymentid = payments.id
                WHERE goodscollections.collectioncenterid = @centerId AND YEAR(payments.Date) = @year
                GROUP BY QUARTER(payments.Date)
                ORDER BY  QUARTER(payments.Date) ASC ";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@centerId", collectionCenterId);
            command.Parameters.AddWithValue("@year", year);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                result.Add(
                    new QuarterRevenue
                    {
                        Quarter = reader.GetInt32("quarter"),
                        Amount = reader.GetDouble("amount")
                    }
                );
            }
            await reader.CloseAsync();
            result = result.AddMissingQuarters();
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

    public async Task<List<MonthRevenue>> GetRevenuesByMonth(int collectionCenterId, int year)
    {
        List<MonthRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query =
                @" SELECT  MONTHNAME(payments.Date) AS month, SUM(payments.Amount) AS amount
                 FROM goodsservicespayments 
                 JOIN goodscollections ON goodsservicespayments.collectionid = goodscollections.id
                 JOIN payments ON goodsservicespayments.paymentid = payments.id
                 WHERE goodscollections.collectioncenterid = @centerId AND YEAR(payments.Date) = @year
                 GROUP BY  MONTH(payments.Date) ORDER BY MONTH(payments.Date) ASC ";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@centerId", collectionCenterId);
            command.Parameters.AddWithValue("@year", year);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                result.Add(
                    new MonthRevenue
                    {
                        Month = reader.GetString("month"),
                        Amount = reader.GetDouble("amount")
                    }
                );
            }
            await reader.CloseAsync();
            result = result.AddMissingMonths();
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

    public async Task<List<WeekRevenue>> GetRevenuesByWeek(int collectionCenterId, int year)
    {
        List<WeekRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query =
                @"SELECT WEEK(payments.Date, 1) AS weeknumber, SUM(payments.Amount) AS amount
                FROM goodsservicespayments 
                JOIN goodscollections ON goodsservicespayments.collectionid = goodscollections.id
                JOIN payments ON goodsservicespayments.paymentid = payments.id
                WHERE goodscollections.collectioncenterid = @centerId AND YEAR(payments.Date) = @year
                GROUP BY WEEK(payments.Date, 1)
                ORDER BY WEEK(payments.Date, 1); ";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@centerId", collectionCenterId);
            command.Parameters.AddWithValue("@year", year);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                result.Add(
                    new WeekRevenue
                    {
                        WeekNumber = reader.GetInt32("weeknumber"),
                        Amount = reader.GetDouble("amount")
                    }
                );
            }
            await reader.CloseAsync();
            result = result.AddMissingWeeks();
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

    public async Task<List<CropRevenue>> GetCropRevenuesByMonth(
        int collectionCenterId,
        int year,
        string monthName
    )
    {
        List<CropRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query =
                @"SELECT crops.title as cropname , SUM(payments.amount) as amount  from goodsservicespayments
                INNER join goodscollections ON goodsservicespayments.collectionid =goodscollections.id
                INNER JOIN crops on goodscollections.cropid = crops.id
                INNER JOIN payments on goodsservicespayments.paymentid =payments.id 
                WHERE goodscollections.collectioncenterid=@centerId AND YEAR(payments.Date) = @year AND MONTHNAME(payments.date)=@monthName
                GROUP BY crops.id  ORDER BY amount DESC ";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@centerId", collectionCenterId);
            command.Parameters.AddWithValue("@year", year);
            command.Parameters.AddWithValue("@monthName", monthName);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                result.Add(
                    new CropRevenue
                    {
                        CropName = reader.GetString("cropname"),
                        Amount = reader.GetDouble("amount")
                    }
                );
            }
            await reader.CloseAsync();
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

    public async Task<List<CropRevenue>> GetCropRevenuesByQuarter(
        int collectionCenterId,
        int year,
        int quarterNumber
    )
    {
        List<CropRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query =
                @"SELECT crops.title as cropname , SUM(payments.amount) as amount  from goodsservicespayments
                INNER join goodscollections ON goodsservicespayments.collectionid =goodscollections.id
                INNER JOIN crops on goodscollections.cropid = crops.id
                INNER JOIN payments on goodsservicespayments.paymentid =payments.id 
                WHERE goodscollections.collectioncenterid=@centerId AND YEAR(payments.Date) = @year AND  QUARTER(payments.date)=@quarterNumber
                GROUP BY crops.id  ORDER BY amount DESC ";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@centerId", collectionCenterId);
            command.Parameters.AddWithValue("@year", year);
            command.Parameters.AddWithValue("@quarterNumber", quarterNumber);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                result.Add(
                    new CropRevenue
                    {
                        CropName = reader.GetString("cropname"),
                        Amount = reader.GetDouble("amount")
                    }
                );
            }
            await reader.CloseAsync();
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

    public async Task<List<CropRevenue>> GetCropRevenuesByYear(int collectionCenterId, int year)
    {
        List<CropRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query =
                @"SELECT crops.title as cropname , SUM(payments.amount) as amount  from goodsservicespayments
                INNER join goodscollections ON goodsservicespayments.collectionid =goodscollections.id
                INNER JOIN crops on goodscollections.cropid = crops.id
                INNER JOIN payments on goodsservicespayments.paymentid =payments.id 
                WHERE goodscollections.collectioncenterid=@centerId AND YEAR(payments.Date) = @year 
                GROUP BY crops.id  ORDER BY amount DESC ";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@centerId", collectionCenterId);
            command.Parameters.AddWithValue("@year", year);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                result.Add(
                    new CropRevenue
                    {
                        CropName = reader.GetString("cropname"),
                        Amount = reader.GetDouble("amount")
                    }
                );
            }
            await reader.CloseAsync();
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

    public async Task<List<CropRevenue>> GetCropRevenuesBetweenDates(
        int collectionCenterId,
        string startDate,
        string endDate
    )
    {
        List<CropRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query =
                @"SELECT crops.title as cropname , SUM(payments.amount) as amount  from goodsservicespayments
                INNER join goodscollections ON goodsservicespayments.collectionid =goodscollections.id
                INNER JOIN crops on goodscollections.cropid = crops.id
                INNER JOIN payments on goodsservicespayments.paymentid =payments.id 
                WHERE goodscollections.collectioncenterid=@centerId AND DATE(payments.Date) >= @startDate  
                AND DATE(payments.Date) <= @endDate  GROUP BY crops.id  ORDER BY amount DESC ";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@centerId", collectionCenterId);
            command.Parameters.AddWithValue("@startDate", startDate);
            command.Parameters.AddWithValue("@endDate", endDate);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                result.Add(
                    new CropRevenue
                    {
                        CropName = reader.GetString("cropname"),
                        Amount = reader.GetDouble("amount")
                    }
                );
            }
            await reader.CloseAsync();
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


public async Task<List<int>> GetYearsForCropRevenues(int collectionCenterId)
    {
        List<int> years = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query =
                @"SELECT DISTINCT  YEAR(payments.Date) as year from goodsservicespayments
                INNER join goodscollections ON goodsservicespayments.collectionid =goodscollections.id
                INNER JOIN payments on goodsservicespayments.paymentid =payments.id 
                WHERE goodscollections.collectioncenterid=@centerId
                ORDER BY year DESC ";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@centerId", collectionCenterId);

            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                years.Add(reader.GetInt32("year"));
            }
            await reader.CloseAsync();
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            connection.Close();
        }

        return years;
    }
}



