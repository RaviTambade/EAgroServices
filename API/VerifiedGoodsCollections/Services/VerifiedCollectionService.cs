using VerifiedGoodsCollections.Models;
using VerifiedGoodsCollections.Repositories.Interfaces;
using VerifiedGoodsCollections.Services.Interfaces;
namespace VerifiedGoodsCollections.Services;
public class VerifiedCollectionService : IVerifiedCollectionService
{
    private readonly IVerifiedCollectionRepository _repo;
    public VerifiedCollectionService(IVerifiedCollectionRepository repo){
        _repo=repo;
    }
    public async Task<List<VerifiedCollection>> GetAll()
    {
       return await _repo.GetAll();
    }

    public async Task<VerifiedCollection> GetVerifiedCollection(int verifiedCollectionId)
    {
    return await _repo.GetVerifiedCollection(verifiedCollectionId);
    }

    public async Task<bool> Insert(VerifiedCollection verifiedCollection)
    {
        return await _repo.Insert(verifiedCollection);
    }

    public async Task<bool> Update(int verifiedCollectionId, VerifiedCollection verifiedCollection)
    {
       return await _repo.Update(verifiedCollectionId,verifiedCollection);
    }
      public async Task<bool> Delete(int verifiedCollectionId)
    {
    return await _repo.Delete(verifiedCollectionId);
    }

}