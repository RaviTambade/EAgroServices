using System.Collections.Generic;
using DealersAPI.Models;
using DealersAPI.Repositories.Interfaces;
using DealersAPI.Services.Interfaces;
namespace DealersAPI.Services;
public class DealerService:IDealerService{
    private readonly IDealerRepository _repo;
    public DealerService(IDealerRepository repo){
        this._repo=repo;
    }
    public async Task<List<Dealer>> GetDealers() =>await _repo.GetDealers();
    public async Task<Dealer> GetDealer(int dealerId) =>await _repo.GetDealer(dealerId);
    public async Task<bool> Insert(Dealer dealer)=>await _repo.Insert(dealer);
    public async Task<bool> Update(int dealerId,Dealer dealer)=>await _repo.Update(dealerId,dealer);
    public async Task<bool> Delete(int dealerId)=>await _repo.Delete(dealerId);
}