using Transflower.EAgroServices.CollectionCenters.Models;
using Transflower.EAgroServices.CollectionCenters.Entities;

namespace Transflower.EAgroServices.CollectionCenters.Repositories.Interfaces;

public interface ICollectionCenterRepository
{
    Task<List<CollectionCenter>> GetAll();
    Task<CollectionCenter?> GetById(int collectionCenterId);
    Task<bool> Insert(CollectionCenter collectionCenter);
    Task<bool> Update(CollectionCenter collectionCenter);
    Task<bool> Delete(int collectionCenterId);
    Task<int> GetCollectionCenterIdByManagerId(int managerId);
    Task<int> GetCorporateIdByCollectionCenterId(int collectionCenterId);
    Task<List<CollectionCenterCorporate>> GetCollectionCenterAndCorporateId();
}
