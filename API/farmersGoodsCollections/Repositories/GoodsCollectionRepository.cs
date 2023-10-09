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
    
public async Task<int> GetTotalEntriesForFarmerOnSpecificDate(int id, DateTime collectionDate)
{
    int totalEntries = 0;
    using (MySqlConnection connection = new MySqlConnection(_connectionString))
    {
        MySqlCommand command = new MySqlCommand();
        command.CommandText = "SELECT COUNT(*) FROM goodscollections WHERE farmerid=@farmerid && collectiondate=@collectiondate";
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

public async Task<int> GetTotalEntriesBeetweenDates(int id, DateTime startDate, DateTime endDate)
{
    using (MySqlConnection connection = new MySqlConnection(_connectionString))
    {
        MySqlCommand command = new MySqlCommand();
        command.CommandText = "SELECT COUNT(*) FROM goodscollections WHERE farmerid=@farmerid AND collectiondate BETWEEN @startDate AND @endDate";
        command.Parameters.AddWithValue("@farmerid", id);
        command.Parameters.AddWithValue("@startDate", startDate);
        command.Parameters.AddWithValue("@endDate", endDate);
        command.Connection = connection;

        await connection.OpenAsync();
        object result = await command.ExecuteScalarAsync();
        return Convert.ToInt32(result);
    }
}

    }
}
