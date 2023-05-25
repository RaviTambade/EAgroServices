using FarmersAPI.Models;
using FarmersAPI.Repositories.Interfaces;
using FarmersAPI.Services.Interfaces;
namespace FarmersAPI.Services;
public class FarmerService:IFarmerService{
    private readonly IFarmerRepository _repo;
    public FarmerService(IFarmerRepository repo){
        this._repo=repo;
    }
    public async Task<List<Farmer>> GetAll() =>await _repo.GetAll();
    public async Task<Farmer> GetById(int farmerId) =>await _repo.GetById(farmerId);
    public async Task<bool> Insert(User user,Farmer farmer,UserRole userRole)=>await _repo.Insert( user, farmer, userRole);
    public async Task<bool> Update(int farmerId,Farmer farmer)=>await _repo.Update(farmerId,farmer);
    public async Task<bool> Delete(int farmerId)=>await _repo.Delete(farmerId);
}