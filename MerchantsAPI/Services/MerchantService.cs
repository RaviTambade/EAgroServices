using MerchantsAPI.Models;
using MerchantsAPI.Repositories;
using MerchantsAPI.Repositories.Interfaces;
using MerchantsAPI.Services.Interfaces;
namespace MerchantsAPI.Services;
public class MerchantService : IMerchantService
{
    private readonly IMerchantRepository _repo;  
    public MerchantService(IMerchantRepository repo)  
    {
        this._repo=repo;
    }
    public async Task<List<User>> GetAll()=> await _repo.GetAll();
    // public async Task<Merchant> GetById(int merchantId)=> await _repo.GetById(merchantId);
   
}