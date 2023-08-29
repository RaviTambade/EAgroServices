using Transflower.EAgroServices.Payments.Models;
namespace Transflower.EAgroServices.Payments.Repositories.Interfaces;
public interface ITransporterPaymentRepository
{
    Task<bool> IsShipmentPaymentPaid(int shipmentId);
    Task<bool> TransporterPayment(TransporterPayment payment);
}
