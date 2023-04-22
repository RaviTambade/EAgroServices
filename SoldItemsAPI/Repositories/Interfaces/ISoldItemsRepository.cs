using SoldItemsAPI.Models;
using SoldItemsAPI.Context;


namespace SoldItemsAPI.Repositories.Interfaces
{
    public interface ISoldItemsRepository
    {
        Task<IEnumerable<SoldItems>>GetSoldItemsDetails();
        Task<SoldItems>GetById(int sellId);

        Task<bool>Insert(SoldItems  soldItems);
        Task<bool>Update(int sellId,SoldItems soldItems);
        Task<bool>Delete(int sellId);
    }
}