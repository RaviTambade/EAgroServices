
using Transporters.Models;
using Transporters.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Transporters.Controllers
{
    [ApiController]
    [Route("/api/trasporters")]
    public class TransporterController : ControllerBase
    {
        private readonly ITransporterService _srv;

        public TransporterController(ITransporterService srv)
        {
            _srv = srv;
        }

        [HttpGet("")]
        public async Task<List<Transporter>> GetAll() 
        {
            return await _srv.GetAll(); 
        }

    }
}