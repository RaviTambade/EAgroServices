using System.Threading.Tasks;
using PaymentAPI.Models;
namespace PaymentAPI.Repositories.Interfaces;
public interface IPaymentRepository{
    Task<bool> Insert(Payment payment);
}