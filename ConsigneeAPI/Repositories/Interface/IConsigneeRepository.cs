using ConsigneesAPI.Models;

namespace ConsigneesAPI.Repositories;
public interface IConsigneeRepository
{

    List<Consignee> AllConsignee();
    Consignee GetById(int id);
    bool Insert(Consignee consignee);
    bool Update(Consignee consignee);
    bool Delete(int id);


}