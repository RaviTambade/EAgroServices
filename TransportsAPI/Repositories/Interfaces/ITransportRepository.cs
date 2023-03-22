using TransportsAPI.Models;

namespace TransportsAPI.Repositories.Interfaces;
public interface ITransportRepository
{

    List<Transport> GetAllTransports();

    Transport GetTransportById(string id);

    bool InsertTransport(Transport transport);

    bool UpdateTransport(Transport transport);

     bool DeleteTransport(string id);

}