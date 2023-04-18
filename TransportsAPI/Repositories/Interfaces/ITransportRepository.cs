using TransportsAPI.Models;

namespace TransportsAPI.Repositories.Interfaces;
public interface ITransportRepository
{

    Task<List<Transport>> GetAllTransports();

    Task<Transport> GetTransportById(int transportId);

    Task<bool> InsertTransport(Transport transport);

    Task<bool> UpdateTransport(int transportId,Transport transport);

     Task<bool> DeleteTransport(int transportId);

}