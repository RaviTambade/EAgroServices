using Payments.Services.Interfaces;
using Payments.Repositories.Interfaces;
using Payments.Models;

namespace Payments.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _repo;

        public PaymentService(IPaymentRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> Add(FarmerServicePayment payment)
        {
            return await _repo.Add(payment);
        }
    }
}
