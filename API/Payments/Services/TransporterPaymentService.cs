using Payments.Services.Interfaces;
using Payments.Repositories.Interfaces;
using Payments.Models;

namespace Payments.Services
{
    public class TransporterPaymentService : ITransporterPaymentService
    {
        private readonly ITransporterPaymentRepository _repo;

        public TransporterPaymentService(ITransporterPaymentRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> isShipmentPaymentPaid(int shipmentId)
        {
            return await _repo.isShipmentPaymentPaid(shipmentId);
        }
    }
}
