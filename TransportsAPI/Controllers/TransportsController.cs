using Microsoft.AspNetCore.Mvc;
using TransportsAPI.Models;
using TransportsAPI.Services.Interfaces;
namespace TransportsAPI.Controller;

[ApiController]
[Route("/api/[controller]")]
public class TransportsController : ControllerBase
{
    private readonly ITransportService _service;
    public TransportsController(ITransportService service)
    {
        this._service = service;
    }

    [HttpGet("alltransports")]
    public async Task<IEnumerable<Transport>> GetAllTransports()
    {
        return await _service.GetAllTransports();
    }

    [HttpGet("{id}")]
    public async Task<Transport> GetById(int id)
    {
        return await _service.GetTransportById(id);
    }


    [HttpPost("add")]
    public async Task<bool> InsertTransport([FromBody] Transport transport)
    {
        return await _service.InsertTransport(transport);
    }


    [HttpPut("update/{id}")]
    public async Task<bool> UpdateDepartment(int id, [FromBody] Transport transport)
    {
        return await _service.UpdateTransport(id, transport);
    }

    [HttpDelete("delete/{id}")]
    public async Task<bool> DeleteTransport(int id)
    {
        return await _service.DeleteTransport(id);
    }
}