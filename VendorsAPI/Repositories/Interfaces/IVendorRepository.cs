using VendorsAPI.Models;

namespace VendorsAPI.Repositories.Interfaces;

public interface IVendorRepository
{
    Task<List<Vendor>> GetAll();

    Task<Transport> GetById(int transportId);
    Task<List<Vehicle>> GetVendorsVehicles(int VendorId);
    Task<List<VendorsFareDetails>> VendorHistory(int VendorId);

    Task<List<VendorsVehicleHistory>> VendorVehicleHistoryByMonth(int VendorId);

    Task<List<VendorsVehicleHistory>> VendorVehicleHistoryByYear(int VendorId);
    
    Task<List<VendorOrderCount>> VendorVehicleOrdersPerMonth(int VendorId);
    Task<bool> Update(int vendorId,Vendor vendor);
    Task<bool> Delete(int vendorId);
}
