using MerchantsAPI.Models;
using MerchantsAPI.Repositories;
namespace MerchantsAPI.Services;
public class MerchantService : IMerchantService
{
    private readonly IMerchantRepository _repo;  
    public MerchantService(IMerchantRepository repo)  
    {
        this._repo=repo;
    }
    public async Task<List<Merchant>> GetAll()
    {
        return await _repo.GetAll();
    }
    public async Task<Merchant> GetById(int merchantId)
    {
        return await _repo.GetById(merchantId);
    }
    public async Task<bool> Insert(Merchant merchant)
    {
        return await _repo.Insert(merchant);
    }
    public async Task<bool> Update(int merchantId,Merchant merchant)
    {
        return await _repo.Update(merchantId,merchant);
    }
    public async Task<bool> Delete(int merchantId)
    {
        return await _repo.Delete(merchantId);
    }
}