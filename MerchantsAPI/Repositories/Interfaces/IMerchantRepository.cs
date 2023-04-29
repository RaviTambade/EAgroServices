using MerchantsAPI.Models;
namespace MerchantsAPI.Repositories;
public interface IMerchantRepository
{
    Task<List<Merchant>> GetAll();
    Task<Merchant> GetById(int merchantId);
    Task<bool> Insert(Merchant merchant);
    Task<bool> Update(int merchantId,Merchant merchant);
    Task<bool> Delete(int merchantId);


}