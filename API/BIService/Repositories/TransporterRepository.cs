using BIService.Models;
using BIService.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using BIService.Extensions;
namespace BIService.Repositories;
public class TransporterRepository:ITransporterRepository{

    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public TransporterRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString =
            _configuration.GetConnectionString("DefaultConnection")
            ?? throw new Exception("ConnectionString is not found");
    }
    public async Task<List<YearlyVehicleRevenue>> GetRevenuesByYear(int transporterId,int year){
         List<YearlyVehicleRevenue> result = new();
        MySqlConnection connection = new(_connectionString);
        try
        {
            string query =
                @" SELECT vehicles.rtonumber, SUM(payments.amount) AS amount ,YEAR(shipments.shipmentdate)
                   FROM transporters INNER JOIN vehicles
                   ON transporters.id = vehicles.transporterid
                   INNER JOIN shipments
                   ON vehicles.id=shipments.vehicleid
                   INNER JOIN transporterpayments
                   ON  shipments.id=transporterpayments.shipmentid
                   INNER JOIN payments
                   ON transporterpayments.paymentid=payments.id
                   WHERE transporterid=@transporterId and YEAR(shipments.shipmentdate)=@year
                   GROUP BY vehicles.rtonumber,YEAR(shipments.shipmentdate)";
            MySqlCommand command = new(query, connection);
            command.Parameters.AddWithValue("@transporterId", transporterId);
            command.Parameters.AddWithValue("@year", year);
            await connection.OpenAsync();
            using MySqlDataReader reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                result.Add(
                    new YearlyVehicleRevenue
                    {
                        RtoNumber= reader.GetString("RtoNumber"),
                        Year = reader.GetInt32("Year"),
                        Amount = reader.GetDouble("Amount")
                    }
                );
            }
            await reader.CloseAsync();
            // result = result.AddMissingYears();
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