using Transflower.EAgroServices.Payments.Models;
namespace Transflower.EAgroServices.Payments.Repositories.Interfaces;
public interface IPaymentRepository
{
    Task<bool> AddPayment(FarmerServicePayment payment);
}
