
using Payments.Models;

namespace Payments.Repositories.Interfaces
{
    public interface ITransporterPaymentRepository
    {
        Task<bool> isShipmentPaymentPaid(int shipmentId);
    }
}