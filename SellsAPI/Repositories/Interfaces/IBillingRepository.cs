using System.Collections.Generic;
using SellsAPI.Models;
namespace SellsAPI.Repositories.Interfaces;
public interface IBillingRepository{
    Task<bool> Insert(Billing billing);
}