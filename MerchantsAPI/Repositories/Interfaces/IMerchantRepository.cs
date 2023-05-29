using System.Threading.Tasks;
using MerchantsAPI.Models;
namespace MerchantsAPI.Repositories.Interfaces;
public interface IMerchantRepository
{
     Task<List<Merchant>> GetMerchants();
     Task<Merchant> GetMerchant(int merchantId);
     Task<List<MerchantRecord>> GetMerchantSellRecords(int merchantId);

}