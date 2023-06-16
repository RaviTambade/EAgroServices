using AddressAPI.Models;
using AddressAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace AddressAPI.Controllers;

    [ApiController]
    [Route("/api/[controller]")]
    public class AddressesController : ControllerBase
    {
        private readonly IAddressService _srv;

        public AddressesController(IAddressService srv)
        {
            this._srv = srv;
        }  

 [HttpGet]
        public async Task<List<Address>> GetAddresses()
        {
            return await _srv.GetAddresses();
        }
[HttpGet("{id}")]
          public async Task<Address> GetAddress(int id)
        {
            return await _srv.GetAddress(id);
        }

[HttpGet("user/{id}")]

         public async Task<Address> UserAddress(int id)
        {
            return await _srv.UserAddress(id);
        }
       // [HttpPost("{id}")]

        //  public async Task<bool> Insert(Address address)
        // {
        //     return await _srv.Insert(address);
       // }
         [HttpPut("{id}")]

         public async Task<bool> Update(int id,Address address)
        {
            return await _srv.Update(id,address);
        }
        
         [HttpDelete("{id}")]

         public async Task<bool> Delete(int id)
        {
            return await _srv.Delete(id);
        }
        
        [HttpGet("getdistricts/{state}")]
        public async Task<List<string>> GetDistrict(string state){
            return await _srv.GetDistricts(state);
        }

        [HttpGet("gettahsils/{district}")]

    public async Task<List<string>> GetTahsils(string district){
        return await _srv.GetTahsils(district);
    }


  [HttpGet("getvillages/{tahsil}")]

    public async Task<List<string>> GetVillages(string tahsil){
        return await _srv.GetVillages(tahsil);
    }
  

    [HttpGet("states")]
     public async Task<List<string>> GetStates(){
       return await _srv.GetStates();
     }


    }
