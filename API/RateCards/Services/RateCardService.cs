using Transflower.EAgroServices.RateCards.Services.Interfaces;
using Transflower.EAgroServices.RateCards.Repositories.Interfaces;
using Transflower.EAgroServices.RateCards.Entities;
namespace Transflower.EAgroServices.RateCards.Services;
public class RateCardService : IRateCardService
{
    private readonly IRateCardRepository _repository;
    public RateCardService(IRateCardRepository repository)
    {
        _repository = repository;
    }
    public async Task<List<RateCard>> GetAll() => await _repository.GetAll();
    public async Task<RateCard?> GetById(int ratecardId) => await _repository.GetById(ratecardId);
    public async Task<bool> Insert(RateCard ratecard) => await _repository.Insert(ratecard);
    public async Task<bool> Update(int ratecardId, RateCard ratecard) => await _repository.Update(ratecardId, ratecard);
    public async Task<bool> Delete(int ratecardId) => await _repository.Delete(ratecardId);
}
