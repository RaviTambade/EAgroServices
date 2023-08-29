using Transflower.EAgroServices.Payments.Models;
using Transflower.EAgroServices.Payments.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using System.Data;
namespace Transflower.EAgroServices.Payments.Repositories;
public class TransporterPaymentRepository : ITransporterPaymentRepository
{
    private readonly IConfiguration _configuration;
    private readonly string _connectionString;

    public TransporterPaymentRepository(IConfiguration configuration)
    {
        _configuration = configuration;
        _connectionString = this._configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
    }

    public async Task<bool> IsShipmentPaymentPaid(int shipmentId)
    {
        bool status = false;
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            string query =
                "SELECT EXISTS (SELECT shipmentid FROM transporterpayments WHERE shipmentid = @shipmentId)";
            MySqlCommand command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@shipmentId", shipmentId);
            await connection.OpenAsync();
            long existsValue =(long)command.ExecuteScalar();
            status = existsValue == 1;
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

    public async Task<bool> TransporterPayment(TransporterPayment payment)
    {
        bool status = false;
        MySqlConnection connection = new MySqlConnection(_connectionString);
        try
        {
            MySqlCommand command = new MySqlCommand("transporter_payment", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@shipment_id", payment.ShipmentId);
            command.Parameters.AddWithValue("@transaction_id", payment.TransactionId);
            command.Parameters.AddWithValue("@amount", payment.Amount);
            await connection.OpenAsync();
            int rowsAffected = await command.ExecuteNonQueryAsync();
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
