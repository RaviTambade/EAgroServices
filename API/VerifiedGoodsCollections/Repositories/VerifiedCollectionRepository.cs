using VerifiedGoodsCollections.Models;
using VerifiedGoodsCollections.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using System.Data;
using MySql.Data;

namespace VerifiedGoodsCollections.Repositories;

public class VerifiedCollectionRepository : IVerifiedCollectionRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;

    public VerifiedCollectionRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
    }

    public async Task<List<VerifiedCollection>> GetAll()
    {
        List<VerifiedCollection> verifiedCollections = new List<VerifiedCollection>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = "SELECT * FROM verifiedgoodscollection";
            cmd.Connection = con;
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
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
            await con.CloseAsync();
        }
        return verifiedCollections;
    }

    public async Task<VerifiedCollection> GetVerifiedCollection(int verifiedCollectionId)
    {
        VerifiedCollection verifiedCollection = new VerifiedCollection();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText =
                "SELECT * FROM verifiedgoodscollection WHERE id=@verifiedCollectionId";
            cmd.Parameters.AddWithValue("@verifiedCollectionId", verifiedCollectionId);
            cmd.Connection = con;
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
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
            await con.CloseAsync();
        }
        return verifiedCollection;
    }

    public async Task<bool> Insert(VerifiedCollection verifiedCollection)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText =
                "INSERT INTO verifiedgoodscollection(collectionid,grade,weight,inspectorid,inspectiondate)VALUES(@collectionId,@grade,@weight,@inspectorId,@inspectionDate)";
            cmd.Parameters.AddWithValue("@collectionId", verifiedCollection.CollectionId);
            cmd.Parameters.AddWithValue("@grade", verifiedCollection.Grade);
            cmd.Parameters.AddWithValue("@weight", verifiedCollection.Weight);
            cmd.Parameters.AddWithValue("@inspectorId", verifiedCollection.InspectorId);
            cmd.Parameters.AddWithValue("@inspectionDate", verifiedCollection.InspectionDate);
            cmd.Connection = con;
            await con.OpenAsync();
            int rowsAffected = cmd.ExecuteNonQuery();
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
            await con.CloseAsync();
        }
        return status;
    }

    public async Task<List<string>> GetGrades()
    {
        List<string> grades = new();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText =
                "SELECT SUBSTRING(COLUMN_TYPE, 5) As grades FROM information_schema.COLUMNS WHERE "
                + " TABLE_SCHEMA = 'eagroservicesdb' AND TABLE_NAME = 'verifiedgoodscollection' AND COLUMN_NAME = 'grade'";
            cmd.Connection = con;
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
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
            await con.CloseAsync();
        }
        return grades;
    }

    public async Task<List<string>> GetContinerTypes()
    {
        List<string> containerTypes = new();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText =
                "SELECT SUBSTRING(COLUMN_TYPE, 5) As containertypes FROM information_schema.COLUMNS WHERE "
                + " TABLE_SCHEMA = 'eagroservicesdb' AND TABLE_NAME = 'goodscollections' AND COLUMN_NAME = 'containertype'";
            cmd.Connection = con;
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
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
            await con.CloseAsync();
        }
        return containerTypes;
    }

    public async Task<bool> Update(int verifiedCollectionId, VerifiedCollection verifiedCollection)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText =
                "UPDATE verifiedgoodscollection SET collectionid=@collectionId,grade=@grade,weight=@weight,inspectori=@inspectorId,inspectiondate=@inspectionDate WHERE id=@id";
            cmd.Connection = con;
            cmd.Parameters.AddWithValue("@id", verifiedCollectionId);
            cmd.Parameters.AddWithValue("@collectionId", verifiedCollection.CollectionId);
            cmd.Parameters.AddWithValue("@grade", verifiedCollection.Grade);
            cmd.Parameters.AddWithValue("@weight", verifiedCollection.Weight);
            cmd.Parameters.AddWithValue("@inspectorId", verifiedCollection.InspectorId);
            cmd.Parameters.AddWithValue("@inspectionDate", verifiedCollection.InspectionDate);
            await con.OpenAsync();
            int rowsAffected = cmd.ExecuteNonQuery();
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
            await con.CloseAsync();
        }
        return status;
    }

    public async Task<bool> Delete(int verifiedCollectionId)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = "DELETE FROM verifiedgoodscollection WHERE id=@id";
            cmd.Connection = con;
            cmd.Parameters.AddWithValue("@id", verifiedCollectionId);
            await con.OpenAsync();
            int rowsAffected = cmd.ExecuteNonQuery();
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
            await con.CloseAsync();
        }
        return status;
    }
}
