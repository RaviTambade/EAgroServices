using Crops.Models;
using Crops.Repositories.Interfaces;
using Crops.Entities;
using Crops.Services.Interfaces;

namespace Crops.Services;

public class CropService : ICropService
{
    private readonly ICropRepository _repo;

    public CropService(ICropRepository repo)
    {
        this._repo = repo;
    }

    public async Task<List<Crop>> GetAll() => await _repo.GetAll();

      public async Task<List<string>> GetCropNames() => await _repo.GetCropNames();


    public async Task<List<CropNameIdDetails>> GetCropNamesWithId() => await _repo.GetCropNamesWithId();

    public async Task<Crop?> GetById(int varietyId) => await _repo.GetById(varietyId);

    public async Task<bool> Insert(Crop variety) => await _repo.Insert(variety);

    public async Task<bool> Update(int varietyId, Crop variety) =>
        await _repo.Update(varietyId, variety);

    public async Task<bool> Delete(int varietyId) => await _repo.Delete(varietyId);
}
