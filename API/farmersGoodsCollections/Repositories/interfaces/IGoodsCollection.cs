using Transflower.EAgroservice.Models;

namespace Transflower.EAgroservice.Repositories.Interface
{

    public interface IGoodsCollectionRepository{ 
        public Task<int> GetTotalEntriesForFarmer(int id);

        public  Task<int> GetTotalEntriesForFarmerOnSpecificDate(int id, string collectionDate);

    
       public Task<int> GetTotalEntriesBeetweenDates(int id, DateOnly startDate, DateOnly endDate);
      // public Task<int> RevenueChart(int id, int year,string mode);
    }
}