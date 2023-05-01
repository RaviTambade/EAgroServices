using Microsoft.EntityFrameworkCore;
using TransportsAPI.Context;
using TransportsAPI.Models;
using TransportsAPI.Repositories.Interfaces;
namespace TransportsAPI.Repositories;
public class TruckRepository:ITruckRepository{

 private IConfiguration _configuration;
    public TruckRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<List<Truck>> GetAll(){
      try  {
            using (var context = new TruckContext(_configuration))
            {
                var trucks = await context.Truck.ToListAsync();
                if (trucks == null)
                {
                    return null;
                }
                return trucks;
            }
        } catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }  
}

    public async Task<Truck> GetById(int id)
    {
      try  {
            using (var context = new TruckContext(_configuration))
            {
                Truck? truck = await context.Truck.FindAsync(id);
                if (truck == null)
                {
                    return null;
                }
                return truck;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }
    }

    public async Task<bool> Insert(Truck truck)
    {
        bool status = false;
        try
        {
            using (var context = new TruckContext(_configuration))
            {
                
                await context.Truck.AddAsync(truck);
                await context.SaveChangesAsync();
                status = true;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }
        return status;
    }

    public async Task<bool> Update(int id, Truck truck)
    {
               bool status = false;
        try
        {
            using (var context = new TruckContext(_configuration))
            {
                Truck? oldTruck = await context.Truck.FindAsync(truck);
                if (oldTruck != null)
                {
                    
                    oldTruck.TransportId = truck.TransportId;
                    oldTruck.TruckNumber = truck.TruckNumber;
                    await context.SaveChangesAsync();
                    status = true;
                }
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }
        return status;
    }
    
      public async Task<bool> Delete(int id)
    {
       bool status = false;
        try
        {
            using (var context = new TruckContext(_configuration))
            {
                Truck? truck = await context.Truck.FindAsync(id);
                if (truck != null)
                {
                    context.Truck.Remove(truck);
                    await context.SaveChangesAsync();
                    status = true;
                }
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
        return status;
    }
}
