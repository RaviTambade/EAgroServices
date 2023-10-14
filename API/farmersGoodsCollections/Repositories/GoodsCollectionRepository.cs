using System.Data;
using MySql.Data.MySqlClient;
using Transflower.EAgroservice.Models;
using Transflower.EAgroservice.Repositories.Interface;

namespace Transflower.EAgroservice.Repositories{

    public class GoodsCollectionRepository:IGoodsCollectionRepository{

        private IConfiguration _configuration;
        private string _connectionString;         


    public GoodsCollectionRepository(IConfiguration configuration){
        _configuration =configuration;
        _connectionString=this._configuration.GetConnectionString("DefaultConnection");
    }

       public async Task<int> GetTotalEntriesForFarmer(int id){
                int totalEntries = 0;
        //  List<GoodsCollection> goodscollectionlist =new List<GoodsCollection>();
        MySqlConnection connection =new MySqlConnection(_connectionString);

        try{
            MySqlCommand command =new MySqlCommand();
            command.CommandText="SELECT COUNT(*) FROM goodscollections WHERE farmerid=@farmerid";
            command.Parameters.AddWithValue("@farmerid", id);
            command.Connection=connection;
            await connection.OpenAsync();
           object result = await command.ExecuteScalarAsync();
        totalEntries = Convert.ToInt32(result);
        }
          catch (Exception e)
    {
        throw e;
    }
    finally
    {
        connection.Close();
    }
    return totalEntries;
    }
    
public async Task<int> GetTotalEntriesForFarmerOnSpecificDate(int id,string collectionDate)
{
    int totalEntries = 0;
    using (MySqlConnection connection = new MySqlConnection(_connectionString))
    {
        MySqlCommand command = new MySqlCommand();
        command.CommandText = "SELECT COUNT(id) FROM goodscollections WHERE farmerid=@farmerid AND date(collectiondate)=@collectiondate";
        command.Parameters.AddWithValue("@farmerid", id);
        command.Parameters.AddWithValue("@collectiondate", collectionDate);
        command.Connection = connection;
        try
        {
            await connection.OpenAsync();
            object result = await command.ExecuteScalarAsync();
            totalEntries = Convert.ToInt32(result);
        }
        catch
        {
            throw;
        }
        finally
        {
            if (connection.State == System.Data.ConnectionState.Open)
                connection.Close();
        }
    }
    return totalEntries;
}

public async Task<int> GetTotalEntriesBeetweenDates(int id, DateOnly startDate, DateOnly endDate)
{
    using (MySqlConnection connection = new MySqlConnection(_connectionString))
    {
        MySqlCommand command = new MySqlCommand();
        command.CommandText = "SELECT COUNT(*) FROM goodscollections WHERE farmerid=@farmerid AND date(collectiondate) BETWEEN @startDate AND @endDate";
        command.Parameters.AddWithValue("@farmerid", id);
        command.Parameters.AddWithValue("@startDate", startDate);
        command.Parameters.AddWithValue("@endDate", endDate);
        command.Connection = connection;

        await connection.OpenAsync();
        object result = await command.ExecuteScalarAsync();
        return Convert.ToInt32(result);
    }
}

        public async Task<int> GetTotalEntriesForCollectionCenter(int id)
        {
                           int totalEntries = 0;
        //  List<GoodsCollection> goodscollectionlist =new List<GoodsCollection>();
        MySqlConnection connection =new MySqlConnection(_connectionString);
        try{
            MySqlCommand command =new MySqlCommand();
            command.CommandText="SELECT COUNT(id) FROM goodscollections WHERE  collectioncenterid=@collectioncenterid;";
            command.Parameters.AddWithValue("@collectioncenterid", id);
            command.Connection=connection;
            await connection.OpenAsync();
            object result = await command.ExecuteScalarAsync();
        totalEntries = Convert.ToInt32(result);
        }
          catch (Exception e)
    {
        throw e;
    }
    finally
    {
        connection.Close();
    }
    return totalEntries;
        }

        public async Task<int> GetTotalEntriesForCollectiionOnSpecificDate(int id, string collectionDate)
        {
           
    int totalEntries = 0;
    using (MySqlConnection connection = new MySqlConnection(_connectionString))
    {
        MySqlCommand command = new MySqlCommand();
        command.CommandText = "SELECT COUNT(id) FROM goodscollections WHERE collectioncenterid=@collectioncenterid AND date(collectiondate)=@collectiondate";
        command.Parameters.AddWithValue("@collectioncenterid", id);
        command.Parameters.AddWithValue("@collectiondate", collectionDate);
        command.Connection = connection;
        try
        {
            await connection.OpenAsync();
            object result = await command.ExecuteScalarAsync();
            totalEntries = Convert.ToInt32(result);
        }
        catch
        {
            throw;
        }
        finally
        {
            if (connection.State == System.Data.ConnectionState.Open)
                connection.Close();
        }
    }
    return totalEntries;
        }

