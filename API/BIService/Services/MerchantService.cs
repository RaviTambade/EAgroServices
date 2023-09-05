using Transflower.EAgroServices.BIService.Services.Interfaces;
using Transflower.EAgroServices.BIService.Repositories.Interfaces;
using Transflower.EAgroServices.BIService.Models;
namespace Transflower.EAgroServices.BIService.Services;
public class MerchantService : IMerchantService
{
    private readonly IMerchantRepository _repository;
    public MerchantService(IMerchantRepository repository)
    {
        _repository = repository;
    }
    public async Task<List<CollectionCenterMonthCount>> GetCollectionCountByMonth(int merchantid, int year)
    {
        return await _repository.GetCollectionCountByMonth(merchantid, year);
    }
    public async Task<List<CollectionCenterYearCount>> GetCollectionCountByYear(int merchantid)
    {
        return await _repository.GetCollectionCountByYear(merchantid);
    }
    public async Task<List<CollectionCenterQuarterCount>> GetCollectionCountByQuarter(int merchantid, int year)
    {
        return await _repository.GetCollectionCountByQuarter(merchantid, year);
    }
    public async Task<List<CollectionCenterWeekCount>> GetCollectionCountByWeek(int merchantid, int year)
    {
        return await _repository.GetCollectionCountByWeek(merchantid, year);
    }
}
