using System.Collections.Generic;
using FarmersAPI.Models;
namespace FarmersAPI.Repositories.Interfaces;
public interface IFarmerRepository{
    Task<List<Farmer>> GetAllFarmers();
    Task<Farmer> GetFarmerById(int farmerId);
    Task<bool> InsertFarmer(Farmer farmer);
    Task<bool> UpdateFarmer(int farmerId,Farmer farmer);
    Task<bool> DeleteFarmer(int farmerId);
}