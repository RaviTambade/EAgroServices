
using Transflower.Vehicles.Models;
namespace Transflower.Vehicles.Repositories.Interfaces;
public interface IVehicleRepository{
    Task<List<Vehicle>> GetAll();
     Task<List<string>> GetvehicleNumbers();
    Task<Vehicle> GetVehicle(int vehicleId);
    Task<List<VehicleNumber>> GetAvailableVehicleNumbers();
    Task<bool> Insert(Vehicle vehicle);
    Task<bool> Update(int vehicleId,Vehicle vehicle);
    Task<bool> Delete(int vehicleId);
 }