using System.Collections.Generic;
using RateApi.Models;
using RateApi.Repositories;
using RateApi.Services;
namespace RateApi.Services;
public class RateService:IRateService{
    private readonly IRateRepository _repo;
    public RateService(IRateRepository repo){
        this._repo=repo;
    }
    public async Task<List<Rate>> GetAllRates() =>await _repo.GetAllRates();
    public async Task<Rate> GetById(int rateId) =>await _repo.GetById(rateId);
    public async Task<bool> Insert(Rate rate)=>await _repo.Insert(rate);
    public async Task<bool> Update(int rateId,Rate rate)=>await _repo.Update(rateId,rate);
    public async Task<bool> Delete(int rateId)=>await _repo.Delete(rateId);
}