        public async Task<int> GetTotalEntriesForCollectiionBeetweenDate(int id, DateOnly startDate, DateOnly endDate)
        {
             using (MySqlConnection connection = new MySqlConnection(_connectionString))
    {
        MySqlCommand command = new MySqlCommand();

        command.CommandText = "SELECT COUNT(id)  FROM verifiedgoodscollection WHERE inspectorid = @inspectorid AND date(inspectiondate) BETWEEN @startDate AND @endDate";
        command.Parameters.AddWithValue("@inspectorid", id);
        command.Parameters.AddWithValue("@startDate", startDate);
        command.Parameters.AddWithValue("@endDate", endDate);
        command.Connection = connection;

        await connection.OpenAsync();
        object result = await command.ExecuteScalarAsync();
        return Convert.ToInt32(result);
    }
}


public async Task<List<TotalCropQuantity>> TotalCropsQuantity(int collectionCenterId,string currentDate)
{
    List<TotalCropQuantity> cropQuantities = new List<TotalCropQuantity>();

    using (MySqlConnection connection = new MySqlConnection(_connectionString))
    {
        await connection.OpenAsync();

        MySqlCommand command = new MySqlCommand();
        command.Connection = connection;
        command.CommandText = "SELECT crops.title, SUM(goodscollections.weight) as totalWeight " +
                            "FROM goodscollections " +
                            "JOIN crops ON crops.id = goodscollections.cropid " +
                            "WHERE goodscollections.collectioncenterid = @id AND date(goodscollections.collectiondate)=@currentDate " +
                            "GROUP BY crops.title";
        command.Parameters.AddWithValue("@id", collectionCenterId);
        command.Parameters.AddWithValue("@currentDate", currentDate);

        using (MySqlDataReader reader = (MySqlDataReader)await command.ExecuteReaderAsync())
        {
            while (await reader.ReadAsync())
            {
                TotalCropQuantity cropQuantity = new TotalCropQuantity
                {
                    CropName = reader.GetString("title"),
                    TotalWeight = (double)reader.GetDecimal("totalWeight")
                };

                cropQuantities.Add(cropQuantity);
            }
        }
    }

    return cropQuantities;
}

        public Task<int> GetTotalFarmerRevenue(int id)
        {
            throw new NotImplementedException();
        }

     public Task<int> GetTotalShipmentByVehicleRTONumber(string rtoNumber)
{
    int totalEntries = 0;

    using (MySqlConnection connection = new MySqlConnection(_connectionString))
    {
        MySqlCommand command = new MySqlCommand();
        command.CommandText = "SELECT COUNT(s.id) AS shipment_count FROM shipments s JOIN vehicles v ON s.vehicleid = v.id WHERE v.rtonumber = @rtonumber";
        command.Parameters.AddWithValue("@rtonumber", rtoNumber); // Fixed the parameter name
        command.Connection = connection;

        try
        {
            connection.Open();
            object result = command.ExecuteScalar();
            totalEntries = Convert.ToInt32(result);
        }
        catch(Exception ex)
        {
            // Consider logging the exception here
            throw;
        }
        finally
        {
            if (connection.State == System.Data.ConnectionState.Open)
                connection.Close();
        }
    }

    return Task.FromResult(totalEntries);
}

        public Task<int> GetCollectionCenterShipment(int collectionCenterId)
        {
            throw new NotImplementedException();
        }

        //   public async Task<int> GetCollectionCenterShipmentint (int collectionCenterId)
        // {
        //     List<CenterShipment> collectioncentershipments = new List<CenterShipment>();

        //     using (MySqlConnection connection = new MySqlConnection(_connectionString))
        //     {
        //         await connection.OpenAsync();

        //         MySqlCommand command = new MySqlCommand();
        //         command.Connection = connection;
        //         command.CommandText = "SELECT cc.id AS collectioncenter_id,s.id AS shipment_id,s.vehicleid, COUNT(si.id) AS total_shipment_items,GROUP_CONCAT(c.title ORDER BY c.title ASC) AS shipment_item_crop_names FROM collectioncenters cc JOIN goodscollections gc ON cc.id = gc.collectioncenterid JOIN crops c ON gc.cropid = c.id  JOIN shipmentitems si ON gc.id = si.collectionid JOIN shipments s ON si.shipmentid = s.id JOIN vehicles v ON  s.vehicleid =v.id WHERE cc.id=@collectionCenterId  GROUP BY cc.collectionCenterId ORDER BY cc.id";

        //         command.Parameters.AddWithValue("@collectionCenterId", collectionCenterId);


        //         using (MySqlDataReader reader = (MySqlDataReader)await command.ExecuteReaderAsync())
        //         {
        //             while (await reader.ReadAsync())
        //             {
        //                 CenterShipment centershipment = new CenterShipment
        //                 {
        //                     ShipmentItemCropNames = reader.GetString("title"),
        //                     TotalShipmentItems = (double)reader.GetDecimal("totalWeight")
        //                 };

