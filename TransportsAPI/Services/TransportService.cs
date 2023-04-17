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

    public async Task<List<Transport>> GetAllTransports()
    {
        return await _repository.GetAllTransports();
    }

    public async Task<Transport> GetTransportById(int transportId)
    {
        return await _repository.GetTransportById(transportId);
    }

    public async Task<bool> InsertTransport(Transport transport)
    {
        return await _repository.InsertTransport(transport);
    }

    public async Task<bool> UpdateTransport(int transportId, Transport transport)
    {
        return await _repository.UpdateTransport(transportId,transport);
    }
    public async Task<bool> DeleteTransport(int transportId)
    {
        return await _repository.DeleteTransport(transportId);;
    }
}