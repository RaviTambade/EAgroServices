using VendorsAPI.Models;

namespace VendorsAPI.Repositories.Interfaces;

public interface IVehicleRepository
{
    Task<List<Vehicle>> GetAll();
    Task<Vehicle> GetById(int id);
    Task<bool> Insert(Vehicle Vehicle);
    Task<bool> Update(int id, Vehicle Vehicle);
    Task<bool> Delete(int id);

    Task<
    
}