using FarmersAPI.Models;
using FarmersAPI.Repositories.Interfaces;
using FarmersAPI.Services.Interfaces;

namespace FarmersAPI.Services;

public class FarmerService : IFarmerService
{
    private readonly IFarmerRepository _repo;

    public FarmerService(IFarmerRepository repo)
    {
        this._repo = repo;
    }

    public async Task<List<Farmer>> GetFarmers()
    {
        return await _repo.GetFarmers();
    }

    public async Task<Farmer> GetFarmer(int farmerId)
    {
        return await _repo.GetFarmer(farmerId);
    }

    public async Task<List<FarmerCollection>> GetFarmerCollections(int farmerId)
    {
        return await _repo.GetFarmerCollections(farmerId);
    }

    public async Task<List<FarmerCollectionPerMonth>> GetFarmerCollectionAmountByMonth(int farmerId)
    {
        return await _repo.GetFarmerCollectionAmountByMonth(farmerId);
    }

    public async Task<List<FarmerCollectionByCrop>> GetFarmerCollectionAmountByCrop(int farmerId)
    {
        return await _repo.GetFarmerCollectionAmountByCrop(farmerId);
    }
}
