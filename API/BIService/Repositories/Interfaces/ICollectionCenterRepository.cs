
using BIService.Models;

namespace BIService.Repositories.Interfaces
{
    public interface ICollectionCenterRepository
    {
        // Task<IEnumerable<IRevenueModel>> GetMonthRevenues(int collectionCenterId,RevenueType revenueType);
        Task<IEnumerable<IRevenueModel>> GetMonthRevenues(int collectionCenterId);
        // Task<List<MonthOrderCount>> GetMonthOrders(int collectionCenterId);
        // Task<List<CropRevenue>> GetCropRevenues(int collectionCenterId);
    }
}