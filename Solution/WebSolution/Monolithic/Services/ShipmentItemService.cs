using Intranet.Entities;
using Intranet.Extensions;
using Intranet.Services.Interfaces;
using Microsoft.Extensions.Configuration;   
namespace Intranet.Services;
public class ShipmentItemService:IShipmentItemService
{
        public string ConnectionString { get; }
        private readonly IConfiguration _configuration;

        public ShipmentItemService(IConfiguration configuration)
        {
            _configuration = configuration;
            ConnectionString = _configuration.GetConnectionString("DefaultConnection")!;
        }

        public async Task<IEnumerable<ShipmentItem>> FindAll()
        {
            return await this.FindAllAsync();
        }
        public async Task<ShipmentItem> FindById(int id)
        {
            return await this.FindByIdAsync(id);
        }

        public async Task Add(ShipmentItem entity)
        {
            await this.AddAsync(entity);
        }

        public async Task Update(ShipmentItem entity)
        {
            await this.UpdateAsync(entity);
        }

        public async Task Delete(int id)
        {
            await this.DeleteAsync(id);
        }
}