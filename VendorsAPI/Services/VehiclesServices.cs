using VendorsAPI.Models;
using VendorsAPI.Repositories.Interfaces;
using VendorsAPI.Services.Interfaces;
public class VehicleServices : IVehicleServices
{

    private readonly IVehicleRepository _repository;

    public VehicleServices(IVehicleRepository repository)
    {
        this._repository = repository;
    }

    public async Task<List<Vehicle>> GetAll()
    {
        return await _repository.GetAll();
    }
    public async Task<Vehicle> GetById(int id)
    {
        return await _repository.GetById(id);
    }
    public async Task<List<string>> GetVehicles(){
        return await _repository.GetVehicles();
    }
    public async Task<bool> Insert(Vehicle Vehicle)
    {
        return await _repository.Insert(Vehicle);
    }
    public async Task<bool> Update(int id, Vehicle Vehicle)
    {
        return await _repository.Update(id, Vehicle);
    }
    public async Task<bool> Delete(int id)
    {
        return await _repository.Delete(id);
    }
   public async Task<List<SellTransport>> GetTransportDetails(int id,StartDateFilter startDate){
    return await _repository.GetTransportDetails(id,startDate);

   }
}