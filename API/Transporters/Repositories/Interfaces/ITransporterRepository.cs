using Transflower.EAgroServices.Transporters.Entities;
using Transflower.EAgroServices.Transporters.Models;

namespace Transflower.EAgroServices.Transporters.Repositories.Interfaces
{
    public interface ITransporterRepository
    {
        Task<List<Transporter>> GetAll();
        Task<Transporter?> GetById(int transporterId);
        Task<int> GetTransporterId(int managerId);
        Task<int> GetCorporateIdOfTransporter(int transporterId);
        Task<bool> Insert(Transporter transporter);
        Task<bool> Update(Transporter transporter);
        Task<bool> Delete(int transporterId);
        Task<List<TransporterCorporate>> GetTransporterAndCorporateId();
        Task<List<Vehicle>> GetTransportersVehicles(int transporterId);
        Task<List<TransporterInvoice>> GetTransporterInvoices(
            int transporterId,
            string paymentStatus
        );
    }
}
