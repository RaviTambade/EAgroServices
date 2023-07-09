
using RateCards.Models;

namespace RateCards.Repositories.Interfaces
{
    public interface IRateCardRepository
    {
    Task<List<RateCard>> GetAll();
    Task<RateCard> GetById(int ratecardId);
    // Task<bool> Insert(Crop variety);
    // Task<bool> Update(int varietyId,Crop variety);
    // Task<bool> Delete(int varietyId);
}
    }
