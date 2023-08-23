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
        _conString = this._configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
    }

    public async Task<List<Vehicle>> GetAll()
    {
        List<Vehicle> vehicles = new List<Vehicle>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = "SELECT * FROM vehicles";
            cmd.Connection = con;
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                int id = reader.GetInt32("id");
                int transporterId = reader.GetInt32("transporterid");
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
        catch (Exception)
        {
            throw;
        }
        finally
        {
            await con.CloseAsync();
        }
        return vehicles;
    }

    public async Task<List<string>> GetvehicleNumbers()
    {
        List<string> vehicles = new();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = "SELECT rtonumber FROM vehicles";
            cmd.Connection = con;
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                vehicles.Add(reader.GetString("rtonumber"));
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
        return vehicles;
    }

    public async Task<Vehicle> GetVehicle(int vehicleId)
    {
        Vehicle vehicle = new Vehicle();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = "SELECT * FROM vehicles WHERE id=@vehicleId";
            cmd.Parameters.AddWithValue("@vehicleId", vehicleId);
            cmd.Connection = con;
            await con.OpenAsync();
            MySqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                int id = reader.GetInt32("id");
                int transporterId = reader.GetInt32("transporterid");
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
        catch (Exception)
        {
            throw;
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
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText =
                "INSERT INTO vehicles(id,transporterid,vehicletype,rtonumber)VALUES(@id,@transporterId,@vehicleType,@rtoNumber)";
            cmd.Parameters.AddWithValue("@id", vehicle.Id);
            cmd.Parameters.AddWithValue("@transporterId", vehicle.TransporterId);
            cmd.Parameters.AddWithValue("@vehicleType", vehicle.VehicleType);
            cmd.Parameters.AddWithValue("@rtoNumber", vehicle.RtoNumber);
            cmd.Connection = con;
            await con.OpenAsync();
            int rowsAffected = cmd.ExecuteNonQuery();
            status = true;
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

    public async Task<bool> Update(int vehicleId, Vehicle vehicle)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText =
                "UPDATE vehicles SET transporterid=@transporterId,vehicletype=@vehicleType,rtonumber=@rtoNumber WHERE id=@id";
            cmd.Connection = con;
            cmd.Parameters.AddWithValue("@id", vehicleId);
            cmd.Parameters.AddWithValue("@transporterId", vehicle.TransporterId);
            cmd.Parameters.AddWithValue("@vehicleType", vehicle.VehicleType);
            cmd.Parameters.AddWithValue("@rtoNumber", vehicle.RtoNumber);
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

    public async Task<bool> Delete(int vehicleId)
    {
        bool status = false;
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText = "DELETE FROM vehicles WHERE id=@id";
            cmd.Connection = con;
            cmd.Parameters.AddWithValue("@id", vehicleId);
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

    public async Task<List<VehicleNumber>> GetAvailableVehicleNumbers()
    {
        List<VehicleNumber> vehicleNumbers = new List<VehicleNumber>();
        MySqlConnection con = new MySqlConnection(_conString);
        try
        {
            MySqlCommand cmd = new MySqlCommand();
            cmd.CommandText =
                @"SELECT DISTINCT vehicles.id, vehicles.rtonumber FROM vehicles
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
                int id = reader.GetInt32("id");
                string rtoNumber = reader.GetString("rtonumber");
                vehicleNumbers.Add(new VehicleNumber() { Id = id, RtoNumber = rtoNumber });
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
        return vehicleNumbers;
    }
}
