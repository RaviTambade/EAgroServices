using BIService.Models;
using BIService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using BIService.Extensions;
namespace BIService.Repositories;
public class TransporterRepository : ITransporterRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;
    public TransporterRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString =
            _configuration.GetConnectionString("DefaultConnection")
            ?? throw new Exception("ConnectionString is not found");
    }
    public async Task<List<YearlyVehicleRevenue>> GetRevenuesByYear(int transporterId, int year)
    {
        List<YearlyVehicleRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query =
                @" SELECT vehicles.rtonumber, SUM(payments.amount) AS amount
                   FROM transporters INNER JOIN vehicles
                   ON transporters.id = vehicles.transporterid
                   INNER JOIN shipments
                   ON vehicles.id=shipments.vehicleid
                   INNER JOIN transporterpayments
                   ON  shipments.id=transporterpayments.shipmentid
                   INNER JOIN payments
                   ON transporterpayments.paymentid=payments.id
                   WHERE transporterid=@transporterId and YEAR(shipments.shipmentdate)=@year
                   GROUP BY vehicles.rtonumber,YEAR(shipments.shipmentdate)";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@transporterId", transporterId);
            command.Parameters.AddWithValue("@year", year);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                result.Add(
                    new YearlyVehicleRevenue
                    {
                        RtoNumber = reader.GetString("RtoNumber"),
                        Amount = reader.GetDouble("Amount")
                    }
                );
            }
            await reader.CloseAsync();
            // result = result.AddMissingYears();
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

      public async Task<List<YearRevenue>> GetRevenueByYear(int transporterId)
    {
        List<YearRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query = @"SELECT YEAR(shipments.shipmentdate) AS Year,SUM(payments.amount) AS Amount
                             FROM vehicles 
                             INNER JOIN transporters ON vehicles.transporterid=transporters.id
                             INNER JOIN shipments ON vehicles.id = shipments.vehicleid
                             INNER JOIN transporterpayments ON shipments.id = transporterpayments.shipmentid
                             INNER JOIN payments ON transporterpayments.paymentid = payments.id
                             WHERE transporters.id =@transporterId
                             GROUP BY YEAR(shipments.shipmentdate)";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@transporterId", transporterId);
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

    public async Task<List<int>> GetYears(int transporterId)
    {
        List<int> years = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query = @"SELECT YEAR(shipments.shipmentdate) AS year 
                             FROM shipments 
                             INNER JOIN vehicles ON shipments.vehicleid=vehicles.id
                             WHERE vehicles.transporterid=@transporterId
                             GROUP BY YEAR(shipments.shipmentdate)";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@transporterId", transporterId);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int year = reader.GetInt32("year");
                years.Add(year);
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

    public async Task<List<MonthRevenue>> GetMonthlyRevenue(int transporterId, int year)
    {
        List<MonthRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query = @"SELECT MONTHNAME(shipments.shipmentdate) AS Month,SUM(payments.amount) AS Amount
                             FROM vehicles 
                             INNER JOIN transporters ON vehicles.transporterid=transporters.id
                             INNER JOIN shipments ON vehicles.id = shipments.vehicleid
                             INNER JOIN transporterpayments ON shipments.id = transporterpayments.shipmentid
                             INNER JOIN payments ON transporterpayments.paymentid = payments.id
                             WHERE transporters.id =@transporterId AND YEAR(shipments.shipmentdate)=@year
                             GROUP BY MONTHNAME(shipments.shipmentdate)";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@transporterId", transporterId);
            command.Parameters.AddWithValue("@year", year);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
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

    public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int transporterId, int year)
    {
        List<QuarterRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query = @"SELECT QUARTER(shipments.shipmentdate) AS Quarter,SUM(payments.amount) AS Amount
                             FROM vehicles 
                             INNER JOIN transporters ON vehicles.transporterid=transporters.id
                             INNER JOIN shipments ON vehicles.id = shipments.vehicleid
                             INNER JOIN transporterpayments ON shipments.id = transporterpayments.shipmentid
                             INNER JOIN payments ON transporterpayments.paymentid = payments.id
                             WHERE transporters.id =@transporterId AND YEAR(shipments.shipmentdate)=@year
                             GROUP BY QUARTER(shipments.shipmentdate)";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@transporterId", transporterId);
            command.Parameters.AddWithValue("@year", year);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                result.Add(
                    new QuarterRevenue
                    {
                        Quarter = reader.GetInt32("Quarter"),
                        Amount = reader.GetDouble("Amount")
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
    public async Task<List<WeekRevenue>> GetRevenuesByWeek(int transporterId,int year ){
        List<WeekRevenue> result=new();
        MySqlConnection connection=new(_connectionString);
        try
        {
              string query = @"SELECT WEEK(shipments.shipmentdate,1) AS WeekNumber,SUM(payments.amount) AS Amount
                             FROM vehicles 
                             INNER JOIN transporters ON vehicles.transporterid=transporters.id
                             INNER JOIN shipments ON vehicles.id = shipments.vehicleid
                             INNER JOIN transporterpayments ON shipments.id = transporterpayments.shipmentid
                             INNER JOIN payments ON transporterpayments.paymentid = payments.id
                             WHERE transporters.id =@transporterId AND YEAR(shipments.shipmentdate)=@year
                             GROUP BY WEEK(shipments.shipmentdate,1)";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@transporterId", transporterId);
            command.Parameters.AddWithValue("@year", year);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
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
            result = result.AddMissingWeeks();
        }
        catch (System.Exception)
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


