
using Transporters.Models;

namespace Transporters.Repositories.Interfaces
{
    public interface ITransporterRepository
    {
        Task<List<Transporter>> GetAll();
    }
}