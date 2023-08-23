using Merchants.Models;
using Merchants.Repositories.Interfaces;
using Merchants.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using Merchants.Entities;

namespace Merchants.Repositories
{
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
                    var merchants = await context.Merchants.ToListAsync();
                    return merchants;
                }
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
                using (var context = new MerchantContext(_configuration))
                {
                    var merchant = await context.Merchants.FindAsync(merchantId);
                    return merchant;
                }
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
                using (var context = new MerchantContext(_configuration))
                {
                    await context.Merchants.AddAsync(merchant);
                    status = await SaveChanges(context);
                    return status;
                }
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
                using (var context = new MerchantContext(_configuration))
                {
                    var oldMerchant = await context.Merchants.FindAsync(merchant.Id);
                    if (oldMerchant is not null)
                    {
                        oldMerchant.CorporateId = merchant.CorporateId;
                        oldMerchant.ManagerId = merchant.ManagerId;
                        status = await SaveChanges(context);
                    }
                    return status;
                }
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
                using (var context = new MerchantContext(_configuration))
                {
                    var merchant = await context.Merchants.FindAsync(merchantId);
                    if (merchant is not null)
                    {
                        context.Merchants.Remove(merchant);
                        status = await SaveChanges(context);
                    }
                    return status;
                }
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
                using (var context = new MerchantContext(_configuration))
                {
                    int corporateId = await (
                        from merchant in context.Merchants
                        join shipment in context.Shipments on merchant.Id equals shipment.MerchantId
                        where merchant.Id == merchantId
                        select merchant.CorporateId
                    ).FirstOrDefaultAsync();
                    return corporateId;
                }
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
                using (var context = new MerchantContext(_configuration))
                {
                    int merchantId = await (
                        from merchant in context.Merchants
                        where merchant.ManagerId == managerId
                        select merchant.Id
                    ).FirstOrDefaultAsync();
                    return merchantId;
                }
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
                using (var context = new MerchantContext(_configuration))
                {
                    int id = await context.Merchants
                        .Where(m => m.CorporateId == corporateId)
                        .Select(m => m.Id)
                        .FirstOrDefaultAsync();
                    return id;
                }
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
                using (var context = new MerchantContext(_configuration))
                {
                    return await context.Merchants
                        .Select(
                            m => new MerchantCorporate() { Id = m.Id, CorporateId = m.CorporateId }
                        )
                        .ToListAsync();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
