using System.Threading.Tasks;
using AddressAPI.Models;
using AddressAPI.Services;
using AddressAPI.Repository;
using AddressAPI.Services;

namespace AddressAPI.Services;
public class AddressService:IAddressService{
      private readonly IAddressRepository _repo;  
    public AddressService(IAddressRepository repo)  
    {
        this._repo=repo;
    }
    public async Task<List<Address>>GetAddresses()=>await _repo.GetAddresses();
    public async Task<Address>GetAddress(int id)=>await _repo.GetAddress(id);
    public async Task<Address>UserAddress(int userid)=>await _repo.UserAddress(userid);
   // public async Task<Address>Insert(Address address)=>await _repo.Insert(address);
    public async Task<bool>Update(int adressid,Address address)=>await _repo.Update(adressid,address);
    public async Task<bool>Delete(int id)=>await _repo.Delete(id);

}