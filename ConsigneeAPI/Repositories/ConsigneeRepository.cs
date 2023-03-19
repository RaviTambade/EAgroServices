using System.Collections.Generic;
using ConsigneesAPI.Context;
using ConsigneesAPI.Models;

namespace ConsigneesAPI.Repositories;

public class ConsigneeRepository : IConsigneeRepository
{
    public List<Consignee> AllConsignee()
    {
        List<Consignee>consignees =null;
       using (var context =new ConsigneeContext())
       {
        consignees= context.Consignees.ToList();
        return consignees;

       }
    }
}