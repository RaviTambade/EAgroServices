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

        public async Task<List<CollectionCenterMonthCount>> GetCollectionCountByMonth(int merchantId)
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
                    WHERE shipments.merchantid = @merchantId AND shipments.status='delivered'
                   GROUP BY collectioncenters.corporateid,MONTH(shipments.shipmentdate) ORDER BY MONTH(shipments.shipmentdate) ASC ";
                MySqlCommand command = new(query, connection);
                command.Parameters.AddWithValue("@merchantId", merchantId);
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