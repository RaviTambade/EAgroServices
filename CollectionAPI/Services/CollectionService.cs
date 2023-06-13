using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
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

    public async Task<bool> Delete(int collectionId)
    {
        return await _repo.Delete(collectionId);
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

    public async Task<bool> Update(int collectionId, Collection collection)
    {
        return await _repo.Update(collectionId, collection);
    }

    public async Task<List<CollectionViewModel>> GetCollections(StartDateFilter startDate)
    {
        return await _repo.GetCollections(startDate);
    }

    public async Task<Collection> GetCollection(int collectionId)=>await _repo.GetCollection(collectionId);
}
