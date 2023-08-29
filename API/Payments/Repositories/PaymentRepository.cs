using Transflower.EAgroServices.Payments.Models;
using Transflower.EAgroServices.Payments.Repositories.Interfaces;
using System.Data;
using MySql.Data.MySqlClient;
namespace Transflower.EAgroServices.Payments.Repositories;
    public class PaymentRepository : IPaymentRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _connetionString;

        public PaymentRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connetionString = _configuration.GetConnectionString("DefaultConnection") ?? string.Empty;
        }

        public async Task<bool> AddPayment(FarmerServicePayment payment)
        {
            bool status = false;
            MySqlConnection connection = new MySqlConnection(_connetionString);
            try
            {
                MySqlCommand command = new MySqlCommand("farmer_service_payment", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@collection_id", payment.CollectionId);
                command.Parameters.AddWithValue("@transaction_id", payment.TransactionId);
                command.Parameters.AddWithValue("@amount", payment.Amount);
                command.Parameters.AddWithValue("@payment_for", payment.PaymentFor);
                await   connection.OpenAsync();
                int rowsAffected = await command.ExecuteNonQueryAsync();
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
              await  connection.CloseAsync();
            }
            return status;
        }
    }
