using System.Collections.Generic;
using System.Threading.Tasks;
using FarmersAPI.Models;

namespace FarmersAPI.Repositories.Interfaces;

public interface IFarmerRepository
{
    Task<List<Farmer>> GetFarmers();
    Task<Farmer> GetFarmer(int farmerId);
    Task<List<FarmerCollection>> GetFarmerCollections(int farmerId);
    Task<List<FarmerCollectionPerMonth>> GetFarmerCollectionAmountByMonth(int farmerId);
    Task<List<FarmerCollectionByCrop>> GetFarmerCollectionAmountByCrop(int farmerId);
    Task<List<FarmerCollection>> GetFarmerCollectionsBetweenDates(int farmerId,DateFilter dateFilter);
    Task<List<FarmerCollection>> GetFarmerCollectionByCrop(int farmerId, int cropId);
    Task<int> GetFarmerId(string farmerName);
    Task<List<string>> GetFilteredFarmers(Address address);

}
