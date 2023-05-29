using TransportsAPI.Models;
using TransportsAPI.Repositories.Interfaces;
using TransportsAPI.Services.Interfaces;
namespace TransportsAPI.Services;
public class TransportService : ITransportService
{
    private readonly ITransportRepository _repository;

    public TransportService(ITransportRepository repository)
    {
        this._repository = repository;
    }

    public async Task<List<Transport>> GetAll()
    {
        return await _repository.GetAll();
    }
    public async Task<Transport> GetById(int transportId)
    {
        return await _repository.GetById(transportId);
    }
    public async Task<bool> Insert(User user, Transport transport, UserRole userRole)
    {
        return await _repository.Insert(user, transport, userRole);
    }
    public async Task<bool> Update(int transportId, Transport transport)
    {
        return await _repository.Update(transportId, transport);
    }
    public async Task<bool> Delete(int transportId)
    {
        return await _repository.Delete(transportId); ;
    }

    public async Task<List<TransportFareDetails>> TransportHistory(int transportId)
    {
        return await _repository.TransportHistory(transportId);
    }

    public async Task<List<TransportTruckHistory>> TransportTruckHistoryByMonth(int transportId)
    { 
        return await _repository.TransportTruckHistoryByMonth(transportId);
    }

    public async Task<List<TransportTruckHistory>> TransportTruckHistoryByYear(int transportId)
    {
        return await _repository.TransportTruckHistoryByYear(transportId);
    }

    public async Task<List<Truck>> GetTransportsTrucks(int transportId)
    {
        return await _repository.GetTransportsTrucks(transportId);
    }

    public async Task<List<TransportOrderCount>> TransportTruckOrdersPerMonth(int transportId)

    {
        return await _repository.TransportTruckOrdersPerMonth(transportId);
    }
}