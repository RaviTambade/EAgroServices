using RateApi.Models;
namespace RateApi.Repositories;
public interface IRateRepository
{
    Task<List<Rate>> GetAllRates();
    Task<Rate> GetById(int rateId);
    Task<bool> Insert(Rate rate);

    Task<bool> Update(int rateId,Rate rate);
    Task<bool> Delete(int rateId);
   // Task<VarietyRate> VarietyRates();


}