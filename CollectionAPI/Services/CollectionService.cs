using CollectionAPI.Models;
using CollectionAPI.Repositories.Interfaces;
using CollectionAPI.Services.Interfaces;

namespace CollectionAPI.Services;

public class CollectionService : ICollectionService
{
    private readonly ICollectionRepository _repo;

    public CollectionService(ICollectionRepository repo)
    {
        _repo = repo;
    }

    public async Task<CollectionBillingRecord> GetCollectionBillingRecord(int collectionId)
    {
        return await _repo.GetCollectionBillingRecord(collectionId);
    }

    public async Task<List<CollectionBillingRecord>> GetCollectionBillingRecords()
    {
        return await _repo.GetCollectionBillingRecords();
    }

    public async Task<bool> Insert(Collection collection)
    {
        return await _repo.Insert(collection);
    }
}
