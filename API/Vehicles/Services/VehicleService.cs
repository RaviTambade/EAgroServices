using Transflower.Vehicles.Models;
using Transflower.Vehicles.Repositories.Interfaces;
using Transflower.Vehicles.Services.Interfaces;

namespace Transflower.Vehicles.Services;
public class VehicleService : IVehicleService
{
    private readonly IVehicleRepository _repository;
    public VehicleService(IVehicleRepository repository){
        _repository=repository;
    }
    public async Task<List<Vehicle>> GetAll()
    {
       return await _repository.GetAll();
    }

    public async Task<Vehicle> GetVehicle(int vehicleId)
    {
    return await _repository.GetVehicle(vehicleId);
    }

    public async Task<bool> Insert(Vehicle vehicle)
    {
        return await _repository.Insert(vehicle);
    }

    public async Task<bool> Update(int vehicleId, Vehicle vehicle)
    {
       return await _repository.Update(vehicleId,vehicle);
    }
      public async Task<bool> Delete(int vehicleId)
    {
    return await _repository.Delete(vehicleId);
    }
    public async Task<List<VehicleNumber>> GetAvailableVehicleNumbers()
    {
        return await _repository.GetAvailableVehicleNumbers();
    }

    public async Task<List<string>> GetvehicleNumbers()
    {
       return await _repository.GetvehicleNumbers();
    }
}