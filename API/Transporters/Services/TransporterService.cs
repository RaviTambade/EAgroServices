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

        public async Task<Transporter> GetById(int transporterId)
        {
            return await _repo.GetById(transporterId);
        }

        public async Task<bool> Insert(Transporter transporter)
        {
            return await _repo.Insert(transporter);
        }

        public async Task<bool> Update(Transporter transporter)
        {
            return await _repo.Update(transporter);
        }

        public async Task<bool> Delete(int transporterId)
        {
            return await _repo.Delete(transporterId);
        }
    }
}
