using VendorsAPI.Models;

namespace VendorsAPI.Repositories.Interfaces;

public interface IVendorRepository
{
    Task<List<Vendor>> GetAll();

    Task<Vendor> GetById(int VendorId);
    Task<List<Vehicle>> GetVendorsVehicles(int VendorId);
    Task<List<VendorsFareDetails>> VendorHistory(int VendorId);

    Task<List<VendorsVehicleHistory>> VendorVehicleHistoryByMonth(int VendorId);

    Task<List<VendorsVehicleHistory>> VendorVehicleHistoryByYear(int VendorId);
    
    Task<List<VendorOrderCount>> VendorVehicleOrdersPerMonth(int VendorId);
}
