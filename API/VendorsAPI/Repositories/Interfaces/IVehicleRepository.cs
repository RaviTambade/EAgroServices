using System.Collections.Generic;
using System.Security;
using VendorsAPI.Models;

namespace VendorsAPI.Repositories.Interfaces;

public interface IVehicleRepository
{
    Task<List<Vehicle>> GetAll();
    Task<Vehicle> GetById(int id);
    Task<List<string>> GetVehicles();
    Task<bool> Insert(Vehicle Vehicle);
    Task<bool> Update(int id, Vehicle Vehicle);
    Task<bool> Delete(int id);
    Task<List<SellTransport>> GetTransportDetails(int id,StartDateFilter startDate);

    
    
}