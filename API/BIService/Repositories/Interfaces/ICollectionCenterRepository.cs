
using BIService.Models;

namespace BIService.Repositories.Interfaces
{
    public interface ICollectionCenterRepository
    {
        Task<List<MonthRevenue>> GetMonthRevenues(int collectionCenterId);
        Task<List<MonthOrderCount>> GetMonthOrders(int collectionCenterId);
        Task<List<CropRevenue>> GetCropRevenues(int collectionCenterId);
    }
}