using RateApi.Contexts;
using RateApi.Models;
using RateApi.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
namespace RateApi.Repositories;
public class RateRepository : IRateRepository
{
    private readonly IConfiguration _configuration;
    public RateRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<Rate>> GetAllRates()
    {
        try
        {
               using (var context = new RatesContext(_configuration))
            {
                List<Rate> rates = await context.Rates.ToListAsync();
                if (rates == null)
                {
                    return null;
                }
                return rates;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<Rate> GetById(int rateId)
    {
        try
        {
            using (var context = new RatesContext(_configuration))
            {
                Rate rate = await context.Rates.FindAsync(rateId);
                if (rate == null)
                {
                    return null;
                }
                return rate;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<bool> Insert(Rate rate)
    {
        bool status = false;
        try
        {
            using (var context = new RatesContext(_configuration))
            {
                await context.Rates.AddAsync(rate);
                await context.SaveChangesAsync();
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }

    public async Task<bool> Update(int rateId, Rate rate)
    {
        bool status = false;
        try
        {
            using (var context = new RatesContext(_configuration))
            {
                Rate? oldRate = await context.Rates.FindAsync(rateId);
                if (oldRate != null)
                {
                    oldRate.Rates = rate.Rates;
                    await context.SaveChangesAsync();
                    status= true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }
    public async Task<bool> Delete(int rateId)
    {
        bool status = false;
        try
        {
            using (var context = new RatesContext(_configuration))
            {
                Rate? rate = await context.Rates.FindAsync(rateId);
                if (rate != null)
                {
                    context.Rates.Remove(rate);
                    await context.SaveChangesAsync();
                    return true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }

}