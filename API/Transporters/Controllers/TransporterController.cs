using Transporters.Models;
using Transporters.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Transporters.Controllers
{
    [ApiController]
    [Route("/api/transporters")]
    public class TransporterController : ControllerBase
    {
        private readonly ITransporterService _srv;

        public TransporterController(ITransporterService srv)
        {
            _srv = srv;
        }

        [HttpGet]
        public async Task<List<Transporter>> GetAll()
        {
            return await _srv.GetAll();
        }

        [HttpGet("{transporterId}")]
        public async Task<Transporter> GetById(int transporterId)
        {
            return await _srv.GetById(transporterId);
        }

        [HttpPost]
        public async Task<bool> Insert(Transporter transporter)
        {
            return await _srv.Insert(transporter);
        }

        [HttpPut]
        public async Task<bool> Update(Transporter transporter)
        {
            return await _srv.Update(transporter);
        }

        [HttpDelete("{transporterId}")]
        public async Task<bool> Delete(int transporterId)
        {
            return await _srv.Delete(transporterId);
        }
    }
}
