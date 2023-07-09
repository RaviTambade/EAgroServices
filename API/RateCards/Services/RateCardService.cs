
using RateCards.Services.Interfaces;
using RateCards.Repositories.Interfaces;
using RateCards.Models;

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
    public async Task<RateCard> GetById(int  ratecardId) =>await _repo.GetById(ratecardId);

    }
}