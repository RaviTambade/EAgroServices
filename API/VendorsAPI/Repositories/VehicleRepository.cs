using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
                var Vehicles = await context.Vehicles.ToListAsync();
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
                Vehicle? Vehicle = await context.Vehicles.FindAsync(id);
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

    public async Task<List<string>> GetVehicles(){
        try{
            using(var context=new VehicleContext(_configuration)){
                var vehicles=await context.Vehicles.Select(v=>v.VehicleNumber).ToListAsync();
                return vehicles;
            }
        }
        catch(Exception e){
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
                await context.Vehicles.AddAsync(Vehicle);
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
                Vehicle? oldVehicle = await context.Vehicles.FindAsync(id);
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
                Vehicle? Vehicle = await context.Vehicles.FindAsync(id);
                if (Vehicle != null)
                {
                    context.Vehicles.Remove(Vehicle);
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
   public async Task<List<SellTransport>> GetTransportDetails(int id,StartDateFilter startDate){
    try{
        using(var context=new VendorsContext(_configuration)){
            var sellTransports=await(from vehicle in context.Vehicles
                                     join sell in context.Sells
                                     on vehicle.Id equals sell.VehicleId
                                     where sell.VehicleId==id &&
                                     sell.Date.Year == startDate.Date.Year
                                     && sell.Date.Month == startDate.Date.Month
                                     && sell.Date.Day == startDate.Date.Day
                                     select new SellTransport()
                                     {
                                        VehicleNumber=vehicle.VehicleNumber,
                                        Date=sell.Date,
                                        Quantity=sell.Quantity,
                                        NetWeight=sell.NetWeight
                                     }).ToListAsync();
                                     return sellTransports;
        }
    }
    catch(Exception e){
        throw e;
    }
   }

}
