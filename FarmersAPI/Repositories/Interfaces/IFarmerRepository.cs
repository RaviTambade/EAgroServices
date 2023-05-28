using FarmersAPI.Models;

namespace FarmersAPI.Repositories.Interfaces;

public interface IFarmerRepository
{
    Task<List<Farmer>> GetFarmers();
    Task<Farmer> GetFarmer(int farmerId);
    Task<List<FarmerCollection>> GetFarmerCollections(int farmerId);
}
