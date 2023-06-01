using System.Collections.Generic;
using CropsAPI.Models;
namespace CropsAPI.Repositories.Interfaces;
public interface ICropRepository{
    Task<List<Crop>> GetAll();
    Task<Crop> GetById(int varietyId);
    Task<bool> Insert(Crop variety);
    Task<bool> Update(int varietyId,Crop variety);
    Task<bool> Delete(int varietyId);
}