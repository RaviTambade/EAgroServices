using Transflower.EAgroServices.Crops.Models;
using Transflower.EAgroServices.Crops.Repositories.Interfaces;
using Transflower.EAgroServices.Crops.Entities;
using Transflower.EAgroServices.Crops.Services.Interfaces;

namespace Transflower.EAgroServices.Crops.Services;

public class CropService : ICropService
{
    private readonly ICropRepository _repository;

    public CropService(ICropRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Crop>> GetAll() => await _repository.GetAll();

    public async Task<List<string>> GetCropNames() => await _repository.GetCropNames();

    public async Task<List<CropDetail>> GetCropNamesWithId() =>
        await _repository.GetCropNamesWithId();

    public async Task<Crop?> GetById(int cropId) => await _repository.GetById(cropId);

    public async Task<bool> Insert(Crop crop) => await _repository.Insert(crop);

    public async Task<bool> Update(int cropId, Crop crop) => await _repository.Update(cropId, crop);

    public async Task<bool> Delete(int cropId) => await _repository.Delete(cropId);
}
