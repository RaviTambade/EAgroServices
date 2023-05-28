using FarmersAPI.Models;

namespace FarmersAPI.Repositories.Interfaces;

public interface IFarmerRepository
{
    Task<List<Farmer>> GetFarmers();
    Task<Farmer> GetFarmer(int farmerId);
    Task<List<FarmerCollection>> GetFarmerCollections(int farmerId);
    Task<List<FarmerCollectionPerMonth>> GetFarmerCollectionAmountByMonth(int farmerId);
    Task<List<FarmerCollectionByCrop>> GetFarmerCollectionAmountByCrop(int farmerId);

}
