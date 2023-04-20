
using ConsigneesAPI.Models;
using ConsigneesAPI.Repositories;

namespace ConsigneesAPI.Services;

public class ConsigneeService : IConsigneeService
{

    private readonly IConsigneeRepository _repo;  

    public ConsigneeService(IConsigneeRepository repo)  
    {
        this._repo=repo;
    }
    public async Task<List<Consignee>> AllConsignee()
    {
        return await _repo.AllConsignee();
    }
    public async Task<Consignee> GetById(int consigneeId)
    {
        return await _repo.GetById(consigneeId);
    }
    public async Task<bool> Insert(Consignee consignee)
    {
        return await _repo.Insert(consignee);
    }
    public async Task<bool> Update(int consigneeId,Consignee consignee)
    {
        return await _repo.Update(consigneeId,consignee);

    }
    public async Task<bool> Delete(int consigneeId)
    {
        return await _repo.Delete(consigneeId);
    }
}