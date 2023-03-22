

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

    public List<Transport> GetAllTransports()
    {
        return _repository.GetAllTransports();
    }



    public Transport GetTransportById(string id)
    {
        return _repository.GetTransportById(id);
    }

    public bool InsertTransport(Transport transport)
    {
        return _repository.InsertTransport(transport);
    }

    public bool UpdateTransport(Transport transport)
    {
        return _repository.UpdateTransport(transport);
    }

    public bool DeleteTransport(string id)
    {
        return _repository.DeleteTransport(id);
    }
}