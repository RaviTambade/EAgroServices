using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using CollectionAPI.Models;

namespace CollectionAPI.Repositories.Interfaces;

public interface ICollectionRepository
{
    Task<List<CollectionBillingRecord>> GetCollectionBillingRecords();

    Task<CollectionBill> GetCollectionBill(int collectionId);

    Task<SellViewModel> GetCollectionSell(int CollectionId);
    Task<List<CollectionViewModel>> GetCollections(StartDateFilter startDate);
    Task<List<CollectionViewModel>> GetCollectionsByContainer(int farmerId,string container);
    Task<CollectionViewModel> GetCollection(int collectionId);
    Task<CollectionBillingRecord> GetCollectionBillingRecord(int collectionId);
    Task<bool> Insert(Collection collection);
    Task<bool> Update(int collectionId, Collection collection);
    Task<bool> Delete(int collectionId);

    Task<List<LabourRate>> GetContainers();

    Task<int> GetFarmer(int collectionId);

    // Task<List<Collection>> GetCollections();
}
