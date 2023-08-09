using Vehicles.Models;
using Vehicles.Repositories.Interfaces;
using Vehicles.Services.Interfaces;

namespace Vehicles.Services;
public class VehicleService : IVehicleService
{
    private readonly IVehicleRepository _repo;
    public VehicleService(IVehicleRepository repo){
        _repo=repo;
    }
    public async Task<List<Vehicle>> GetAll()
    {
       return await _repo.GetAll();
    }

    public async Task<Vehicle> GetVehicle(int vehicleId)
    {
    return await _repo.GetVehicle(vehicleId);
    }

    public async Task<bool> Insert(Vehicle vehicle)
    {
        return await _repo.Insert(vehicle);
    }

    public async Task<bool> Update(int vehicleId, Vehicle vehicle)
    {
       return await _repo.Update(vehicleId,vehicle);
    }
      public async Task<bool> Delete(int vehicleId)
    {
    return await _repo.Delete(vehicleId);
    }
    public async Task<List<VehicleNumber>> GetAvailableVehicleNumbers()
    {
        return await _repo.GetAvailableVehicleNumbers();
    }

}