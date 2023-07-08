using System.Collections.Generic;
using System.Threading.Tasks;
using Vehicles.Models;
namespace Vehicles.Repositories.Interfaces;
public interface IVehicleRepository{
    Task<List<Vehicle>> GetAll();
    Task<Vehicle> GetVehicle(int vehicleId);
    Task<bool> Insert(Vehicle vehicle);
    Task<bool> Update(int vehicleId,Vehicle vehicle);
    Task<bool> Delete(int vehicleId);
 }