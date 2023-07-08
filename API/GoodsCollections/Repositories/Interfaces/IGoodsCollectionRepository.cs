
using GoodsCollections.Models;

namespace GoodsCollections.Repositories.Interfaces
{
    public interface IGoodsCollectionRepository
    {
         Task<List<GoodsCollection>> GetAll(int collectionCenterId);
         Task<GoodsCollection> GetById(int collectionId);
         Task<bool> Insert(GoodsCollection collection);
        Task<bool> Update(GoodsCollection collection);
        Task<bool> Delete(int collectionId);
    }
}