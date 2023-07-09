using Shipments.Models;

namespace Shipments.Repositories.Interfaces
{
    public interface IShipmentRepository
    {
        Task<List<Shipment>> GetAll();
        Task<Shipment> GetById(int shipmentId);
        Task<bool> Insert(Shipment shipment);
        Task<bool> Update(Shipment shipment);
        Task<bool> Delete(int shipmentId);
    }
}
