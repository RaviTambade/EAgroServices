using Intranet.Entities;
using Intranet.Extensions;
using Intranet.Services.Interfaces;
using Microsoft.Extensions.Configuration;   
namespace Intranet.Services;
public class VehicleService:IVehicleService
{
        public string ConnectionString { get; }
        private readonly IConfiguration _configuration;

        public VehicleService(IConfiguration configuration)
        {
            _configuration = configuration;
            ConnectionString = _configuration.GetConnectionString("DefaultConnection")!;
        }

        public async Task<IEnumerable<Vehicle>> FindAll()
        {
            return await this.FindAllAsync();
        }
        public async Task<Vehicle> FindById(int id)
        {
            return await this.FindByIdAsync(id);
        }

        public async Task Add(Vehicle entity)
        {
            await this.AddAsync(entity);
        }

        public async Task Update(Vehicle entity)
        {
            await this.UpdateAsync(entity);
        }

        public async Task Delete(int id)
        {
            await this.DeleteAsync(id);
        }
}