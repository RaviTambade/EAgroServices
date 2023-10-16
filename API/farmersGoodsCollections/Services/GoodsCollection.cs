
using Transflower.EAgroservice.Models;
using Transflower.EAgroservice.Repositories.Interface;
using Transflower.EAgroservice.Services.Interfaces;

namespace Transflower.EAgroservice.Services;
public class GoodsCollectionService : IGoodsCollectionService
{
    private readonly IGoodsCollectionRepository _repo;
    public GoodsCollectionService(IGoodsCollectionRepository repo)
    {
        _repo = repo;
    }

    public async Task<int> GetTotalEntriesForFarmer(int id){
        var GoodsCollections =await _repo.GetTotalEntriesForFarmer(id);
        return  GoodsCollections;
    }

    public async Task<int> GetTotalEntriesForFarmerOnSpecificDate(int id, string collectionDate)
    {
           var GoodsCollections =await _repo.GetTotalEntriesForFarmerOnSpecificDate(id,collectionDate);
        return  GoodsCollections;
    }

   public async Task<int> GetTotalEntriesBeetweenDates(int id, DateOnly startDate, DateOnly endDate){
     var GoodsCollections =await _repo.GetTotalEntriesBeetweenDates(id,startDate,endDate);
        return  GoodsCollections;

  //  }
  //    public async Task<int> RevenueChart(int id,int year, string mode){
  //    return await _repo.RevenueChart(id,year,mode);
        

    }

     public async Task<int> GetTotalEntriesForCollectionCenter(int id){
         var GoodsCollections =await _repo.GetTotalEntriesForCollectionCenter(id);
        return  GoodsCollections;
    }

    public async Task<int> GetTotalEntriesForCollectiionOnSpecificDate(int id,string collectionDate)
     {
           var GoodsCollections1 =await _repo.GetTotalEntriesForCollectiionOnSpecificDate(id,collectionDate);
        return  GoodsCollections1;
    }

     public async Task<int> GetTotalEntriesForCollectiionBeetweenDate(int id, DateOnly startDate, DateOnly endDate){
     var GoodsCollections =await _repo.GetTotalEntriesForCollectiionBeetweenDate(id,startDate,endDate);
        return  GoodsCollections;

   }

    public async  Task<int> GetTotalFarmerRevenue(int id)
    {
       return await _repo.GetTotalFarmerRevenue(id);
    }

    public async Task<List<TotalCropQuantity>> TotalCropsQuantity(int collectionCenterId,string currentDate)
    {
       return await _repo.TotalCropsQuantity(collectionCenterId,currentDate);
    }


  public  Task<int> GetTotalShipmentByVehicleRTONumber(string rtoNumber)
     {
           var GoodsCollections = _repo.GetTotalShipmentByVehicleRTONumber(rtoNumber);
        return  GoodsCollections;
    }

    public Task<int> GetCollectionCenterShipment(int collectionCenterId)
    {
        throw new NotImplementedException();
    }
}