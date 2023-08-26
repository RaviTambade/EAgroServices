using Transflower.VerifiedGoodsCollections.Models;
using Transflower.VerifiedGoodsCollections.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using System.Data;

namespace Transflower.VerifiedGoodsCollections.Repositories;

public class VerifiedCollectionRepository : IVerifiedCollectionRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public VerifiedCollectionRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = this._configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
    }

    public async Task<List<VerifiedCollection>> GetAll()
    {
        List<VerifiedCollection> verifiedCollections = new List<VerifiedCollection>();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText = "SELECT * FROM verifiedgoodscollection";
            command.Connection = connection;
            await connection.OpenAsync();
            MySqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                int id = reader.GetInt32("id");
                int collectionId = reader.GetInt32("collectionid");
                string? grade = reader.GetString("grade");
                double weight = reader.GetDouble("weight");
                int inspectorId = reader.GetInt32("inspectorid");
                DateTime inspectionDate = reader.GetDateTime("inspectiondate");
                VerifiedCollection verifiedCollection = new VerifiedCollection()
                {
                    Id = id,
                    CollectionId = collectionId,
                    Grade = grade,
                    Weight = weight,
                    InspectorId = inspectorId,
                    InspectionDate = inspectionDate
                };
                verifiedCollections.Add(verifiedCollection);
            }
            await reader.CloseAsync();
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await connection.CloseAsync();
        }
        return verifiedCollections;
    }

    public async Task<VerifiedCollection> GetVerifiedCollection(int verifiedCollectionId)
    {
        VerifiedCollection verifiedCollection = new VerifiedCollection();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText =
                "SELECT * FROM verifiedgoodscollection WHERE id=@verifiedCollectionId";
            command.Parameters.AddWithValue("@verifiedCollectionId", verifiedCollectionId);
            command.Connection = connection;
            await connection.OpenAsync();
            MySqlDataReader reader = command.ExecuteReader();
            if (reader.Read())
            {
                int id = reader.GetInt32("id");
                int collectionId = reader.GetInt32("collectionid");
                string? grade = reader.GetString("grade");
                double weight = reader.GetDouble("weight");
                int inspectorId = reader.GetInt32("inspectorid");
                DateTime inspectionDate = reader.GetDateTime("inspectiondate");
                verifiedCollection = new VerifiedCollection()
                {
                    Id = id,
                    CollectionId = collectionId,
                    Grade = grade,
                    Weight = weight,
                    InspectorId = inspectorId,
                    InspectionDate = inspectionDate
                };
            }
            await reader.CloseAsync();
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await connection.CloseAsync();
        }
        return verifiedCollection;
    }

    public async Task<bool> Insert(VerifiedCollection verifiedCollection)
    {
        bool status = false;
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText =
                "INSERT INTO verifiedgoodscollection(collectionid,grade,weight,inspectorid,inspectiondate)VALUES(@collectionId,@grade,@weight,@inspectorId,@inspectionDate)";
            command.Parameters.AddWithValue("@collectionId", verifiedCollection.CollectionId);
            command.Parameters.AddWithValue("@grade", verifiedCollection.Grade);
            command.Parameters.AddWithValue("@weight", verifiedCollection.Weight);
            command.Parameters.AddWithValue("@inspectorId", verifiedCollection.InspectorId);
            command.Parameters.AddWithValue("@inspectionDate", verifiedCollection.InspectionDate);
            command.Connection = connection;
            await connection.OpenAsync();
            int rowsAffected = command.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await connection.CloseAsync();
        }
        return status;
    }

    public async Task<List<string>> GetGrades()
    {
        List<string> grades = new();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText =
                "SELECT SUBSTRING(COLUMN_TYPE, 5) As grades FROM information_schema.COLUMNS WHERE "
                + " TABLE_SCHEMA = 'eagroservicesdb' AND TABLE_NAME = 'verifiedgoodscollection' AND COLUMN_NAME = 'grade'";
            command.Connection = connection;
            await connection.OpenAsync();
            MySqlDataReader reader = command.ExecuteReader();
            if (await reader.ReadAsync())
            {
                string gradesString = reader.GetString("grades");
                gradesString = gradesString.Replace("(", "").Replace(")", "").Replace("'", "");
                grades = gradesString.Split(',').Select(s => s.Trim()).ToList();
            }
            await reader.CloseAsync();
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await connection.CloseAsync();
        }
        return grades;
    }

    public async Task<List<string>> GetContinerTypes()
    {
        List<string> containerTypes = new();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText =
                "SELECT SUBSTRING(COLUMN_TYPE, 5) As containertypes FROM information_schema.COLUMNS WHERE "
                + " TABLE_SCHEMA = 'eagroservicesdb' AND TABLE_NAME = 'goodscollections' AND COLUMN_NAME = 'containertype'";
            command.Connection = connection;
            await connection.OpenAsync();
            MySqlDataReader reader = command.ExecuteReader();
            if (await reader.ReadAsync())
            {
                string containerTypesString = reader.GetString("containertypes");
                containerTypesString = containerTypesString
                    .Replace("(", "")
                    .Replace(")", "")
                    .Replace("'", "");
                containerTypes = containerTypesString.Split(',').Select(s => s.Trim()).ToList();
            }
            await reader.CloseAsync();
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await connection.CloseAsync();
        }
        return containerTypes;
    }

    public async Task<bool> Update(int verifiedCollectionId, VerifiedCollection verifiedCollection)
    {
        bool status = false;
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText =
                "UPDATE verifiedgoodscollection SET collectionid=@collectionId,grade=@grade,weight=@weight,inspectori=@inspectorId,inspectiondate=@inspectionDate WHERE id=@id";
            command.Connection = connection;
            command.Parameters.AddWithValue("@id", verifiedCollectionId);
            command.Parameters.AddWithValue("@collectionId", verifiedCollection.CollectionId);
            command.Parameters.AddWithValue("@grade", verifiedCollection.Grade);
            command.Parameters.AddWithValue("@weight", verifiedCollection.Weight);
            command.Parameters.AddWithValue("@inspectorId", verifiedCollection.InspectorId);
            command.Parameters.AddWithValue("@inspectionDate", verifiedCollection.InspectionDate);
            await connection.OpenAsync();
            int rowsAffected = command.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await connection.CloseAsync();
        }
        return status;
    }

    public async Task<bool> Delete(int verifiedCollectionId)
    {
        bool status = false;
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText = "DELETE FROM verifiedgoodscollection WHERE id=@id";
            command.Connection = connection;
            command.Parameters.AddWithValue("@id", verifiedCollectionId);
            await connection.OpenAsync();
            int rowsAffected = command.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
        }
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await connection.CloseAsync();
        }
        return status;
    }
}
