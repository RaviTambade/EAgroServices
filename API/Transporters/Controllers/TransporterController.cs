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

        [HttpGet("{transporterId}/vehicles")]
        public async Task<List<Vehicle>> GetTransportersVehicles(int transporterId)
        {
            return await _srv.GetTransportersVehicles(transporterId);
        }

        [HttpGet("manager/{managerId}")]
         public async Task<int> GetTransporterId(int managerId)
        {
            return await _srv.GetTransporterId(managerId);
        }

         [HttpGet("transporterandcorporateid")]
        public async Task<List<TransporterCorporate>> GetTransporterAndCorporateId()
        {
            return await _srv.GetTransporterAndCorporateId();
        }

         [HttpGet("corporateid/{transporterId}")]
         public async Task<int> GetCorporateIdOfTransporter(int transporterId)
        {
            return await _srv.GetCorporateIdOfTransporter(transporterId);
        }

        [HttpGet("{transporterId}/revenues")]
            public async Task<List<VehicleRevenue>> GetVehicleRevenues(int transporterId)
        {
            return await _srv.GetVehicleRevenues(transporterId);
        }



        [HttpGet("{transporterId}/monthlyrevenue")]
         public async Task<List<TransporterRevenue>> GetTransporterRevenues(int transporterId)
        {
            return await _srv.GetTransporterRevenues(transporterId);
        }

        [HttpGet("{transporterId}/shipmentcount")]
         public Task<List<ShipmentCount>> GetShipmentCounts(int transporterId)
        {
            return _srv.GetShipmentCounts(transporterId);
        }

    }
}
