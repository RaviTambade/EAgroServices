using TransportsAPI.Models;
using TransportsAPI.Repositories.Interfaces;
using TransportsAPI.Services.Interfaces;
public class TruckServices : ITruckServices
{

    private readonly ITruckRepository _repository;

    public TruckServices(ITruckRepository repository)
    {
        this._repository = repository;
    }

    public async Task<List<Truck>> GetAll()
    {
        return await _repository.GetAll();
    }
    public async Task<Truck> GetById(int id)
    {
        return await _repository.GetById(id);
    }
    public async Task<bool> Insert(Truck truck)
    {
        return await _repository.Insert(truck);
    }
    public async Task<bool> Update(int id, Truck truck)
    {
        return await _repository.Update(id, truck);
    }
    public async Task<bool> Delete(int id)
    {
        return await _repository.Delete(id);
    }

}