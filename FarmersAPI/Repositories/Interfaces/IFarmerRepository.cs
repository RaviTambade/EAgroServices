using FarmersAPI.Models;
namespace FarmersAPI.Repositories.Interfaces;
public interface IFarmerRepository{
    Task<List<Farmer>> GetAll();
    Task<Farmer> GetById(int farmerId);
    Task<bool> Insert(User user,Farmer farmer,UserRole userRole);
    Task<bool> Update(int farmerId,Farmer farmer);
    Task<bool> Delete(int farmerId);
}