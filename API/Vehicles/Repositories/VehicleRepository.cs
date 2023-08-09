using Vehicles.Models;
using Vehicles.Repositories.Interfaces;
using System.Data;
using MySql.Data.MySqlClient;
namespace Vehicles.Repositories;
public class VehicleRepository : IVehicleRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _conString;
    public VehicleRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _conString = this._configuration.GetConnectionString("DefaultConnection");
    }
    public async Task<List<Vehicle>> GetAll()
    {
        List<Vehicle> vehicles = new List<Vehicle>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand com = new MySqlCommand();
            com.CommandText = "SELECT * FROM vehicles";
            com.Connection = con;
            await con.OpenAsync();
            MySqlDataReader reader = com.ExecuteReader();
            while (reader.Read())
            {
                int id = int.Parse(reader["id"].ToString());
                int transporterId = int.Parse(reader["transporterid"].ToString());
                string? vehicleType = reader["vehicletype"].ToString();
                string? rtoNumber = reader["rtonumber"].ToString();
                Vehicle vehicle = new Vehicle()
                {
                    Id = id,
                    TransporterId = transporterId,
                    VehicleType = vehicleType,
                    RtoNumber = rtoNumber
                };
                vehicles.Add(vehicle);
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return vehicles;
    }

    public async Task<Vehicle> GetVehicle(int vehicleId)
    {
        Vehicle vehicle = new Vehicle();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand com = new MySqlCommand();
            com.CommandText = "SELECT * FROM vehicles WHERE id=@vehicleId";
            com.Parameters.AddWithValue("@vehicleId", vehicleId);
            com.Connection = con;
            await con.OpenAsync();
            MySqlDataReader reader = com.ExecuteReader();
            if (reader.Read())
            {
                int id = int.Parse(reader["id"].ToString());
                int transporterId = int.Parse(reader["transporterid"].ToString());
                string? vehicleType = reader["vehicletype"].ToString();
                string? rtoNumber = reader["rtonumber"].ToString();
                vehicle = new Vehicle()
                {
                    Id = id,
                    TransporterId = transporterId,
                    VehicleType = vehicleType,
                    RtoNumber = rtoNumber
                };
            }
            await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return vehicle;
    }
    public async Task<bool> Insert(Vehicle vehicle)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand com = new MySqlCommand();
            com.CommandText = "INSERT INTO vehicles(id,transporterid,vehicletype,rtonumber)VALUES(@id,@transporterId,@vehicleType,@rtoNumber)";
            com.Parameters.AddWithValue("@id", vehicle.Id);
            com.Parameters.AddWithValue("@transporterId", vehicle.TransporterId);
            com.Parameters.AddWithValue("@vehicleType", vehicle.VehicleType);
            com.Parameters.AddWithValue("@rtoNumber", vehicle.RtoNumber);
            com.Connection = con;
            await con.OpenAsync();
            int rowsAffected = com.ExecuteNonQuery();
            status = true;
            // if (rowsAffected > 0)
            //     {
            //         status = true;
            //     }       
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return status;
    }
    public async Task<bool> Update(int vehicleId, Vehicle vehicle)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand com = new MySqlCommand();
            com.CommandText = "UPDATE vehicles SET transporterid=@transporterId,vehicletype=@vehicleType,rtonumber=@rtoNumber WHERE id=@id";
            com.Connection = con;
            com.Parameters.AddWithValue("@id", vehicleId);
            com.Parameters.AddWithValue("@transporterId", vehicle.TransporterId);
            com.Parameters.AddWithValue("@vehicleType", vehicle.VehicleType);
            com.Parameters.AddWithValue("@rtoNumber", vehicle.RtoNumber);
            await con.OpenAsync();
            int rowsAffected = com.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return status;
    }
    public async Task<bool> Delete(int vehicleId)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand com = new MySqlCommand();
            com.CommandText = "DELETE FROM vehicles WHERE id=@id";
            com.Connection = con;
            com.Parameters.AddWithValue("@id", vehicleId);
            await con.OpenAsync();
            int rowsAffected = com.ExecuteNonQuery();
            if (rowsAffected > 0)
            {
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            await con.CloseAsync();
        }
        return status;
    }

    public async Task<List<VehicleNumber>> GetAvailableVehicleNumbers()
    {
        List<VehicleNumber> values = new List<VehicleNumber>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = @"SELECT DISTINCT vehicles.id, vehicles.rtonumber FROM vehicles
                                INNER JOIN shipments ON vehicles.id = shipments.vehicleid
                                WHERE shipments.status = 'delivered'
                                AND vehicles.id NOT IN (
                                    SELECT vehicleid FROM shipments  WHERE status = 'inprogress'
                                )";
            cmd.Connection = con;
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (await reader.ReadAsync())
            {
                int id = int.Parse(reader["id"].ToString());
                string rtoNumber = reader["rtonumber"].ToString();
                values.Add(new ()
                {
                    Id = id,
                    RtoNumber = rtoNumber
                });
            }
           await reader.CloseAsync();
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
          await  con.CloseAsync();
        }
        return values;
    }
}