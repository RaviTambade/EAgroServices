using Transflower.EAgroServices.Merchants.Services.Interfaces;
using Transflower.EAgroServices.Merchants.Repositories.Interfaces;
using Transflower.EAgroServices.Merchants.Models;
using Transflower.EAgroServices.Merchants.Entities;
namespace Transflower.EAgroServices.Merchants.Services;
public class MerchantService : IMerchantService
{
    private readonly IMerchantRepository _repo;

    public MerchantService(IMerchantRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<Merchant>> GetAll()
    {
        return await _repo.GetAll();
    }

    public async Task<Merchant?> GetById(int merchantId)
    {
        return await _repo.GetById(merchantId);
    }

    public async Task<bool> Insert(Merchant merchant)
    {
        return await _repo.Insert(merchant);
    }

    public async Task<bool> Update(Merchant merchant)
    {
        return await _repo.Update(merchant);
    }

    public async Task<bool> Delete(int merchantId)
    {
        return await _repo.Delete(merchantId);
    }

    public async Task<int> GetCorporateId(int merchantId)
    {
        return await _repo.GetCorporateId(merchantId);
    }

    public async Task<int> GetMerchantId(int managerId)
    {
        return await _repo.GetMerchantId(managerId);
    }

    public async Task<int> GetId(int corporateId)
    {
        return await _repo.GetId(corporateId);
    }

    public async Task<List<MerchantCorporate>> GetMerchantAndCorporateId()
    {
        return await _repo.GetMerchantAndCorporateId();
    }
}

