using Transflower.EAgroServices.Merchants.Services.Interfaces;
using Transflower.EAgroServices.Merchants.Repositories.Interfaces;
using Transflower.EAgroServices.Merchants.Models;
using Transflower.EAgroServices.Merchants.Entities;
namespace Transflower.EAgroServices.Merchants.Services;
public class MerchantService : IMerchantService
{
    private readonly IMerchantRepository _repository;

    public MerchantService(IMerchantRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Merchant>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task<Merchant?> GetById(int merchantId)
    {
        return await _repository.GetById(merchantId);
    }

    public async Task<bool> Insert(Merchant merchant)
    {
        return await _repository.Insert(merchant);
    }

    public async Task<bool> Update(Merchant merchant)
    {
        return await _repository.Update(merchant);
    }

    public async Task<bool> Delete(int merchantId)
    {
        return await _repository.Delete(merchantId);
    }

    public async Task<int> GetCorporateId(int merchantId)
    {
        return await _repository.GetCorporateId(merchantId);
    }

    public async Task<int> GetMerchantId(int managerId)
    {
        return await _repository.GetMerchantId(managerId);
    }

    public async Task<int> GetId(int corporateId)
    {
        return await _repository.GetId(corporateId);
    }

    public async Task<List<MerchantCorporate>> GetMerchantAndCorporateId()
    {
        return await _repository.GetMerchantAndCorporateId();
    }
}

