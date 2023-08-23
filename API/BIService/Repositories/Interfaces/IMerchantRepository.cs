using BIService.Models;

namespace BIService.Repositories.Interfaces
{
    public interface IMerchantRepository
    {
        Task<List<CollectionCenterMonthCount>> GetCollectionCountByMonth(int merchantId,int year);

        Task<List<CollectionCenterYearCount>> GetCollectionCountByYear(int merchantId);
        Task<List<CollectionCenterQuarterCount>> GetCollectionCountByQuarter(int merchantId,int year);
        Task<List<CollectionCenterWeekCount>> GetCollectionCountByWeek(int merchantId,int year);
    }
}
