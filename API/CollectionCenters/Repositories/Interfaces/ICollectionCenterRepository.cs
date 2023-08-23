using CollectionCenters.Models;
using CollectionCenters.Entities;


namespace CollectionCenters.Repositories.Interfaces
{
    public interface ICollectionCenterRepository
    {
        Task<List<CollectionCenter>> GetAll();
        Task<CollectionCenter?> GetById(int collectionCenterId);
        Task<bool> Insert(CollectionCenter collectionCenter);
        Task<bool> Update(CollectionCenter collectionCenter);
        Task<bool> Delete(int collectionCenterId);
        Task<int> GetCollectionCenterIdByInspectorId(int inspectorId);
        Task<int> GetCorporateIdByCollectionCenterId(int collectionCenterId);
        Task<List<CollectionCenterCorporate>> GetCollectionCenterAndCorporateId();
    }
}
