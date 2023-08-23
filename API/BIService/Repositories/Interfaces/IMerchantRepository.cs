using BIService.Models;

namespace BIService.Repositories.Interfaces
{
    public interface IMerchantRepository
    {
        Task<List<CollectionCenterMonthCount>> GetCollectionCountByMonth(int merchantId);
    }
}
