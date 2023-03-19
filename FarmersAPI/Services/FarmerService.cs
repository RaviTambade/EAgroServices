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
    public List<Farmer> GetAllFarmers() => _repo.GetAllFarmers();
    public Farmer GetFarmerById(int id) => _repo.GetFarmerById(id);

    public bool InsertFarmer(Farmer farmer)=>_repo.InsertFarmer(farmer);
    public bool UpdateFarmer(Farmer farmer)=> _repo.UpdateFarmer(farmer);
    public bool DeleteFarmer(int id)=>_repo.DeleteFarmer(id);
}