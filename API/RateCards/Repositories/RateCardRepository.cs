using Transflower.EAgroServices.RateCards.Entities;
using Transflower.EAgroServices.RateCards.Repositories.Interfaces;
using Transflower.EAgroServices.RateCards.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
namespace Transflower.EAgroServices.RateCards.Repositories;
public class RateCardRepository : IRateCardRepository
{
    private readonly RateCardContext _rateCardContext;
    public RateCardRepository(RateCardContext rateCardContext)
    {
        _rateCardContext = rateCardContext;
    }
    public async Task<List<RateCard>> GetAll()
    {
        try
        {
            List<RateCard> ratecards = await _rateCardContext.RateCards.ToListAsync();
            return ratecards;
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
            RateCard? ratecard = await _rateCardContext.RateCards.FindAsync(ratecardId);
            return ratecard;
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
            await _rateCardContext.RateCards.AddAsync(ratecard);
            await _rateCardContext.SaveChangesAsync();
            status = true;
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
            RateCard? oldratecard = await _rateCardContext.RateCards.FindAsync(ratecardId);
            if (oldratecard != null)
            {
                oldratecard.Title = ratecard.Title;
                oldratecard.Description = ratecard.Description;
                oldratecard.Amount = ratecard.Amount;
                await _rateCardContext.SaveChangesAsync();
                status = true;
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
            RateCard? ratecard = await _rateCardContext.RateCards.FindAsync(ratecardId);
            if (ratecard != null)
            {
                _rateCardContext.RateCards.Remove(ratecard);
                await _rateCardContext.SaveChangesAsync();
                return true;
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }
}
