using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
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
    public async Task<List<Merchant>> GetMerchants()
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
                                       where role.RoleName == "merchant"
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
    public async Task<Merchant> GetMerchant(int merchantId)
    {
        try
        {
            using (var context = new MerchantContext(_configuration))
            {
                Merchant merchant = await (
                    from m in context.Merchants
                    join userRole in context.UserRoles on m.Id equals userRole.UserId
                    join role in context.Roles on userRole.RoleId equals role.Id
                    where role.RoleName == "merchant" && m.Id == merchantId
                    select m
                ).FirstOrDefaultAsync(); ;
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

    public async Task<List<MerchantRecord>> GetMerchantSellRecords(int merchantId)
    {
        try
        {
            using (var context = new MerchantContext(_configuration))
            {
                List<MerchantRecord> merchantRecords = await (from merchant in context.Merchants
                                                              join collectionsell in context.CollectionSells on merchant.Id equals collectionsell.MerchantId
                                                              join collection in context.Collections
                                                              on collectionsell.CollectionId equals collection.Id
                                                              join crop in context.Crops
                                                              on collection.CropId equals crop.Id
                                                              join vehicle in context.Vehicles on collectionsell.VehicleId equals vehicle.Id
                                                              where collectionsell.MerchantId == merchantId
                                                              orderby collectionsell.Date descending
                                                              select new MerchantRecord()
                                                              {
                                                                  CropName = crop.CropName,
                                                                  ContainerType = collection.ContainerType,
                                                                  Quantity = collectionsell.Quantity,
                                                                  Grade = collection.Grade,
                                                                  NetWeight = collectionsell.NetWeight,
                                                                  RatePerKg = collectionsell.RatePerKg,
                                                                  VehicleNumber = vehicle.VehicleNumber,
                                                                  Date = collectionsell.Date
                                                              }
                                                            ).ToListAsync();
                return merchantRecords;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
      

}