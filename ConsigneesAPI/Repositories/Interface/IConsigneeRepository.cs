using ConsigneesAPI.Models;
namespace ConsigneesAPI.Repositories;
public interface IConsigneeRepository
{
    Task<List<Consignee>> AllConsignee();
    Task<Consignee> GetById(int consigneeId);
    Task<bool> Insert(Consignee consignee);
    Task<bool> Update(int consigneeId,Consignee consignee);
    Task<bool> Delete(int consigneeId);


}