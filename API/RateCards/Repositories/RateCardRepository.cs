
using RateCards.Models;
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
                if (ratecard == null)
                {
                    return null;
                }
                return ratecard;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
public async Task<RateCard> GetById(int ratecardId)
    {
        try
        {
            using (var context = new RateCardContext(_configuration))
            {
                RateCard ratecard = await context.RateCards.FindAsync(ratecardId);
                if ( ratecard== null)
                {
                    return null;
                }
                return ratecard;
            }
        }    
        catch (Exception e)
        {
            throw e;
        }
    }
    }
}