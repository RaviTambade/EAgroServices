using Transflower.EAgroServices.Merchants.Models;
using Transflower.EAgroServices.Merchants.Repositories.Interfaces;
using Transflower.EAgroServices.Merchants.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using Transflower.EAgroServices.Merchants.Entities;
namespace Transflower.EAgroServices.Merchants.Repositories;
public class MerchantRepository : IMerchantRepository
{
    private readonly MerchantContext _merchantContext;

    public MerchantRepository(MerchantContext merchantContext)
    {
        _merchantContext = merchantContext;
    }

    public async Task<List<Merchant>> GetAll()
    {
        try
        {
            var merchants = await _merchantContext.Merchants.ToListAsync();
            return merchants;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<Merchant?> GetById(int merchantId)
    {
        try
        {
            var merchant = await _merchantContext.Merchants.FindAsync(merchantId);
            return merchant;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Insert(Merchant merchant)
    {
        try
        {
            bool status = false;
            await _merchantContext.Merchants.AddAsync(merchant);
            status = await SaveChanges(_merchantContext);
            return status;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Update(Merchant merchant)
    {
        try
        {
            bool status = false;
            var oldMerchant = await _merchantContext.Merchants.FindAsync(merchant.Id);
            if (oldMerchant is not null)
            {
                oldMerchant.CorporateId = merchant.CorporateId;
                oldMerchant.ManagerId = merchant.ManagerId;
                status = await SaveChanges(_merchantContext);
            }
            return status;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Delete(int merchantId)
    {
        try
        {
            bool status = false;
            var merchant = await _merchantContext.Merchants.FindAsync(merchantId);
            if (merchant is not null)
            {
                _merchantContext.Merchants.Remove(merchant);
                status = await SaveChanges(_merchantContext);
            }
            return status;
        }
        catch (Exception)
        {
            throw;
        }
    }

    private async Task<bool> SaveChanges(MerchantContext context)
    {
        int rowsAffected = await context.SaveChangesAsync();
        if (rowsAffected > 0)
        {
            return true;
        }
        return false;
    }

    public async Task<int> GetCorporateId(int merchantId)
    {
        try
        {
            int corporateId = await (
                from merchant in _merchantContext.Merchants
                join shipment in _merchantContext.Shipments on merchant.Id equals shipment.MerchantId
                where merchant.Id == merchantId
                select merchant.CorporateId
            ).FirstOrDefaultAsync();
            return corporateId;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<int> GetMerchantId(int managerId)
    {
        try
        {
            int merchantId = await (
                from merchant in _merchantContext.Merchants
                where merchant.ManagerId == managerId
                select merchant.Id
            ).FirstOrDefaultAsync();
            return merchantId;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<int> GetId(int corporateId)
    {
        try
        {
            int id = await _merchantContext.Merchants
                .Where(m => m.CorporateId == corporateId)
                .Select(m => m.Id)
                .FirstOrDefaultAsync();
            return id;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<MerchantCorporate>> GetMerchantAndCorporateId()
    {
        try
        {
            return await _merchantContext.Merchants
                .Select(
                    m => new MerchantCorporate() { Id = m.Id, CorporateId = m.CorporateId }
                )
                .ToListAsync();
        }
        catch (Exception)
        {
            throw;
        }
    }
}
