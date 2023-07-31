using Transporters.Models;

namespace Transporters.Repositories.Interfaces
{
    public interface ITransporterRepository
    {
        Task<List<Transporter>> GetAll();
        Task<Transporter> GetById(int transporterId);
        Task<int> GetTransporterId(int managerId);
        Task<int> GetCorporateIdOfTransporter(int transporterId);
        Task<List<VehicleRevenue>> GetVehicleRevenues(int transporterId);
        Task<List<TransporterRevenue>> GetTransporterRevenues(int transporterId);
        Task<bool> Insert(Transporter transporter);
        Task<bool> Update(Transporter transporter);
        Task<bool> Delete(int transporterId);
        Task<List<Vehicle>> GetTransportersVehicles(int transporterId);
    }
}
