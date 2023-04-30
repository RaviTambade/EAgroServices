using System.Collections.Generic;
using SellsAPI.Models;
using SellsAPI.Repositories;
using SellsAPI.Repositories.Interfaces;
using SellsAPI.Services.Interfaces;
namespace SellsAPI.Services;
public class SellService:ISellService{
    private readonly ISellRepository _repo;
    public SellService(ISellRepository repo){
        this._repo=repo;
    }
    public async Task<List<Sell>> GetAll() =>await _repo.GetAll();
    public async Task<Sell> GetById(int sellId) =>await _repo.GetById(sellId);
    public async Task<bool> Insert(Sell sell)=>await _repo.Insert(sell);
    public async Task<bool> Update(int sellId,Sell sell)=>await _repo.Update(sellId,sell);
    public async Task<bool> Delete(int sellId)=>await _repo.Delete(sellId);
}