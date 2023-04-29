using System.Collections.Generic;
using System.Net;
using MerchantsAPI.Context;
using MerchantsAPI.Models;
using Microsoft.EntityFrameworkCore;
namespace MerchantsAPI.Repositories;
public class MerchantRepository : IMerchantRepository
{
    private readonly IConfiguration _configuration;
    public MerchantRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<Merchant>> GetAll()
    {
        try
        {
            using (var context = new MerchantContext(_configuration))
            {
                List<Merchant> merchants = await context.Merchants.ToListAsync();
                if (merchants == null)
                {
                    return null;
                }
                return merchants;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<Merchant> GetById(int merchantId)
    {
        try
        {
            using (var context = new MerchantContext(_configuration))
            {
                Merchant merchant = await context.Merchants.FindAsync(merchantId);
                if (merchant == null)
                {
                    return null;
                }
                return merchant;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<bool> Insert(Merchant merchant)
    {
        bool status = false;
        try
        {
            using (var context = new MerchantContext(_configuration))
            {
                await context.Merchants.AddAsync(merchant);
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
    public async Task<bool> Update(int merchantId, Merchant merchant)
    {
        bool status = false;
        try
        {
            using (var context = new MerchantContext(_configuration))
            {
                Merchant? oldMerchant = await context.Merchants.FindAsync(merchantId);
                if (oldMerchant != null)
                {
                    oldMerchant.FirstName = merchant.FirstName;
                    oldMerchant.LastName = merchant.LastName;
                    oldMerchant.CompanyName = merchant.CompanyName;
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
    public async Task<bool> Delete(int merchantId)
    {
        bool status = false;
        try
        {
            using (var context = new MerchantContext(_configuration))
            {
                Merchant? merchant = await context.Merchants.FindAsync(merchantId);
                if (merchant != null)
                {
                    context.Merchants.Remove(merchant);
                    await context.SaveChangesAsync();
                    status = true;
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