using System.Collections.Generic;
using System.Net;
using MerchantsAPI.Context;
using MerchantsAPI.Models;
using MerchantsAPI.Repositories.Interfaces;
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
                var merchants = await (from merchant in context.Merchants 
                                                  join userrole in context.UserRoles 
                                                  on merchant.Id equals userrole.UserId 
                                                  join role in context.Roles
                                                  on userrole.RoleId equals role.Id
                                                  where role.RoleName=="merchant"
                                                  select merchant
                                                   ).ToListAsync();
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
                Merchant merchant = await  (
                    from m in context.Merchants
                    join userRole in context.UserRoles on m.Id equals userRole.UserId
                    join role in context.Roles on userRole.RoleId equals role.Id
                    where role.RoleName == "merchant" && m.Id == merchantId
                    select m
                ).FirstOrDefaultAsync();;
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
  
}