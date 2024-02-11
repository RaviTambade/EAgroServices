using Intranet.Entities;
using Intranet.Extensions;
using Intranet.Services.Interfaces;
using Microsoft.Extensions.Configuration;   
namespace Intranet.Services;
public class CropService:ICropService
{
        public string ConnectionString { get; }
        private readonly IConfiguration _configuration;

        public CropService(IConfiguration configuration)
        {
            _configuration = configuration;
            ConnectionString = _configuration.GetConnectionString("DefaultConnection")!;
        }

        public async Task<IEnumerable<Crop>> FindAll()
        {
            return await this.FindAllAsync();
        }
        public async Task<Crop> FindById(int id)
        {
            return await this.FindByIdAsync(id);
        }

        public async Task Add(Crop entity)
        {
            await this.AddAsync(entity);
        }

        public async Task Update(Crop entity)
        {
            await this.UpdateAsync(entity);
        }

        public async Task Delete(int id)
        {
            await this.DeleteAsync(id);
        }
}