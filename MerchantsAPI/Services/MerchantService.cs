using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
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
    public async Task<List<Merchant>> GetMerchants()=> await _repo.GetMerchants();
    public async Task<Merchant> GetMerchant(int merchantId)=> await _repo.GetMerchant(merchantId);
    public async Task<List<MerchantRecord>> GetMerchantSellRecords(int merchantId)=>await _repo.GetMerchantSellRecords(merchantId);
    public async Task<List<MerchantRecord>> GetMerchantSellRecordsByDate(int merchantId,DateFilter dateFilter)=>await _repo.GetMerchantSellRecordsByDate(merchantId,dateFilter);
    public async Task<List<Merchant>> SearchByName(string name)=> await _repo.SearchByName(name);


    private readonly IMerchantRepository _repo;

    public MerchantService(IMerchantRepository repo)
    {
        this._repo = repo;
    }

    public async Task<List<Merchant>> GetMerchants() => await _repo.GetMerchants();

    public async Task<Merchant> GetMerchant(int merchantId) => await _repo.GetMerchant(merchantId);

    public async Task<List<MerchantRecord>> GetMerchantSellRecords(int merchantId) =>
        await _repo.GetMerchantSellRecords(merchantId);

    public async Task<List<MerchantRecord>> GetMerchantSellRecordsByDate(
        int merchantId,
        DateFilter dateFilter
    ) => await _repo.GetMerchantSellRecordsByDate(merchantId, dateFilter);
}

