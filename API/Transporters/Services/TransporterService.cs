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
         public async Task<List<Vehicle>> GetTransportersVehicles(int transporterId)
        {
            return await _repo.GetTransportersVehicles(transporterId);
        }

        public async Task<int> GetTransporterId(int managerId)
        {
            return await _repo.GetTransporterId(managerId);
        }

        public async Task<int> GetCorporateIdOfTransporter(int transporterId)
        {
            return await _repo.GetCorporateIdOfTransporter(transporterId);
        }
        public async Task<List<VehicleRevenue>> GetVehicleRevenues(int transporterId)
        {
            return await _repo.GetVehicleRevenues(transporterId);
        }
        public async Task<List<TransporterRevenue>> GetTransporterRevenues(int transporterId)
        {
            return await _repo.GetTransporterRevenues(transporterId);
        }

        public Task<List<ShipmentCount>> GetShipmentCounts(int transporterId)
        {
            return _repo.GetShipmentCounts(transporterId);
        }
    }
}
