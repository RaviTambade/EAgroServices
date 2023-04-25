using System.Collections.Generic;
using BillingAPI.Models;
namespace BillingAPI.Repositories.Interfaces;
public interface IFarmerBillingRepository
{
    List<FarmerBill> GetAllFarmerBills();
    // FarmerBill GetFarmerBillById(int BillId);
    // bool CreateFarmerBill(FarmerBill farmerBill);
    // bool Update(FarmerBill farmerBill);
    // bool Delete(int BillId);

}