        //                 collectioncentershipments.Add(centershipment);
        //             }
        //         }
        //     }

        //     return cropQuantities;
        // }































        //     public async Task<int> RevenueChart(int id, int year, string mode)
        //     {
        //         using (MySqlConnection connection = new MySqlConnection(_connectionString))
        //         try
        //         {
        //             MySqlCommand command = new MySqlCommand("CalculateInvoiceAmounts", connection);
        //             command.CommandType = CommandType.StoredProcedure;
        //             command.Parameters.AddWithValue("@ id",id);
        //             command.Parameters.AddWithValue("@year",year);
        //             command.Parameters.AddWithValue("@mode",mode);
        //             await   connection.OpenAsync();

        //         }
        //         catch (Exception )
        //         {
        //             throw ;
        //         }
        //         finally
        //         {
        //           await  connection.CloseAsync();
        //         }
        //         return ;
        //     }





        //   public async Task<int> GetTotalEntriesForCollectionCenter(int id){
        //                 int totalEntries = 0;
        //         //  List<GoodsCollection> goodscollectionlist =new List<GoodsCollection>();
        //         MySqlConnection connection =new MySqlConnection(_connectionString);
        //         try{
        //             MySqlCommand command =new MySqlCommand();
        //             command.CommandText="SELECT COUNT(id) FROM goodscollections WHERE  collectioncenterid=@collectioncenterid;";
        //             command.Parameters.AddWithValue("@collectioncenterid", id);
        //             command.Connection=connection;
        //             await connection.OpenAsync();
        //             object result = await command.ExecuteScalarAsync();
        //         totalEntries = Convert.ToInt32(result);
        //         }
        //           catch (Exception e)
        //     {
        //         throw e;
        //     }
        //     finally
        //     {
        //         connection.Close();
        //     }
        //     return totalEntries;
        //     }

        // public async Task<int> GetTotalEntriesForCollectiionOnSpecificDate(int id,string collectionDate)
        // {
        //     int totalEntries = 0;
        //     using (MySqlConnection connection = new MySqlConnection(_connectionString))
        //     {
        //         MySqlCommand command = new MySqlCommand();
        //         command.CommandText = "SELECT COUNT(id) FROM goodscollections WHERE collectioncenterid=@collectioncenterid AND date(collectiondate)=@collectiondate";
        //         command.Parameters.AddWithValue("@collectioncenterid", id);
        //         command.Parameters.AddWithValue("@collectiondate", collectionDate);
        //         command.Connection = connection;
        //         try
        //         {
        //             await connection.OpenAsync();
        //             object result = await command.ExecuteScalarAsync();
        //             totalEntries = Convert.ToInt32(result);
        //         }
        //         catch
        //         {
        //             throw;
        //         }
        //         finally
        //         {
        //             if (connection.State == System.Data.ConnectionState.Open)
        //                 connection.Close();
        //         }
        //     }
        //     return totalEntries;

        // }




        // public async Task<int> GetTotalEntriesForCollectiionBeetweenDate(int id, DateOnly startDate, DateOnly endDate)
        // {
        //     using (MySqlConnection connection = new MySqlConnection(_connectionString))
        //     {
        //         MySqlCommand command = new MySqlCommand();

        //         command.CommandText = "SELECT COUNT(id)  FROM verifiedgoodscollection WHERE inspectorid = @inspectorid AND date(inspectiondate) BETWEEN @startDate AND @endDate";
        //         command.Parameters.AddWithValue("@inspectorid", id);
        //         command.Parameters.AddWithValue("@startDate", startDate);
        //         command.Parameters.AddWithValue("@endDate", endDate);
        //         command.Connection = connection;

        //         await connection.OpenAsync();
        //         object result = await command.ExecuteScalarAsync();
        //         return Convert.ToInt32(result);
        //     }
        // }
        //     public  Task<int> GetTotalShipmentByVehicleRTONumber(string rtoNumber)
        //     {
        //         int totalEntries = 0;
        //         MySqlConnection connection =new MySqlConnection(_connectionString);
        //     try{
        //         MySqlCommand command =new MySqlCommand();
        //         command.CommandText="SELECT COUNT(s.id) AS shipment_count FROM shipments s JOIN vehicles v ON s.vehicleid = v.id WHERE v.rtonumber = @rtonumber";
        //         command.Parameters.AddWithValue("@rtonumber",rtonumber);
        //         command.Connection=connection;
        //         connection.Open();
        //         object result =  command.ExecuteScalar();
        //     totalEntries = Convert.ToInt32(result);
        //     }
        //       catch (Exception e)
        // {
        //     throw e;
        // }
        // finally
        // {
        //     connection.Close();
        // }
        // return totalEntries;
        //     }

    }
}

