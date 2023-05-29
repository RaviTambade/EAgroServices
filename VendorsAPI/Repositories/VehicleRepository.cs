using Microsoft.EntityFrameworkCore;
using VendorsAPI.Context;
using VendorsAPI.Models;
using VendorsAPI.Repositories.Interfaces;
namespace VendorsAPI.Repositories;
public class VehicleRepository:IVehicleRepository{

 private IConfiguration _configuration;
    public VehicleRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<List<Vehicle>> GetAll(){
      try  {
            using (var context = new VehicleContext(_configuration))
            {
                var Vehicles = await context.Vehicle.ToListAsync();
                if (Vehicles == null)
                {
                    return null;
                }
                return Vehicles;
            }
        } catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }  
}

    public async Task<Vehicle> GetById(int id)
    {
      try  {
            using (var context = new VehicleContext(_configuration))
            {
                Vehicle? Vehicle = await context.Vehicle.FindAsync(id);
                if (Vehicle == null)
                {
                    return null;
                }
                return Vehicle;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }
    }

    public async Task<bool> Insert(Vehicle Vehicle)
    {
        bool status = false;
        try
        {
            using (var context = new VehicleContext(_configuration))
            {
                await context.Vehicle.AddAsync(Vehicle);
                await context.SaveChangesAsync();
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }

    public async Task<bool> Update(int id, Vehicle Vehicle)
    {
               bool status = false;
        try
        {
            using (var context = new VehicleContext(_configuration))
            {
                Vehicle? oldVehicle = await context.Vehicle.FindAsync(id);
                if (oldVehicle != null)
                {
                    oldVehicle.VendorId = Vehicle.VendorId;
                    oldVehicle.VehicleNumber = Vehicle.VehicleNumber;
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
            using (var context = new VehicleContext(_configuration))
            {
                Vehicle? Vehicle = await context.Vehicle.FindAsync(id);
                if (Vehicle != null)
                {
                    context.Vehicle.Remove(Vehicle);
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
