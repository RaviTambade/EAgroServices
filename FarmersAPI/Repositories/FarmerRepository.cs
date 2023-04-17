using FarmersAPI.Contexts;
using FarmersAPI.Models;
using FarmersAPI.Repositories.Interfaces;
using Org.BouncyCastle.Bcpg;
using Org.BouncyCastle.Security;

namespace FarmersAPI.Repositories;
public class FarmerRepository : IFarmerRepository
{
    public List<Farmer> GetAllFarmers()
    {
        using (var context = new FarmersContext())
        {
            var farmers = context.Farmers.ToList();
            return farmers;
        }

    }

    public Farmer GetFarmerById(int id)
    {
        using (var context = new FarmersContext())
        {
            var farmer = context.Farmers.Find(id);
            return farmer;
        }
    }
    public bool InsertFarmer(Farmer farmer)
    {
        using (var context = new FarmersContext())
        {
            context.Farmers.Add(farmer);
            context.SaveChanges();
            return true;

        }
    }

     public bool UpdateFarmer(Farmer farmer)
    {
        using (var context = new FarmersContext())
        {
           
        var oldFarmer= context.Farmers.Find(farmer.FarmerId);
        oldFarmer.FarmerName=farmer.FarmerName;
        oldFarmer.ContactNumber=farmer.ContactNumber;
        oldFarmer.Location=farmer.Location;
        oldFarmer.Password=farmer.Password;
        oldFarmer.AccountNumber=farmer.AccountNumber;
        oldFarmer.CreditBalance=farmer.CreditBalance;
        oldFarmer.DebitBalance=farmer.DebitBalance;
        oldFarmer.TotalBalance=farmer.TotalBalance;
        context.SaveChanges();
        return true;
        }
    }
    public bool DeleteFarmer(int id){
      using (var context =new FarmersContext())
      {
        bool status=false;
        context.Farmers.Remove(context.Farmers.Find(id));
        context.SaveChanges();
        return true;
      }
    }

}