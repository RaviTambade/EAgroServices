using VerifiedGoodsCollections.Models;
namespace VerifiedGoodsCollections.Repositories.Interfaces;
public interface IVerifiedCollectionRepository{
    Task<List<VerifiedCollection>> GetAll();
    Task<VerifiedCollection> GetVerifiedCollection(int verifiedCollectionId);
    Task<List<string>> GetGrades();
    Task<bool> Insert(VerifiedCollection verifiedCollection);
    Task<List<string>> GetContinerTypes();
    Task<bool> Update(int verifiedCollectionId,VerifiedCollection verifiedCollection);
    Task<bool> Delete(int verifiedCollectionId);
}