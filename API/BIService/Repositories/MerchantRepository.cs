using BIService.Models;
using BIService.Repositories.Interfaces;
using MySql.Data.MySqlClient;

namespace BIService.Repositories
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

        public async Task<List<CollectionCenterMonthCount>> GetCollectionCountByMonth(int merchantId,int year)
        {
            List<CollectionCenterMonthCount> result = new();
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
                    WHERE shipments.merchantid =@merchantId AND shipments.status='delivered' AND YEAR(shipments.shipmentdate)=@year
                   GROUP BY collectioncenters.corporateid,MONTHNAME(shipments.shipmentdate) ORDER BY MONTHNAME(shipments.shipmentdate) ASC ";
                MySqlCommand command = new(query, connection);
                command.Parameters.AddWithValue("@merchantId", merchantId);
                command.Parameters.AddWithValue("@year", year);
                await connection.OpenAsync();
                using MySqlDataReader reader = command.ExecuteReader();
                while (await reader.ReadAsync())
                {
                    result.Add(
                        new CollectionCenterMonthCount
                        {
                            collectionCenterId=reader.GetInt32("corporateid"),
                            Month = reader.GetString("month"),
                            Count = reader.GetInt32("count")
                        }
                    );
                }
                await reader.CloseAsync();
                // result = result.();
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
         public async Task<List<CollectionCenterYearCount>> GetCollectionCountByYear(int merchantId)
        {
            List<CollectionCenterYearCount> result = new();
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
                    WHERE shipments.merchantid =@merchantId AND shipments.status='delivered'
                   GROUP BY collectioncenters.corporateid,YEAR(shipments.shipmentdate) ORDER BY YEAR(shipments.shipmentdate) ASC ";
                MySqlCommand command = new(query, connection);
                command.Parameters.AddWithValue("@merchantId", merchantId);
                await connection.OpenAsync();
                using MySqlDataReader reader = command.ExecuteReader();
                while (await reader.ReadAsync())
                {
                    result.Add(
                        new CollectionCenterYearCount
                        {
                            CollectionCenterId=reader.GetInt32("corporateid"),
                            Year = reader.GetInt32("year"),
                            Count = reader.GetInt32("count")
                        }
                    );
                }
                await reader.CloseAsync();
                // result = result.();
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
         public async Task<List<CollectionCenterQuarterCount>> GetCollectionCountByQuarter(int merchantId,int year)
        {
            List<CollectionCenterQuarterCount> result = new();
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
                using MySqlDataReader reader = command.ExecuteReader();
                while (await reader.ReadAsync())
                {
                    result.Add(
                        new CollectionCenterQuarterCount
                        {
                            CollectionCenterId=reader.GetInt32("corporateid"),
                            Quarter = reader.GetInt32("quarter"),
                            Count = reader.GetInt32("count")
                        }
                    );
                }
                await reader.CloseAsync();
                // result = result.();
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

         public async Task<List<CollectionCenterWeekCount>> GetCollectionCountByWeek(int merchantId,int year)
        {
            List<CollectionCenterWeekCount> result = new();
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
                using MySqlDataReader reader = command.ExecuteReader();
                while (await reader.ReadAsync())
                {
                    result.Add(
                        new CollectionCenterWeekCount
                        {
                            CollectionCenterId=reader.GetInt32("corporateid"),
                            Week = reader.GetInt32("week"),
                            Count = reader.GetInt32("count")
                        }
                    );
                }
                await reader.CloseAsync();
                // result = result.();
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
    }


/* 
 SELECT collectioncenters.id AS CollectionCenterId, 
       collectioncenters.corporateid AS CorporateId, 
       COUNT(*) AS Count
FROM collectioncenters
INNER JOIN goodscollections ON collectioncenters.id = goodscollections.collectioncenterid
INNER JOIN shipmentitems ON goodscollections.id = shipmentitems.collectionid
INNER JOIN shipments ON shipmentitems.shipmentid = shipments.id
WHERE shipments.merchantid = 3 AND shipments.status='delivered'
GROUP BY collectioncenters.id;
*/

/*
SELECT COUNT(*) AS Count, 
          crops.title AS CropName
      FROM crops 
          INNER JOIN goodscollections ON crops.id = goodscollections.cropid
          INNER JOIN shipmentitems ON goodscollections.id = shipmentitems.collectionid
          INNER JOIN shipments ON shipmentitems.shipmentid = shipments.id
          WHERE shipments.merchantid = 2 AND shipments.status='delivered'
      GROUP BY crops.id;
*/