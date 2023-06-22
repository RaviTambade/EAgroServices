using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VendorsAPI.Models;
using VendorsAPI.Services.Interfaces;

namespace VendorsAPI.Controller;

[ApiController]
[Route("/api/[controller]")]
public class VendorsController : ControllerBase
{
    private readonly IVendorService _service;

    public VendorsController(IVendorService service)
    {
        this._service = service;
    }

    [HttpGet]
    public async Task<IEnumerable<Vendor>> GetAll()
    {
        return await _service.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<Transport> GetById(int id)
    {
        return await _service.GetById(id);
    }

    [HttpGet("{id}/history")] //for list print
    public async Task<List<VendorsFareDetails>> VendorHistory(int id)
    {
        return await _service.VendorHistory(id);
    }

    [HttpGet("{id}/monthhistory")] //for column chart
    public async Task<List<VendorsVehicleHistory>> VendorVehicleHistoryByMonth(int id)
    {
        return await _service.VendorVehicleHistoryByMonth(id);
    }

    [HttpGet("{id}/yearhistory")] //for pie chart
    public async Task<List<VendorsVehicleHistory>> VendorVehicleHistoryByYear(int id)
    {
        return await _service.VendorVehicleHistoryByYear(id);
    }

    [HttpGet("{id}/Vehicles")] //all Vehicles of a Vendor
    public async Task<List<Vehicle>> GetVendorVehicles(int id)
    {
        return await _service.GetVendorsVehicles(id);
    }

    [HttpGet("{id}/Vehicleordersmonth")]
    public async Task<List<VendorOrderCount>> VendorVehicleOrdersPerMonth(int id)
    {
        return await _service.VendorVehicleOrdersPerMonth(id);
    }

    [HttpPut("{vendorId}")]
    public async Task<bool> Update(int vendorId, Vendor vendor)
    {
        System.Console.WriteLine(vendorId);
        System.Console.WriteLine(vendor.CompanyName);
        System.Console.WriteLine(vendor.TransportId);
        return await _service.Update(vendorId, vendor);
    }

    [HttpDelete("{vendorId}")]
    public async Task<bool> Delete(int vendorId)
    {
        return await _service.Delete(vendorId);
    }
    [HttpGet("{id}/sell")]
    public async Task<List<SellTransport>> GetSellTransport(int id)
    {
        return await _service.GetSellTransports(id);
    }
}
