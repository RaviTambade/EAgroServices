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
    public Consignee GetById(int id)
    {
        using (var context = new ConsigneeContext())
        {
         var consignee=context.Consignees.Find(id);
            return consignee;
        } 

    }

    public bool Insert(Consignee consignee)
    {
        using (var context = new ConsigneeContext()){

        context.Consignees.Add(consignee);
        context.SaveChanges();
        return true;

        }
    }
    public bool Update(Consignee consignee)
    {
        using (var context = new ConsigneeContext())
        { 
            var oldConsignee=context.Consignees.Find(consignee.ConsigneeId);


          oldConsignee.ConsigneeId=consignee.ConsigneeId;
          oldConsignee.ConsigneeName=consignee.ConsigneeName;
          oldConsignee.AccountNumber=consignee.AccountNumber;
          oldConsignee.ContactNumber=consignee.ContactNumber;
          oldConsignee.IFSCCode=consignee.IFSCCode;
          oldConsignee.Location=consignee.Location;
          context.SaveChanges();
          return true;

        }

    } 
    public bool Delete(int id)
    {
        using(var context = new ConsigneeContext())
        {
            context.Consignees.Remove(context.Consignees.Find(id));
            context.SaveChanges();
            return true;

        }
    }
}