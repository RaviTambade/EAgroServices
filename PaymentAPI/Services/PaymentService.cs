using System.Threading.Tasks;
using PaymentAPI.Models;
using PaymentAPI.Repositories.Interfaces;
using PaymentAPI.Services.Interfaces;

namespace PaymentAPI.Services;
public class PaymentService:IPaymentService{
        private readonly IPaymentRepository _repo;  
    public PaymentService(IPaymentRepository repo)  
    {
        this._repo=repo;
    }

    public async Task<bool> Insert(Payment payment)=>await _repo.Insert(payment);
}