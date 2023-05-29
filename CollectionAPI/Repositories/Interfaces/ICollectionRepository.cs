using CollectionAPI.Models;

namespace CollectionAPI.Repositories.Interfaces;

public interface ICollectionRepository
{
    Task<List<CollectionBillingRecord>> GetCollectionBillingRecords();
    Task<CollectionBillingRecord> GetCollectionBillingRecord(int collectionId);
    Task<bool> Insert(Collection collection);


}
