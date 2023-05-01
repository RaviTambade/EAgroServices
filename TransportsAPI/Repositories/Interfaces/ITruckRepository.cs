using TransportsAPI.Models;

namespace TransportsAPI.Repositories.Interfaces;

public interface ITruckRepository
{
    Task<List<Truck>> GetAll();
    Task<Truck> GetById(int id);
    Task<bool> Insert(Truck truck);
    Task<bool> Update(int id, Truck truck);
    Task<bool> Delete(int id);
}