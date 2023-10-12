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



        public  Task<int> GetTotalShipmentByVehicleRTONumber(string rtoNumber)
        {
            int totalEntries = 0;
        MySqlConnection connection =new MySqlConnection(_connectionString);
        try{
            MySqlCommand command =new MySqlCommand();
            command.CommandText="SELECT COUNT(s.id) AS shipment_count FROM shipments s JOIN vehicles v ON s.vehicleid = v.id WHERE v.rtonumber = @rtonumber";
            command.Parameters.AddWithValue("@rtonumber", rtonumber);
            command.Connection=connection;
            connection.Open();
           object result =  command.ExecuteScalar();
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
    }

   }




// }

