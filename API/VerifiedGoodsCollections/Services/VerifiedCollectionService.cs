using Transflower.VerifiedGoodsCollections.Models;
using Transflower.VerifiedGoodsCollections.Repositories.Interfaces;
using Transflower.VerifiedGoodsCollections.Services.Interfaces;

namespace Transflower.VerifiedGoodsCollections.Services;

public class VerifiedCollectionService : IVerifiedCollectionService
{
    private readonly IVerifiedCollectionRepository _repo;

    public VerifiedCollectionService(IVerifiedCollectionRepository repo)
    {
        _repo = repo;
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

    public async Task<List<string>> GetGrades()
    {
        return await _repo.GetGrades();
    }

    public async Task<List<string>> GetContinerTypes()
    {
        return await _repo.GetContinerTypes();
    }

    public async Task<bool> Update(int verifiedCollectionId, VerifiedCollection verifiedCollection)
    {
        return await _repo.Update(verifiedCollectionId, verifiedCollection);
    }

    public async Task<bool> Delete(int verifiedCollectionId)
    {
        return await _repo.Delete(verifiedCollectionId);
    }
}
