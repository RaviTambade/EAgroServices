using Transflower.EAgroServices.Payments.Services.Interfaces;
using Transflower.EAgroServices.Payments.Repositories.Interfaces;
using Transflower.EAgroServices.Payments.Models;
namespace Transflower.EAgroServices.Payments.Services;
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _repository;

        public PaymentService(IPaymentRepository repository)
        {
            _repository = repository;
        }
        public async Task<bool> AddPayment(FarmerServicePayment payment)
        {
            return await _repository.AddPayment(payment);
        }
    }
