using ConsigneesAPI.Models;

namespace ConsigneesAPI.Repositories;
public interface IConsigneeRepository
{

    List<Consignee> AllConsignee();
}