using Transflower.EAgroServices.Transporters.Models;
using Transflower.EAgroServices.Transporters.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Transflower.EAgroServices.Transporters.Entities;

namespace  Transflower.EAgroServices.Transporters.Controllers;

[ApiController]
[Route("/api/transporters")]
public class TransporterController : ControllerBase
{
    private readonly ITransporterService _service;

    public TransporterController(ITransporterService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<List<Transporter>> GetAll()
    {
        return await _service.GetAll();
    }

    [HttpGet("{transporterId}")]
    public async Task<Transporter?> GetById(int transporterId)
    {
        return await _service.GetById(transporterId);
    }

    [HttpPost]
    public async Task<bool> Insert(Transporter transporter)
    {
        return await _service.Insert(transporter);
    }

    [HttpPut]
    public async Task<bool> Update(Transporter transporter)
    {
        return await _service.Update(transporter);
    }

    [HttpDelete("{transporterId}")]
    public async Task<bool> Delete(int transporterId)
    {
        return await _service.Delete(transporterId);
    }

    [HttpGet("{transporterId}/vehicles")]
    public async Task<List<Vehicle>> GetTransportersVehicles(int transporterId)
    {
        return await _service.GetTransportersVehicles(transporterId);
    }

    [HttpGet("manager/{managerId}")]
    public async Task<int> GetTransporterId(int managerId)
    {
        return await _service.GetTransporterId(managerId);
    }

    [HttpGet("transporterandcorporateid")]
    public async Task<List<TransporterCorporate>> GetTransporterAndCorporateId()
    {
        return await _service.GetTransporterAndCorporateId();
    }

    [HttpGet("corporateid/{transporterId}")]
    public async Task<int> GetCorporateIdOfTransporter(int transporterId)
    {
        return await _service.GetCorporateIdOfTransporter(transporterId);
    }

    [HttpGet("{transporterId}/invoices/{paymentStatus}")]
    public Task<List<TransporterInvoice>> GetTransporterInvoices(
        int transporterId,
        string paymentStatus
    )
    {
        return _service.GetTransporterInvoices(transporterId, paymentStatus);
    }
}
