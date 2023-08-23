using RateCards.Entities;
using RateCards.Repositories.Interfaces;
using RateCards.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;

namespace RateCards.Repositories
{
    public class RateCardRepository : IRateCardRepository
    {
        private readonly IConfiguration _configuration;

        public RateCardRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<RateCard>> GetAll()
        {
            try
            {
                using (var context = new RateCardContext(_configuration))
                {
                    List<RateCard> ratecard = await context.RateCards.ToListAsync();
                    return ratecard;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<RateCard?> GetById(int ratecardId)
        {
            try
            {
                using (var context = new RateCardContext(_configuration))
                {
                    RateCard? ratecard = await context.RateCards.FindAsync(ratecardId);
                    return ratecard;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Insert(RateCard ratecard)
        {
            bool status = false;
            try
            {
                using (var context = new RateCardContext(_configuration))
                {
                    await context.RateCards.AddAsync(ratecard);
                    await context.SaveChangesAsync();
                    status = true;
                }
            }
            catch (Exception)
            {
                throw;
            }
            return status;
        }

        public async Task<bool> Update(int ratecardId, RateCard ratecard)
        {
            bool status = false;
            try
            {
                using (var context = new RateCardContext(_configuration))
                {
                    RateCard? oldratecard = await context.RateCards.FindAsync(ratecardId);
                    if (oldratecard != null)
                    {
                        oldratecard.Title = ratecard.Title;
                        oldratecard.Description = ratecard.Description;
                        oldratecard.Amount = ratecard.Amount;
                        await context.SaveChangesAsync();
                        status = true;
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return status;
        }

        public async Task<bool> Delete(int ratecardId)
        {
            bool status = false;
            try
            {
                using (var context = new RateCardContext(_configuration))
                {
                    RateCard? ratecard = await context.RateCards.FindAsync(ratecardId);
                    if (ratecard != null)
                    {
                        context.RateCards.Remove(ratecard);
                        await context.SaveChangesAsync();
                        return true;
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return status;
        }
    }
}
