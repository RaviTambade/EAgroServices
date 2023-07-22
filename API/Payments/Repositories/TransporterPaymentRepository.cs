using Payments.Models;
using Payments.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using System.Data;

namespace Payments.Repositories
{
    public class TransporterPaymentRepository : ITransporterPaymentRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _conString;

        public TransporterPaymentRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _conString = this._configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<bool> isShipmentPaymentPaid(int shipmentId)
        {
            bool status = false;
            MySqlConnection con = new MySqlConnection(_conString);
            try
            {
                string query =
                    "SELECT EXISTS (SELECT shipmentid FROM transporterpayments WHERE shipmentid = @shipmentId)";
                MySqlCommand cmd = new MySqlCommand(query, con);
                cmd.Parameters.AddWithValue("@shipmentId", shipmentId);
                await con.OpenAsync();
                long existsValue = (long)cmd.ExecuteScalar();
                status = (existsValue == 1);
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

        public async Task<bool> Add(TransporterPayment payment)
        {
            bool status = false;
            MySqlConnection con = new MySqlConnection(_conString);
            try
            {
                MySqlCommand cmd = new MySqlCommand("transporter_payment", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@shipment_id", payment.ShipmentId);
                cmd.Parameters.AddWithValue("@transaction_id", payment.TransactionId);
                cmd.Parameters.AddWithValue("@amount", payment.Amount);
                await con.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
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
    }
}
