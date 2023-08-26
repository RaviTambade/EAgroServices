using Transflower.EAgroServices.BIService.Services.Interfaces;
using Transflower.EAgroServices.BIService.Repositories.Interfaces;
using Transflower.EAgroServices.BIService.Models;
namespace Transflower.EAgroServices.BIService.Services;
public class MerchantService : IMerchantService
{
    private readonly IMerchantRepository _repo;
    public MerchantService(IMerchantRepository repo)
    {
        _repo = repo;
    }
    public async Task<List<CollectionCenterMonthCount>> GetCollectionCountByMonth(int merchantid, int year)
    {
        return await _repo.GetCollectionCountByMonth(merchantid, year);
    }
    public async Task<List<CollectionCenterYearCount>> GetCollectionCountByYear(int merchantid)
    {
        return await _repo.GetCollectionCountByYear(merchantid);
    }
    public async Task<List<CollectionCenterQuarterCount>> GetCollectionCountByQuarter(int merchantid, int year)
    {
        return await _repo.GetCollectionCountByQuarter(merchantid, year);
    }
    public async Task<List<CollectionCenterWeekCount>> GetCollectionCountByWeek(int merchantid, int year)
    {
        return await _repo.GetCollectionCountByWeek(merchantid, year);
    }
}
