using Transflower.EAgroServices.Transporters.Services.Interfaces;
using Transflower.EAgroServices.Transporters.Repositories.Interfaces;
using Transflower.EAgroServices.Transporters.Models;
using Transflower.EAgroServices.Transporters.Entities;

namespace Transflower.EAgroServices.Transporters.Services;

public class TransporterService : ITransporterService
{
    private readonly ITransporterRepository _repository;

    public TransporterService(ITransporterRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Transporter>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task<Transporter?> GetById(int transporterId)
    {
        return await _repository.GetById(transporterId);
    }

    public async Task<bool> Insert(Transporter transporter)
    {
        return await _repository.Insert(transporter);
    }

    public async Task<bool> Update(Transporter transporter)
    {
        return await _repository.Update(transporter);
    }

    public async Task<bool> Delete(int transporterId)
    {
        return await _repository.Delete(transporterId);
    }

    public async Task<List<Vehicle>> GetTransportersVehicles(int transporterId)
    {
        return await _repository.GetTransportersVehicles(transporterId);
    }

    public async Task<int> GetTransporterId(int managerId)
    {
        return await _repository.GetTransporterId(managerId);
    }

    public async Task<List<TransporterCorporate>> GetTransporterAndCorporateId()
    {
        return await _repository.GetTransporterAndCorporateId();
    }

    public async Task<int> GetCorporateIdOfTransporter(int transporterId)
    {
        return await _repository.GetCorporateIdOfTransporter(transporterId);
    }

    public Task<List<TransporterInvoice>> GetTransporterInvoices(
        int transporterId,
        string paymentStatus
    )
    {
        return _repository.GetTransporterInvoices(transporterId, paymentStatus);
    }
}
