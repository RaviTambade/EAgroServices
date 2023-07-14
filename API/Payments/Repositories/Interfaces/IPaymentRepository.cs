
using Payments.Models;

namespace Payments.Repositories.Interfaces
{
    public interface IPaymentRepository
    {
        Task<bool> Add(FarmerServicePayment payment);
    }
}