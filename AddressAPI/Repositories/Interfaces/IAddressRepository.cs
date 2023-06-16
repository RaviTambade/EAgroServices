using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AddressAPI.Contexts;
using AddressAPI.Models;
namespace AddressAPI.Repository;
public interface IAddressRepository{
    Task<List<Address>>GetAddresses();
    Task<Address>GetAddress(int id);
    Task<Address>UserAddress(int userid); 
    // Task<bool> Insert(Address addresses);
    Task<bool> Update(int addressId,Address addresses);
    Task<bool> Delete(int id);
    Task<List<string>> GetDistricts(string state);
    Task<List<string>> GetTahsils(string district);
    Task<List<string>> GetVillages(string tahsil);

}

