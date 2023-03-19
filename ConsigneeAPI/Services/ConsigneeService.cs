
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
}