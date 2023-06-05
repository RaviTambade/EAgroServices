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
    public async Task<Vendor> GetById(int VendorsId)
    {
        return await _repository.GetById(VendorsId);
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
}