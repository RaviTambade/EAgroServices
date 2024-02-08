using Microsoft.AspNetCore.Mvc;
using Intranet.Services.Interfaces;
using Intranet.Entities;

namespace Intranet.Controllers;

[ApiController]
[Route("[controller]")]
public class TransporterController : ControllerBase
{
    private readonly ITransporterService _transporterService;

    public TransporterController(ITransporterService transporterService)
    {
        _transporterService = transporterService;
    }

    [HttpGet]
    public async Task<IEnumerable<Transporter>> GetTransporters()
    {
        IEnumerable<Transporter> transporters = await _transporterService.FindAll();
        return transporters;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<Transporter> GetTransporterById(int id)
    {
        Transporter transporter = await _transporterService.FindById(id);
        return transporter;
    }

    [HttpPost]
    [Route("Add")]
    public async Task Add(Transporter transporter)
    {
        await _transporterService.Add(transporter);
    }

    [HttpPut]
    [Route("Update")]
    public async Task Update(Transporter transporter)
    {
        await _transporterService.Update(transporter);
    }

    [HttpDelete]
    [Route("Delete")]
    public async Task Delete(int id)
    {
        await _transporterService.Delete(id);
    }
}
