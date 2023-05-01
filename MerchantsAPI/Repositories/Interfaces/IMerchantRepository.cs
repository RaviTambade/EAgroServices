using MerchantsAPI.Models;
namespace MerchantsAPI.Repositories.Interfaces;
public interface IMerchantRepository
{
    Task<List<Merchant>> GetAll();
    Task<Merchant> GetById(int merchantId);
    Task<bool> Insert(Merchant merchant,User user,UserRole userRole);
    Task<bool> Update(int merchantId,Merchant merchant);
    Task<bool> Delete(int merchantId);


}