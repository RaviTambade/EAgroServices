using Transflower.EAgroServices.BIService.Models;
using Transflower.EAgroServices.BIService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace Transflower.EAgroServices.BIService.Repositories
{
    public class MerchantRepository : IMerchantRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public MerchantRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString =
                _configuration.GetConnectionString("DefaultConnection")
                ?? throw new Exception("ConnectionString is not found");
        }

        public async Task<List<CollectionCenterMonthCount>> GetCollectionCountByMonth(int merchantId, int year,string monthName)
        {
            List<CollectionCenterMonthCount> collectionCenterMonthCounts = new();
            MySqlConnection connection = new(_connectionString);
            try
            {
                string query =
                    @" SELECT  MONTHNAME(shipments.shipmentdate) AS month,
                        collectioncenters.corporateid AS corporateid, 
                        COUNT(*) AS count
                    FROM collectioncenters
                    INNER JOIN goodscollections ON collectioncenters.id = goodscollections.collectioncenterid
                    INNER JOIN shipmentitems ON goodscollections.id = shipmentitems.collectionid
                    INNER JOIN shipments ON shipmentitems.shipmentid = shipments.id
                    WHERE shipments.merchantid =@merchantId AND shipments.status='delivered' AND YEAR(shipments.shipmentdate)=@year AND MONTHNAME(shipments.shipmentdate)=@monthName
                   GROUP BY collectioncenters.corporateid,MONTHNAME(shipments.shipmentdate) ORDER BY MONTHNAME(shipments.shipmentdate) ASC ";
                MySqlCommand command = new(query, connection);
                command.Parameters.AddWithValue("@merchantId", merchantId);
                command.Parameters.AddWithValue("@year", year);
                command.Parameters.AddWithValue("@monthName", monthName);
                await connection.OpenAsync();
                MySqlDataReader reader = command.ExecuteReader();
                while (await reader.ReadAsync())
                {
                    collectionCenterMonthCounts.Add(
                        new CollectionCenterMonthCount
                        {
                            collectionCenterId = reader.GetInt32("corporateid"),
                            Month = reader.GetString("month"),
                            Count = reader.GetInt32("count")
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
            return collectionCenterMonthCounts;
        }
        public async Task<List<CollectionCenterYearCount>> GetCollectionCountByYear(int merchantId,int year)
        {
            List<CollectionCenterYearCount> collectionCenterYearCounts = new();
            MySqlConnection connection = new(_connectionString);
            try
            {
                string query =
                    @" SELECT  YEAR(shipments.shipmentdate) AS year,
                        collectioncenters.corporateid AS corporateid, 
                        COUNT(*) AS count
                    FROM collectioncenters
                    INNER JOIN goodscollections ON collectioncenters.id = goodscollections.collectioncenterid
                    INNER JOIN shipmentitems ON goodscollections.id = shipmentitems.collectionid
                    INNER JOIN shipments ON shipmentitems.shipmentid = shipments.id
                    WHERE shipments.merchantid =@merchantId AND shipments.status='delivered' AND YEAR(shipments.shipmentdate)=@year
                   GROUP BY collectioncenters.corporateid,YEAR(shipments.shipmentdate) ORDER BY YEAR(shipments.shipmentdate) ASC ";
                MySqlCommand command = new(query, connection);
                command.Parameters.AddWithValue("@merchantId", merchantId);
                command.Parameters.AddWithValue("@year", year);
                await connection.OpenAsync();
                MySqlDataReader reader = command.ExecuteReader();
                while (await reader.ReadAsync())
                {
                    collectionCenterYearCounts.Add(
                        new CollectionCenterYearCount
                        {
                            CollectionCenterId = reader.GetInt32("corporateid"),
                            Year = reader.GetInt32("year"),
                            Count = reader.GetInt32("count")
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
            return collectionCenterYearCounts;
        }
        public async Task<List<CollectionCenterQuarterCount>> GetCollectionCountByQuarter(int merchantId, int year)
        {
            List<CollectionCenterQuarterCount> collectionCenterQuarterCounts = new();
            MySqlConnection connection = new(_connectionString);
            try
            {
                string query =
                    @" SELECT  QUARTER(shipments.shipmentdate) AS quarter,
                        collectioncenters.corporateid AS corporateid, 
                        COUNT(*) AS count
                    FROM collectioncenters
                    INNER JOIN goodscollections ON collectioncenters.id = goodscollections.collectioncenterid
                    INNER JOIN shipmentitems ON goodscollections.id = shipmentitems.collectionid
                    INNER JOIN shipments ON shipmentitems.shipmentid = shipments.id
                    WHERE shipments.merchantid =@merchantId AND shipments.status='delivered' AND YEAR(shipments.shipmentdate)=@year
                   GROUP BY collectioncenters.corporateid,QUARTER(shipments.shipmentdate) ORDER BY QUARTER(shipments.shipmentdate) ASC ";
                MySqlCommand command = new(query, connection);
                command.Parameters.AddWithValue("@merchantId", merchantId);
                command.Parameters.AddWithValue("@year", year);
                await connection.OpenAsync();
                MySqlDataReader reader = command.ExecuteReader();
                while (await reader.ReadAsync())
                {
                    collectionCenterQuarterCounts.Add(
                        new CollectionCenterQuarterCount
                        {
                            CollectionCenterId = reader.GetInt32("corporateid"),
                            Quarter = reader.GetInt32("quarter"),
                            Count = reader.GetInt32("count")
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
            return collectionCenterQuarterCounts;
        }

        public async Task<List<CollectionCenterWeekCount>> GetCollectionCountByWeek(int merchantId, int year)
        {
            List<CollectionCenterWeekCount> collectionCenterWeekCounts = new();
            MySqlConnection connection = new(_connectionString);
            try
            {
                string query =
                    @" SELECT  WEEK(shipments.shipmentdate,1) AS week,
                        collectioncenters.corporateid AS corporateid, 
                        COUNT(*) AS count
                    FROM collectioncenters
                    INNER JOIN goodscollections ON collectioncenters.id = goodscollections.collectioncenterid
                    INNER JOIN shipmentitems ON goodscollections.id = shipmentitems.collectionid
                    INNER JOIN shipments ON shipmentitems.shipmentid = shipments.id
                    WHERE shipments.merchantid =@merchantId AND shipments.status='delivered' AND YEAR(shipments.shipmentdate)=@year
                   GROUP BY collectioncenters.corporateid,WEEK(shipments.shipmentdate,1) ORDER BY WEEK(shipments.shipmentdate,1) ASC ";
                MySqlCommand command = new(query, connection);
                command.Parameters.AddWithValue("@merchantId", merchantId);
                command.Parameters.AddWithValue("@year", year);
                await connection.OpenAsync();
                MySqlDataReader reader = command.ExecuteReader();
                while (await reader.ReadAsync())
                {
                    collectionCenterWeekCounts.Add(
                        new CollectionCenterWeekCount
                        {
                            CollectionCenterId = reader.GetInt32("corporateid"),
                            Week = reader.GetInt32("week"),
                            Count = reader.GetInt32("count")
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
            return collectionCenterWeekCounts;
        }
     public async Task<List<int>> GetYear(int merchantId)
        {
            List<int> years = new();
            MySqlConnection connection = new(_connectionString);
            try
            {
                string query =
                    @" SELECT  YEAR(shipments.shipmentdate) AS year                       
                    FROM collectioncenters
                    INNER JOIN goodscollections ON collectioncenters.id = goodscollections.collectioncenterid
                    INNER JOIN shipmentitems ON goodscollections.id = shipmentitems.collectionid
                    INNER JOIN shipments ON shipmentitems.shipmentid = shipments.id
                    WHERE shipments.merchantid =@merchantId AND shipments.status='delivered'
                   GROUP BY YEAR(shipments.shipmentdate) ORDER BY YEAR(shipments.shipmentdate) ASC ";
                MySqlCommand command = new(query, connection);
                command.Parameters.AddWithValue("@merchantId", merchantId);
                await connection.OpenAsync();
                MySqlDataReader reader = command.ExecuteReader();
                while (await reader.ReadAsync())
                {
                    years.Add(
                         reader.GetInt32("year")
                        
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
            return years;
        }

       
    }

}