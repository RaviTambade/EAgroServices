using Payments.Models;
using Payments.Repositories.Interfaces;
using System.Data;
using MySql.Data.MySqlClient;

namespace Payments.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _conString;

        public PaymentRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _conString = _configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
        }

        public async Task<bool> Add(FarmerServicePayment payment)
        {
            bool status = false;
            MySqlConnection con = new MySqlConnection(_conString);
            try
            {
                MySqlCommand cmd = new MySqlCommand("farmer_service_payment", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@collection_id", payment.CollectionId);
                cmd.Parameters.AddWithValue("@transaction_id", payment.TransactionId);
                cmd.Parameters.AddWithValue("@amount", payment.Amount);
                cmd.Parameters.AddWithValue("@payment_for", payment.PaymentFor);
                await   con.OpenAsync();
                int rowsAffected = await cmd.ExecuteNonQueryAsync();
                if (rowsAffected > 0)
                {
                    status = true;
                }
            }
            catch (Exception )
            {
                throw ;
            }
            finally
            {
              await  con.CloseAsync();
            }
            return status;
        }
    }
}
