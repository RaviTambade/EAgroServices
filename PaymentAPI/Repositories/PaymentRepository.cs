using System.Threading.Tasks;
using PaymentAPI.Context;
using PaymentAPI.Models;
using PaymentAPI.Repositories.Interfaces;

namespace PaymentAPI.Repositories;
public class PaymentRepository:IPaymentRepository{
    private readonly IConfiguration _configuration;

    public PaymentRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
   public async Task<bool> Insert(Payment payment){
     bool status = false;
        try
        {
            using (var context = new PaymentContext(_configuration))
            {
                await context.Payments.AddAsync(payment);
                await context.SaveChangesAsync();
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
   } 
}