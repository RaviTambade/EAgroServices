using Transflower.EAgroServices.Farmers.Services.Interfaces;
using Transflower.EAgroServices.Farmers.Repositories.Interfaces;
using Transflower.EAgroServices.Farmers.Models;
namespace Transflower.EAgroServices.Farmers.Services;
public class GoodsCollectionService : IGoodsCollectionService
{
    private readonly IFarmersCollectionRepository _repository;

    public GoodsCollectionService(IFarmersCollectionRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<FarmerCollection>> FarmerCollection(int farmerId)
    {
        return await _repository.FarmerCollection(farmerId);
    }

    public async Task<List<FarmerCollection>> GetVerifiedCollection(
        int farmerId,
        string paymentStatus
    )
    {
        return await _repository.GetVerifiedCollection(farmerId, paymentStatus);
    }

    public async Task<List<FarmerCollection>> VerifiedCollection(int farmerId)
    {
        return await _repository.VerifiedCollection(farmerId);
    }

    public async Task<List<FarmerCollection>> GetUnverifiedCollectionsOfFarmer(int farmerId)
    {
        return await _repository.GetUnverifiedCollectionsOfFarmer(farmerId);
    }

    public async Task<List<Revenue>> MonthlyRevenue(int farmerId)
    {
        return await _repository.MonthlyRevenue(farmerId);
    }

    public async Task<List<Revenue>> YearRevenue(int farmerId)
    {
        return await _repository.YearRevenue(farmerId);
    }

    public async Task<List<CropRevenue>> CropRevenue(int farmerId)
    {
        return await _repository.CropRevenue(farmerId);
    }

      public async Task<List<CollectionList>> CollectionList(int farmerId)
    {
        return await _repository.CollectionList(farmerId);
    }

    public async Task<FarmerCollection> CollectionDetails(int collectionId)
    {
        return await _repository.CollectionDetails(collectionId);
    }
}

