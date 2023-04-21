using System.Collections.Generic;
using System.Threading.Tasks;
using DealersAPI.Models;
namespace DealersAPI.Repositories.Interfaces;
public interface IDealerRepository{
   Task<List<Dealer>> GetDealers();
   Task<Dealer> GetDealer(int dealerId);
   Task<bool> Insert(Dealer dealer);
   Task<bool> Update(int dealerId,Dealer dealer);
   Task<bool> Delete(int dealerId);
}