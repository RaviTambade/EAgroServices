using Transflower.EAgroServices.RateCards.Entities;
namespace Transflower.EAgroServices.RateCards.Repositories.Interfaces;
public interface IRateCardRepository
{
    Task<List<RateCard>> GetAll();
    Task<RateCard?> GetById(int ratecardId);
    Task<bool> Insert(RateCard ratecard);
    Task<bool> Update(int ratecardId, RateCard ratecard);
    Task<bool> Delete(int ratecardId);
}

