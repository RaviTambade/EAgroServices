using System.Collections.Generic;
using System.Threading.Tasks;
using SellsAPI.Models;
namespace SellsAPI.Repositories.Interfaces;
public interface ISellRepository
{
    Task<List<SellBillingView>> GetAll();
    Task<Sell> GetById(int sellId);
    Task<bool> Insert(Sell sell,FreightRate freightRate);
    Task<bool> Update(int sellId,Sell sell,FreightRate freightRate);
    Task<bool> Delete(int sellId);
    Task<SellBilling> GetSellBilling(int sellId);


    
}