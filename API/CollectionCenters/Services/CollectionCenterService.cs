using Transflower.EAgroServices.CollectionCenters.Services.Interfaces;
using Transflower.EAgroServices.CollectionCenters.Repositories.Interfaces;
using Transflower.EAgroServices.CollectionCenters.Models;
using Transflower.EAgroServices.CollectionCenters.Entities;

namespace Transflower.EAgroServices.CollectionCenters.Services;

public class CollectionCenterService : ICollectionCenterService
{
    private readonly ICollectionCenterRepository _repository;

    public CollectionCenterService(ICollectionCenterRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<CollectionCenter>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task<CollectionCenter?> GetById(int collectionCenterId)
    {
        return await _repository.GetById(collectionCenterId);
    }

    public async Task<bool> Insert(CollectionCenter collectionCenter)
    {
        return await _repository.Insert(collectionCenter);
    }

    public async Task<bool> Update(CollectionCenter collectionCenter)
    {
        return await _repository.Update(collectionCenter);
    }

    public async Task<bool> Delete(int collectionCenterId)
    {
        return await _repository.Delete(collectionCenterId);
    }

    public async Task<int> GetCollectionCenterIdByManagerId(int managerId)
    {
        return await _repository.GetCollectionCenterIdByManagerId(managerId);
    }

    public async Task<List<CollectionCenterCorporate>> GetCollectionCenterAndCorporateId()
    {
        return await _repository.GetCollectionCenterAndCorporateId();
    }

    public async Task<int> GetCorporateIdByCollectionCenterId(int collectionCenterId)
    {
        return await _repository.GetCorporateIdByCollectionCenterId(collectionCenterId);
    }
}
