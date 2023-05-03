using System.Collections.Generic;
using VarietiesAPI.Models;
using VarietiesAPI.Repositories.Interfaces;
using VarietiesAPI.Services.Interfaces;
namespace VarietiesAPI.Services;
public class VarietyService:IVarietyService{
    private readonly IVarietyRepository _repo;
    public VarietyService(IVarietyRepository repo){
        this._repo=repo;
    }
    public async Task<List<Variety>> GetAll() =>await _repo.GetAll();
    public async Task<Variety> GetById(int varietyId) =>await _repo.GetById(varietyId);
    public async Task<bool> Insert(Variety variety)=>await _repo.Insert(variety);
    public async Task<bool> Update(int varietyId,Variety variety)=>await _repo.Update(varietyId,variety);
    public async Task<bool> Delete(int varietyId)=>await _repo.Delete(varietyId);
}