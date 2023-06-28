using System.Collections.Generic;
using System.Threading.Tasks;
using VendorsAPI.Models;
using VendorsAPI.Repositories.Interfaces;
using VendorsAPI.Services.Interfaces;
namespace VendorsAPI.Services;
public class VendorsService : IVendorService
{
    private readonly IVendorRepository _repository;

    public VendorsService(IVendorRepository repository)
    {
        this._repository = repository;
    }

    public async Task<List<Vendor>> GetAll()
    {
        return await _repository.GetAll();
    }
    public async Task<Transport> GetById(int transportId)
    {
        return await _repository.GetById(transportId);
    }
    public async Task<List<Vehicle>> GetVendorssVehicles(int VendorsId)
    {
        return await _repository.GetVendorsVehicles(VendorsId);
    }

     public async Task<List<Vehicle>> GetVendorsVehicles(int VendorId)
    {
         return await _repository.GetVendorsVehicles(VendorId);
    }

   public async Task<List<VendorsFareDetails>> VendorHistory(int VendorId)
    {
        return await _repository.VendorHistory(VendorId);
    }

   public async Task<List<VendorsVehicleHistory>> VendorVehicleHistoryByMonth(int VendorId)
    {
         return await _repository.VendorVehicleHistoryByMonth(VendorId);

    }

  public async  Task<List<VendorsVehicleHistory>> VendorVehicleHistoryByYear(int VendorId)
    {
               return await _repository.VendorVehicleHistoryByYear(VendorId);

    }

   public async Task<List<VendorOrderCount>> VendorVehicleOrdersPerMonth(int VendorId)
    {
                return await _repository.VendorVehicleOrdersPerMonth(VendorId);

    }
    public async Task<bool> Update(int vendorId,Vendor vendor)=>await _repository.Update(vendorId,vendor);
    public async Task<bool> Delete(int vendorId )=>await _repository.Delete(vendorId);
    public async Task<List<SellTransport>> GetSellTransports(int vehicleId)=>await _repository.GetSellTransports(vehicleId);
    public async Task<List<SellTransport>> GetSellDetails(int sellId)=>await _repository.GetSellDetails(sellId);
    


}