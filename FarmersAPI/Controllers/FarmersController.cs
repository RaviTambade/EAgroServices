using FarmersAPI.Models;
using FarmersAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace FarmersAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class FarmersController : ControllerBase
    {
        private readonly IFarmerService _srv;
        public FarmersController(IFarmerService srv)
        {
            this._srv = srv;
        }
        [HttpGet]
        [Route("farmers")]
        public async Task<List<Farmer>> GetAll()
        {
            List<Farmer> farmers = await _srv.GetAll();
            return farmers;
        }

        [HttpGet]
        [Route("farmers/{id}")]
        public async Task<Farmer> GetById(int id)
        {
            Farmer farmer = await _srv.GetById(id);
            return farmer;
        }

        [HttpPost]
        [Route("farmers")]
        public async Task<bool> Insert([FromBody] UserFarmerRole userFarmerRole)
        {
            User? user=userFarmerRole.User;
            Farmer? farmer=userFarmerRole.Farmer;
            UserRole? userRole=userFarmerRole.UserRole;
            Console.WriteLine(user?.ContactNumber + " "+ user?.Password + " " +farmer?.FirstName + " " +farmer?.LastName + " "+farmer?.Location + " " +userRole?.Id); 
            return await _srv.Insert(user,farmer,userRole);
        }

        [HttpPut]
        [Route("farmers/{id}")]
        public async Task<bool> Update(int id, [FromBody] Farmer farmer)
        { 
             return await _srv.Update(id, farmer);
        }

        [HttpDelete]
        [Route("farmers/{id}")]
        public async Task<bool> Delete(int id)
        {
            return await _srv.Delete(id);
        }

    }
}




