
using Merchants.Models;

namespace Merchants.Repositories.Interfaces
{
    public interface IMerchantRepository
    {
          Task<List<Merchant>> GetAll();
        Task<Merchant> GetById(int merchantId);
        Task<bool> Insert(Merchant merchant);
        Task<bool> Update(Merchant merchant);
        Task<bool> Delete(int merchantId);

    }
}