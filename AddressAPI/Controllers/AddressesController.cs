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
    }
