using System.Threading.Tasks;
using MerchantsAPI.Models;
namespace MerchantsAPI.Repositories.Interfaces;
public interface IMerchantRepository
{
     Task<List<Merchant>> GetAll();
     Task<Merchant> GetById(int merchantId);

}