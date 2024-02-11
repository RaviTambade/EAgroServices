using Intranet.Entities;
using Intranet.Extensions;
using Intranet.Services.Interfaces;
using Microsoft.Extensions.Configuration;   
namespace Intranet.Services;
public class ShipmentService:IShipmentService
{
        public string ConnectionString { get; }
        private readonly IConfiguration _configuration;

        public ShipmentService(IConfiguration configuration)
        {
            _configuration = configuration;
            ConnectionString = _configuration.GetConnectionString("DefaultConnection")!;
        }

        public async Task<IEnumerable<Shipment>> FindAll()
        {
            return await this.FindAllAsync();
        }
        public async Task<Shipment> FindById(int id)
        {
            return await this.FindByIdAsync(id);
        }

        public async Task Add(Shipment entity)
        {
            await this.AddAsync(entity);
        }

        public async Task Update(Shipment entity)
        {
            await this.UpdateAsync(entity);
        }

        public async Task Delete(int id)
        {
            await this.DeleteAsync(id);
        }
}