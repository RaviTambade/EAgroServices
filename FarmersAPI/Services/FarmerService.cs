using System.Collections.Generic;
using FarmersAPI.Models;
using FarmersAPI.Repositories.Interfaces;
using FarmersAPI.Services.Interfaces;
namespace FarmersAPI.Services;
public class FarmerService:IFarmerService{
    private readonly IFarmerRepository _repo;
    public FarmerService(IFarmerRepository repo){
        this._repo=repo;
    }
    public async Task<List<Farmer>> GetAllFarmers() =>await _repo.GetAllFarmers();
    public async Task<Farmer> GetFarmerById(int farmerId) =>await _repo.GetFarmerById(farmerId);
    public async Task<bool> InsertFarmer(Farmer farmer)=>await _repo.InsertFarmer(farmer);
    public async Task<bool> UpdateFarmer(int farmerId,Farmer farmer)=>await _repo.UpdateFarmer(farmerId,farmer);
    public async Task<bool> DeleteFarmer(int farmerId)=>await _repo.DeleteFarmer(farmerId);
}