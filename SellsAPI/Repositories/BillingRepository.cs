using SellsAPI.Contexts;
using SellsAPI.Models;
using SellsAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
namespace SellsAPI.Repositories;
public class BillingRepository : IBillingRepository
{
    private readonly IConfiguration _configuration;
    public BillingRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<bool> Insert(Billing billing){
        bool status=false;
        try{
            using(var context=new SellsContext(_configuration)){
                await context.Billings.AddAsync(billing);
                await _dbContext.SaveChangesAsync();
                var billId=new SqlParameter("@bill_Id",billing.BillId);
        

            }
        }
        catch(Exception e){
            throw e;
        }

    }
 }