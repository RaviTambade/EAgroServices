using TransportsAPI.Models;
namespace TransportsAPI.Repositories.Interfaces;
public interface ITransportRepository
{
    Task<List<Transport>> GetAll();

    Task<Transport> GetById(int transportId);

    Task<bool> Insert(User user,Transport transport,UserRole userRole);

    Task<bool> Update(int transportId,Transport transport);

    Task<bool> Delete(int transportId);

    Task<List<SellBilling>> TransportHistory(int transportId);
    Task<List<TransportTruckHistory>> TransportTruckHistoryByMonth(int transportId);

}