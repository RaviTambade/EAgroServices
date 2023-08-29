using Transflower.EAgroServices.Payments.Services.Interfaces;
using Transflower.EAgroServices.Payments.Repositories.Interfaces;
using Transflower.EAgroServices.Payments.Models;
namespace Transflower.EAgroServices.Payments.Services;
    public class TransporterPaymentService : ITransporterPaymentService
    {
        private readonly ITransporterPaymentRepository _repository;

        public TransporterPaymentService(ITransporterPaymentRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> IsShipmentPaymentPaid(int shipmentId)
        {
            return await _repository.IsShipmentPaymentPaid(shipmentId);
        }

          public async Task<bool> TransporterPayment(TransporterPayment payment)
        {
            return await _repository.TransporterPayment(payment);
        }
    }
