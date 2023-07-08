
using Merchants.Models;
using Merchants.Repositories.Interfaces;
using Merchants.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;


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

      
        public async Task<Merchant> GetById(int merchantid)
        {
            try
            {
                using (var context = new MerchantContext(_configuration))
                {
                    var merchant = await context.Merchants.FindAsync(merchantid);

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
            try
            {
                bool status = false;
                using (var context = new MerchantContext(_configuration))
                {
                    await context.Merchants.AddAsync(merchant);
                    int rowsAffected = context.SaveChanges();
                    if (rowsAffected > 0)
                    {
                        status = true;
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
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
                        int rowsAffected = context.SaveChanges();
                        if (rowsAffected > 0)
                        {
                            status = true;
                        }
                    }

                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Delete(int merchantid)
        {
            try
            {
                bool status = false;
                using (var context = new MerchantContext(_configuration))
                {
                    var merchant = await context.Merchants.FindAsync(merchantid);
                    if (merchant is not null)
                    {
                        context.Merchants.Remove(merchant);
                        int rowsAffected = context.SaveChanges();
                        if (rowsAffected > 0)
                        {
                            status = true;
                        }
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}