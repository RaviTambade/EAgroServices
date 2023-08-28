using Transflower.EAgroServices.Merchants.Entities;
using Transflower.EAgroServices.Merchants.Models;
namespace Transflower.EAgroServices.Merchants.Repositories.Interfaces;
public interface IMerchantRepository
{
    Task<List<Merchant>> GetAll();
    Task<Merchant?> GetById(int merchantId);
    Task<int> GetCorporateId(int merchantId);
    Task<int> GetId(int corporateId);
    Task<int> GetMerchantId(int managerId);
    Task<bool> Insert(Merchant merchant);
    Task<bool> Update(Merchant merchant);
    Task<bool> Delete(int merchantId);

    Task<List<MerchantCorporate>> GetMerchantAndCorporateId();

}
