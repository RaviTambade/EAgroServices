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

    public async Task<Farmer> GetFarmer(int farmerId)
    {
        return await _repo.GetFarmer(farmerId);
    }

    public async Task<List<Farmer>> GetFarmers()
    {
        return await _repo.GetFarmers();
    }
}
