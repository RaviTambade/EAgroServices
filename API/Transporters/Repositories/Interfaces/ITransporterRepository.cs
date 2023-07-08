using Transporters.Models;

namespace Transporters.Repositories.Interfaces
{
    public interface ITransporterRepository
    {
        Task<List<Transporter>> GetAll();
        Task<Transporter> GetById(int transporterId);
        Task<bool> Insert(Transporter transporter);
        Task<bool> Update(Transporter transporter);
        Task<bool> Delete(int transporterId);
    }
}
