using Transporters.Services.Interfaces;
using Transporters.Repositories.Interfaces;
using Transporters.Models;

namespace Transporters.Services
{
    public class TransporterService : ITransporterService
    {
        private readonly ITransporterRepository _repo;

        public TransporterService(ITransporterRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<Transporter>> GetAll()
        {
            return await _repo.GetAll();
        }
    }
}
