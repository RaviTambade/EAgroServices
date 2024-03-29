using Transflower.EAgroServices.GoodsCollections.Models;
using Transflower.EAgroServices.GoodsCollections.Extensions;
using Transflower.EAgroServices.GoodsCollections.Entities;

namespace Transflower.EAgroServices.GoodsCollections.Repositories.Interfaces;

public interface IGoodsCollectionRepository
{
    Task<PagedList<VerifiedCollectionDetail>> GetVerifiedCollections(
        int collectionCenterId,
        FilterRequest request,
        int pageNumber
    );
    Task<PagedList<Collection>> GetCollections(
        int collectionCenterId,
        FilterRequest request,
        int pageNumber,
        string type
    );
     Task<List<CollectionList>> GetCollectionList(
        int collectionCenterId,
        // FilterRequest request,
        // int pageNumber,
         string type
    );
    Task<GoodsCollection?> GetById(int collectionId);
    Task<bool> Insert(GoodsCollection collection);
    Task<List<string?>> GetContainerTypes();

    Task<List<FarmerCollection>> GetVerifiedCollection(int farmerId);

    Task<bool> Update(GoodsCollection collection);
    Task<bool> Delete(int collectionId);
    Task<List<FarmerCollection>> FarmerCollection(int farmerId);
    Task<List<FarmerCollection>> GetUnverifiedCollectionsOfFarmer(int farmerId);
    Task<VerifiedCollectionDetail> GetVerifiedCollectionDetail(int collectionId);
    Task<List<CollectionList>> GetVerifiedCollectionList(int collectionCenterId);


  Task<List<CollectionList>> GetCollections(
        int farmerid,
        string type
    );

    
}
