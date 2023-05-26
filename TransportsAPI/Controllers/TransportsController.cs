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

    [HttpGet]
    public async Task<IEnumerable<Transport>> GetAll()
    {
        return await _service.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<Transport> GetById(int id)
    {
        return await _service.GetById(id);
    }

    [HttpPost]
    public async Task<bool> Insert([FromBody] UserTransportRole userTransportRole)
    {
        User user = userTransportRole.user;
        Transport transport = userTransportRole.transport;
        UserRole userRole = userTransportRole.userRole;

        return await _service.Insert(user, transport, userRole);
    }

    [HttpPut("{id}")]
    public async Task<bool> Update(int id, [FromBody] Transport transport)
    {
        return await _service.Update(id, transport);
    }

    [HttpDelete("{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);
    }

    [HttpGet("{id}/history")] //for list print
    public async Task<List<TransportFareDetails>> TransportHistory(int id)
    {
        return await _service.TransportHistory(id);
    }

    [HttpGet("{id}/monthhistory")] //for column chart
    public async Task<List<TransportTruckHistory>> TransportTruckHistoryByMonth(int id)
    {
        return await _service.TransportTruckHistoryByMonth(id);
    }

    [HttpGet("{id}/yearhistory")] //for pie chart
    public async Task<List<TransportTruckHistory>> TransportTruckHistoryByYear(int id)
    {
        return await _service.TransportTruckHistoryByYear(id);
    }

    [HttpGet("{id}/trucks")] //all trucks of a transport
    public async Task<List<Truck>> TransportTrucks(int id)
    {
        return await _service.GetTransportsTrucks(id);
    }

    [HttpGet("{id}/truckordersmonth")]
    public async Task<List<TransportOrderCount>> TransportTruckOrdersPerMonth(int id)
    {
        return await _service.TransportTruckOrdersPerMonth(id);
    }
}
