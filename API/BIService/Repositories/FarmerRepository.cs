using Transflower.EAgroServices.BIService.Models;
using Transflower.EAgroServices.BIService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using Transflower.EAgroServices.BIService.Extensions;
namespace Transflower.EAgroServices.BIService.Repositories
{
    public class FarmerRepository : IFarmerRepository
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
            List<YearRevenue> yearRevenues = new();
            MySqlConnection connection = new(_connectionString);
            try
            {
                string query =
                    @"    SELECT year(invoices. invoicedate) AS Year, SUM(invoices.totalamount) AS Amount
                FROM invoices 
                JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
                JOIN goodscollections  ON shipmentitems.collectionid = goodscollections.id
                WHERE invoices.paymentstatus = 'paid' AND goodscollections. farmerid =@farmerId 
                GROUP BY year(invoices. invoicedate)
                ORDER BY year(invoices. invoicedate) ASC ";
                MySqlCommand command = new(query, connection);
                command.Parameters.AddWithValue("@farmerId", farmerId);
                await connection.OpenAsync();
                MySqlDataReader reader = command.ExecuteReader();
                while (await reader.ReadAsync())
                {
                    yearRevenues.Add(
                        new YearRevenue
                        {
                            Year = reader.GetInt32("Year"),
                            Amount = reader.GetDouble("Amount")
                        }
                    );
                }
                await reader.CloseAsync();
                yearRevenues = yearRevenues.AddMissingYears();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                connection.Close();
            }
            return yearRevenues;
        }
        public async Task<List<QuarterRevenue>> GetRevenuesByQuarter(int farmerId, int year)
        {
            List<QuarterRevenue> quarterRevenues = new();
            MySqlConnection connection = new(_connectionString);
            try
            {
                string query =
                    @"SELECT QUARTER(invoices. invoicedate) AS Quarter, SUM(invoices.totalamount) AS Amount
                FROM invoices 
                JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
                JOIN goodscollections  ON shipmentitems.collectionid = goodscollections.id
                WHERE  invoices.paymentstatus = 'paid' AND goodscollections. farmerid =@farmerId AND YEAR(invoices.invoicedate) = @year
                GROUP BY QUARTER(invoices. invoicedate)
                ORDER BY QUARTER(invoices. invoicedate) ASC ";
                MySqlCommand command = new(query, connection);
                command.Parameters.AddWithValue("@farmerId", farmerId);
                command.Parameters.AddWithValue("@year", year);
                await connection.OpenAsync();
                using MySqlDataReader reader = command.ExecuteReader();
                while (await reader.ReadAsync())
                {
                    quarterRevenues.Add(
                        new QuarterRevenue
                        {
                            Quarter = reader.GetInt32("Quarter"),
                            Amount = reader.GetDouble("Amount")
                        }
                    );
                }
                await reader.CloseAsync();
                quarterRevenues = quarterRevenues.AddMissingQuarters();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                connection.Close();
            }
            return quarterRevenues;
        }

        public async Task<List<MonthRevenue>> GetRevenuesByMonth(int farmerId, int year)
        {
            List<MonthRevenue> monthRevenues = new();
            MySqlConnection connection = new(_connectionString);
            try
            {
                string query =
                    @" SELECT  MONTHNAME(invoices. invoicedate) AS Month, SUM(invoices.totalamount) AS Amount
                FROM invoices 
                JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
                JOIN goodscollections  ON shipmentitems.collectionid = goodscollections.id
                WHERE invoices.paymentstatus = 'paid' AND goodscollections. farmerid =@farmerId AND YEAR(invoices. invoicedate) = @year
                 GROUP BY  MONTHNAME(invoices. invoicedate) ORDER BY MONTHNAME(invoices. invoicedate) ASC ";
                MySqlCommand command = new(query, connection);
                command.Parameters.AddWithValue("@farmerId", farmerId);
                command.Parameters.AddWithValue("@year", year);
                await connection.OpenAsync();
                using MySqlDataReader reader = command.ExecuteReader();
                while (await reader.ReadAsync())
                {
                    monthRevenues.Add(
                        new MonthRevenue
                        {
                            Month = reader.GetString("Month"),
                            Amount = reader.GetDouble("Amount")
                        }
                    );
                }
                await reader.CloseAsync();
                monthRevenues = monthRevenues.AddMissingMonths();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                connection.Close();
            }

            return monthRevenues;
        }

        public async Task<List<WeekRevenue>> GetRevenuesByWeek(int farmerId, int year)
        {
            List<WeekRevenue> weekRevenues = new();
            MySqlConnection connection = new(_connectionString);
            try
            {
                string query =
                    @"SELECT WEEK(invoices. invoicedate,1) AS WeekNumber, SUM(invoices.totalamount) AS Amount
                FROM invoices 
                JOIN shipmentitems ON invoices.shipmentitemid = shipmentitems.id
                JOIN goodscollections  ON shipmentitems.collectionid = goodscollections.id
                WHERE invoices.paymentstatus = 'paid' AND goodscollections. farmerid = @farmerId AND YEAR(invoices. invoicedate) = @year
                GROUP BY WEEK(invoices. invoicedate, 1)
                ORDER BY WEEK(invoices. invoicedate, 1); ";
                MySqlCommand command = new(query, connection);
                command.Parameters.AddWithValue("@farmerId", farmerId);
                command.Parameters.AddWithValue("@year", year);
                await connection.OpenAsync();
                using MySqlDataReader reader = command.ExecuteReader();
                while (await reader.ReadAsync())
                {
                    weekRevenues.Add(
                        new WeekRevenue
                        {
                            WeekNumber = reader.GetInt32("WeekNumber"),
                            Amount = reader.GetDouble("Amount")
                        }
                    );
                }
                await reader.CloseAsync();
                weekRevenues = weekRevenues.AddMissingWeeks();
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                connection.Close();
            }

            return weekRevenues;
        }
    }
}