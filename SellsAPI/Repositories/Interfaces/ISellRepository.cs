using System.Collections.Generic;
using System.Threading.Tasks;
using SellsAPI.Models;
namespace SellsAPI.Repositories.Interfaces;
public interface ISellRepository
{
    Task<List<Sell>> GetAll();
    Task<Sell> GetById(int sellId);
    Task<bool> Insert(Sell sell);
    Task<bool> Update(int sellId,Sell sell);
    Task<bool> Delete(int sellId);
}