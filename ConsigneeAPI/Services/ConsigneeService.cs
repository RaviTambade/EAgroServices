
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
    public List<Consignee> AllConsignee()
    {
        return _repo.AllConsignee();
    }
    public Consignee GetById(int id)
    {
        return _repo.GetById(id);
    }
    public bool Insert(Consignee consignee)
    {
        return _repo.Insert(consignee);
    }
    public bool Update(Consignee consignee)
    {
        return _repo.Update(consignee);

    }
    public bool Delete(int id)
    {
        return _repo.Delete(id);
    }
}