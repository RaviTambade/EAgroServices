using Transflower.EAgroServices.Crops.Models;
using Transflower.EAgroServices.Crops.Entities;

namespace Transflower.EAgroServices.Crops.Repositories.Interfaces;

public interface ICropRepository
{
    Task<List<Crop>> GetAll();
    Task<List<string>> GetCropNames();
    Task<List<CropDetail>> GetCropNamesWithId();
    Task<Crop?> GetById(int cropId);
    Task<bool> Insert(Crop crop);
    Task<bool> Update(int cropId, Crop crop);
    Task<bool> Delete(int cropId);
}
