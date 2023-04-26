using System.Reflection.Metadata;
using ConsigneesAPI.Models;
using ConsigneesAPI.Services;
using Microsoft.AspNetCore.Mvc;
namespace ConsigneesAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class ConsigneesController : ControllerBase
{
    private readonly IConsigneeService _service;
    public ConsigneesController(IConsigneeService service)
    {
        this._service = service;
    }

    [HttpGet("getallconsignees")]
    public async Task<List<Consignee>> GetConsignees()
    {
        return await _service.AllConsignee();
    }

    [HttpGet("getbyid/{id}")]
    public async Task<Consignee> GetById(int id)
    {
        return await _service.GetById(id);
    }

    [HttpPost("insert")]
    public async Task<bool> Insert([FromBody] Consignee consignee)
    {
        return await _service.Insert(consignee);
    }

    [HttpPut("update/{id}")]
    public async Task<bool> Update(int id, [FromBody] Consignee consignee)
    {
        return await _service.Update(id, consignee);
    }

    [HttpDelete("delete/{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);

    }
}
