using Transflower.EAgroservice.Models;

namespace Transflower.EAgroservice.Repositories.Interface
{

    public interface IGoodsCollectionRepository{ 
        public Task<int> GetTotalEntriesForFarmer(int id);

        public  Task<int> GetTotalEntriesForFarmerOnSpecificDate(int id, string collectionDate);

    
       public Task<int> GetTotalEntriesBeetweenDates(int id, DateOnly startDate, DateOnly endDate);
      // public Task<int> RevenueChart(int id, int year,string mode);
       public Task<int> GetTotalEntriesForCollectionCenter(int id);

       public  Task<int> GetTotalEntriesForCollectiionOnSpecificDate(int id,string collectionDate);

       public Task<int> GetTotalEntriesForCollectiionBeetweenDate(int id, DateOnly startDate, DateOnly endDate);
       public Task<int> GetTotalFarmerRevenue(int id);
       public Task<List<TotalCropQuantity>>TotalCropsQuantity(int collectionCenterId,string currentDate);
       public  Task<int> GetTotalShipmentByVehicleRTONumber(string rtoNumber);
       public  Task<int> GetCollectionCenterShipment(int collectionCenterId);




    }

    
}