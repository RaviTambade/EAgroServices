using CollectionCenters.Models;

namespace CollectionCenters.Repositories.Interfaces
{
    public interface ICollectionCenterRepository
    {
        Task<List<CollectionCenter>> GetAll();
        Task<CollectionCenter> GetById(int collectionCenterId);
        Task<bool> Insert(CollectionCenter collectionCenter);
        Task<bool> Update(CollectionCenter collectionCenter);
        Task<bool> Delete(int collectionCenterId);
        Task<int> GetCollectionCenterIdByInspectorId(int inspectorId);
        Task<List<CollectionCenterCorporate>> GetCollectionCenterAndCorporateId();
        Task<List<MonthRevenue>> GetMonthRevenues(int collectionCenterId);
        Task<List<MonthOrderCount>> GetMonthOrders(int collectionCenterId);
        Task<List<CropRevenue>> GetCropRevenues(int collectionCenterId);
    }
}
