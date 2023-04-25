using BillingAPI.Models;
using BillingAPI.Services.Interfaces;
using BillingAPI.Repositories.Interfaces;

namespace BillingAPI.Services;
public class FarmerBillingService : IFarmerBillingService
{
    private readonly IFarmerBillingRepository _repo;

    public FarmerBillingService(IFarmerBillingRepository repo)
    {
        _repo = repo;
    }
    public List<FarmerBill> GetAllFarmerBills()
    {
        return _repo.GetAllFarmerBills();
    }
}