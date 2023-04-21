
using System.Collections;
using Microsoft.EntityFrameworkCore;
using SoldItemsAPI.Models;
using SoldItemsAPI.Repositories.Interfaces;
using SoldItemsAPI.Services.Interfaces;

namespace SoldItemsAPI.Services;

public class SoldItemsService : ISoldItemsService
{

    private readonly ISoldItemsRepository _repo;

    public SoldItemsService(ISoldItemsRepository repo)
    {
        this._repo = repo;
    }
    public async Task<IEnumerable<SoldItems>> GetSoldItemsDetails()
    {
        return await _repo.GetSoldItemsDetails();
    }
    public async Task<SoldItems> GetById(int sellId)
    {
        return await _repo.GetById(sellId);
    }
    public async Task<bool> Insert(SoldItems soldItems)
    {
        return await _repo.Insert(soldItems);
    }
    public async Task<bool> Update(int sellId, SoldItems soldItems)
    {
        return await _repo.Update(sellId, soldItems);

    }
    public async Task<bool> Delete(int sellId)
    {
        return await _repo.Delete(sellId);
    }
}