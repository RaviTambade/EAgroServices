
using RateCards.Services.Interfaces;
using RateCards.Repositories.Interfaces;
using RateCards.Entities;

namespace RateCards.Services
{
    public class RateCardService : IRateCardService
    {
        private readonly IRateCardRepository _repo;

        public RateCardService(IRateCardRepository repo)
        {
            _repo = repo;
        }
    public async Task<List<RateCard>> GetAll() =>await _repo.GetAll();
    public async Task<RateCard?> GetById(int  ratecardId) =>await _repo.GetById(ratecardId);
    public async Task<bool> Insert(RateCard ratecard) =>await _repo.Insert(ratecard);
    public async Task<bool> Update(int  ratecardId,RateCard ratecard) =>await _repo.Update(ratecardId,ratecard);
    public async Task<bool> Delete(int  ratecardId) =>await _repo.Delete(ratecardId);

    }
}