using BIService.Services.Interfaces;
using BIService.Repositories.Interfaces;
using BIService.Models;

namespace BIService.Services
{
    public class MerchantService : IMerchantService
    {
        private readonly IMerchantRepository _repo;

        public MerchantService(IMerchantRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<CollectionCenterMonthCount>> GetCollectionCountByMonth(int merchantid)
        {
            return await _repo.GetCollectionCountByMonth(merchantid);
        }
    }
}
