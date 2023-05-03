using System.Collections.Generic;
using VarietiesAPI.Models;
namespace VarietiesAPI.Repositories.Interfaces;
public interface IVarietyRepository{
    Task<List<Variety>> GetAll();
    Task<Variety> GetById(int varietyId);
    Task<bool> Insert(Variety variety);
    Task<bool> Update(int varietyId,Variety variety);
    Task<bool> Delete(int varietyId);
}