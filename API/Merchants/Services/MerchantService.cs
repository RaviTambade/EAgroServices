
using Merchants.Services.Interfaces;
using Merchants.Repositories.Interfaces;
using Merchants.Models;

namespace Merchants.Services
{
    public class MerchantService : IMerchantService
    {
        private readonly IMerchantRepository _repo;

        public MerchantService(IMerchantRepository repo)
        {
            _repo = repo;
        }
          public async Task<List<Merchant>> GetAll()
        {
            return await _repo.GetAll();
        }

        public async Task<Merchant> GetById(int merchantId)
        {
            return await _repo.GetById(merchantId);
        }

        public async Task<bool> Insert(Merchant merchant)
        {
            return await _repo.Insert(merchant);
        }

        public async Task<bool> Update(Merchant merchant)
        {
            return await _repo.Update(merchant);
        }

        public async Task<bool> Delete(int merchantId)
        {
            return await _repo.Delete(merchantId);
        }
    }
}