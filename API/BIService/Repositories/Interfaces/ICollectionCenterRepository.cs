
using BIService.Models;

namespace BIService.Repositories.Interfaces
{
    public interface ICollectionCenterRepository
    {
        Task<List<IRevenueModel>> GetRevenuesByType(int collectionCenterId, RevenueType revenueType,
            int forYear );
        // Task<List<MonthOrderCount>> GetMonthOrders(int collectionCenterId);
        // Task<List<CropRevenue>> GetCropRevenues(int collectionCenterId);
    }
}