using Transflower.Vehicles.Models;
using Transflower.Vehicles.Repositories.Interfaces;
using MySql.Data.MySqlClient;

namespace Transflower.Vehicles.Repositories;

public class VehicleRepository : IVehicleRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public VehicleRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = this._configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
    }

    public async Task<List<Vehicle>> GetAll()
    {
        List<Vehicle> vehicles = new List<Vehicle>();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText = "SELECT * FROM vehicles";
            command.Connection = connection;
            await connection.OpenAsync();
            MySqlDataReader reader = command.ExecuteReader();
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
            await connection.CloseAsync();
        }
        return vehicles;
    }

    public async Task<List<string>> GetvehicleNumbers()
    {
        List<string> vehicles = new();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText = "SELECT rtonumber FROM vehicles";
            command.Connection = connection;
            await connection.OpenAsync();
            MySqlDataReader reader = command.ExecuteReader();
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
            await connection.CloseAsync();
        }
        return vehicles;
    }

    public async Task<Vehicle> GetVehicle(int vehicleId)
    {
        Vehicle vehicle = new Vehicle();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText = "SELECT * FROM vehicles WHERE id=@vehicleId";
            command.Parameters.AddWithValue("@vehicleId", vehicleId);
            command.Connection = connection;
            await connection.OpenAsync();
            MySqlDataReader reader = command.ExecuteReader();
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
            await connection.CloseAsync();
        }
        return vehicle;
    }

    public async Task<bool> Insert(Vehicle vehicle)
    {
        bool status = false;
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText =
                "INSERT INTO vehicles(id,transporterid,vehicletype,rtonumber)VALUES(@id,@transporterId,@vehicleType,@rtoNumber)";
            command.Parameters.AddWithValue("@id", vehicle.Id);
            command.Parameters.AddWithValue("@transporterId", vehicle.TransporterId);
            command.Parameters.AddWithValue("@vehicleType", vehicle.VehicleType);
            command.Parameters.AddWithValue("@rtoNumber", vehicle.RtoNumber);
            command.Connection = connection;
            await connection.OpenAsync();
            int rowsAffected = command.ExecuteNonQuery();
            status = true;
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

    public async Task<bool> Update(int vehicleId, Vehicle vehicle)
    {
        bool status = false;
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText =
                "UPDATE vehicles SET transporterid=@transporterId,vehicletype=@vehicleType,rtonumber=@rtoNumber WHERE id=@id";
            command.Connection = connection;
            command.Parameters.AddWithValue("@id", vehicleId);
            command.Parameters.AddWithValue("@transporterId", vehicle.TransporterId);
            command.Parameters.AddWithValue("@vehicleType", vehicle.VehicleType);
            command.Parameters.AddWithValue("@rtoNumber", vehicle.RtoNumber);
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

    public async Task<bool> Delete(int vehicleId)
    {
        bool status = false;
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText = "DELETE FROM vehicles WHERE id=@id";
            command.Connection = connection;
            command.Parameters.AddWithValue("@id", vehicleId);
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

    public async Task<List<VehicleNumber>> GetAvailableVehicleNumbers()
    {
        List<VehicleNumber> vehicleNumbers = new List<VehicleNumber>();
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand();
            command.CommandText =
                @"SELECT DISTINCT vehicles.id, vehicles.rtonumber FROM vehicles
                                INNER JOIN shipments ON vehicles.id = shipments.vehicleid
                                WHERE shipments.status = 'delivered'
                                AND vehicles.id NOT IN (
                                    SELECT vehicleid FROM shipments  WHERE status = 'inprogress'
                                )";
            command.Connection = connection;
            await connection.OpenAsync();
            MySqlDataReader reader = command.ExecuteReader();
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
            await connection.CloseAsync();
        }
        return vehicleNumbers;
    }
}
