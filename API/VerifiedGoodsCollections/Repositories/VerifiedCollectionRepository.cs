using VerifiedGoodsCollections.Models;
using VerifiedGoodsCollections.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using System.Data;
using MySql.Data;
namespace VerifiedGoodsCollections.Repositories;
public class VerifiedCollectionRepository:IVerifiedCollectionRepository{
  private readonly IConfiguration _configuration;
    private readonly string _conString;
    public VerifiedCollectionRepository(IConfiguration configuration){
        _configuration=configuration;
        _conString=this._configuration.GetConnectionString("DefaultConnection");
    }
    public async Task<List<VerifiedCollection>> GetAll()
    {
      List<VerifiedCollection> verifiedCollections=new List<VerifiedCollection>();
      MySqlConnection con=new MySqlConnection(_conString);
      try{
        MySqlCommand com=new MySqlCommand();
        com.CommandText="SELECT * FROM verifiedgoodscollection";
        com.Connection=con;
        await con.OpenAsync();
        MySqlDataReader reader=com.ExecuteReader();
        while(reader.Read()){
                int id = int.Parse(reader["id"].ToString());
                int collectionId = int.Parse(reader["collectionid"].ToString());
                string? grade = reader["grade"].ToString();
                double weight = double.Parse(reader["weight"].ToString());
                int inspectorId = int.Parse(reader["inspectorid"].ToString());
                DateTime inspectionDate=DateTime.Parse(reader["inspectiondate"].ToString());
                VerifiedCollection verifiedCollection=new VerifiedCollection(){
                  Id=id,
                  CollectionId=collectionId,
                  Grade=grade,
                  Weight=weight,
                  InspectorId=inspectorId,
                  InspectionDate=inspectionDate
                };
                verifiedCollections.Add(verifiedCollection);
        }
        await reader.CloseAsync();
      }
      catch(Exception e){
        throw e;
      }
      finally{
        await con.CloseAsync();
      }
      return verifiedCollections;
    }
    
    public async Task<VerifiedCollection> GetVerifiedCollection(int verifiedCollectionId)
    {
      VerifiedCollection verifiedCollection=new VerifiedCollection();
      MySqlConnection con=new MySqlConnection(_conString);
      try{
        MySqlCommand com=new MySqlCommand();
        com.CommandText="SELECT * FROM verifiedgoodscollection WHERE id=@verifiedCollectionId";
        com.Parameters.AddWithValue("@verifiedCollectionId",verifiedCollectionId);
        com.Connection=con;
        await con.OpenAsync();
        MySqlDataReader reader=com.ExecuteReader();
        if(reader.Read()){
                 int id = int.Parse(reader["id"].ToString());
                int collectionId = int.Parse(reader["collectionid"].ToString());
                string? grade = reader["grade"].ToString();
                double weight = double.Parse(reader["weight"].ToString());
                int inspectorId = int.Parse(reader["inspectorid"].ToString());
                DateTime inspectionDate=DateTime.Parse(reader["inspectiondate"].ToString());
                 verifiedCollection=new VerifiedCollection(){
                  Id=id,
                  CollectionId=collectionId,
                  Grade=grade,
                  Weight=weight,
                  InspectorId=inspectorId,
                  InspectionDate=inspectionDate
                };
        }
        await reader.CloseAsync();
      }
      catch(Exception e){
        throw e;
      }
      finally{
        await con.CloseAsync();
      }
      return verifiedCollection;
    }
    public async Task<bool> Insert(VerifiedCollection verifiedCollection)
    {
       bool status=false;
       MySqlConnection con=new MySqlConnection(_conString);
       try{
         MySqlCommand com=new MySqlCommand();
        com.CommandText="INSERT INTO verifiedgoodscollection(id,collectionid,grade,weight,inspectorid,inspectiondate)VALUES(@id,@collectionId,@grade,@weight,@inspectorId,@inspectionDate)";
        com.Parameters.AddWithValue("@id",verifiedCollection.Id);
        com.Parameters.AddWithValue("@collectionId",verifiedCollection.CollectionId);
        com.Parameters.AddWithValue("@grade",verifiedCollection.Grade);
        com.Parameters.AddWithValue("@weight",verifiedCollection.Weight);
        com.Parameters.AddWithValue("@inspectorId",verifiedCollection.InspectorId);
        com.Parameters.AddWithValue("@inspectionDate",verifiedCollection.InspectionDate);
        com.Connection=con;
        await con.OpenAsync();
        int rowsAffected = com.ExecuteNonQuery();
        if (rowsAffected > 0)
            {
                status = true;
            }       
       }
       catch(Exception e){
        throw e;
       }
       finally{
        await con.CloseAsync();
       }
       return status;
    }
    public async Task<bool> Update(int verifiedCollectionId, VerifiedCollection verifiedCollection)
    {
       bool status=false;
       MySqlConnection con=new MySqlConnection(_conString);
       try{
        MySqlCommand com=new MySqlCommand();
        com.CommandText="UPDATE verifiedgoodscollection SET collectionid=@collectionId,grade=@grade,weight=@weight,inspectorid=@inspectorId,inspectiondate=@inspectionDate WHERE id=@id";
        com.Connection=con;
        com.Parameters.AddWithValue("@id",verifiedCollectionId);
        com.Parameters.AddWithValue("@collectionId",verifiedCollection.CollectionId);
        com.Parameters.AddWithValue("@grade",verifiedCollection.Grade);
        com.Parameters.AddWithValue("@weight",verifiedCollection.Weight);
        com.Parameters.AddWithValue("@inspectorId",verifiedCollection.InspectorId);
        com.Parameters.AddWithValue("@inspectionDate",verifiedCollection.InspectionDate);
        await con.OpenAsync();
        int rowsAffected = com.ExecuteNonQuery();
        if (rowsAffected > 0)
            {
                status = true;
            }
       }
       catch(Exception e){
        throw e;
       }
       finally{
        await con.CloseAsync();
       }
       return status;
    }
     public async Task<bool> Delete(int verifiedCollectionId)
    {
       bool status=false;
       MySqlConnection con=new MySqlConnection(_conString);
       try{
        MySqlCommand com=new MySqlCommand();
        com.CommandText="DELETE FROM verifiedgoodscollection WHERE id=@id";
        com.Connection=con;
        com.Parameters.AddWithValue("@id",verifiedCollectionId);
        await con.OpenAsync();
        int rowsAffected = com.ExecuteNonQuery();
        if (rowsAffected > 0)
            {
                status = true;
            }
       }
       catch(Exception e){
        throw e;
       }
       finally{
        await con.CloseAsync();
       }
       return status;
    }
}