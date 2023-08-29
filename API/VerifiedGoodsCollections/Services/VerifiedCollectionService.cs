using Transflower.VerifiedGoodsCollections.Models;
using Transflower.VerifiedGoodsCollections.Repositories.Interfaces;
using Transflower.VerifiedGoodsCollections.Services.Interfaces;

namespace Transflower.VerifiedGoodsCollections.Services;

public class VerifiedCollectionService : IVerifiedCollectionService
{
    private readonly IVerifiedCollectionRepository _repository;

    public VerifiedCollectionService(IVerifiedCollectionRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<VerifiedCollection>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task<VerifiedCollection> GetVerifiedCollection(int verifiedCollectionId)
    {
        return await _repository.GetVerifiedCollection(verifiedCollectionId);
    }

    public async Task<bool> Insert(VerifiedCollection verifiedCollection)
    {
        return await _repository.Insert(verifiedCollection);
    }

    public async Task<List<string>> GetGrades()
    {
        return await _repository.GetGrades();
    }

    public async Task<List<string>> GetContinerTypes()
    {
        return await _repository.GetContinerTypes();
    }

    public async Task<bool> Update(int verifiedCollectionId, VerifiedCollection verifiedCollection)
    {
        return await _repository.Update(verifiedCollectionId, verifiedCollection);
    }

    public async Task<bool> Delete(int verifiedCollectionId)
    {
        return await _repository.Delete(verifiedCollectionId);
    }
}
