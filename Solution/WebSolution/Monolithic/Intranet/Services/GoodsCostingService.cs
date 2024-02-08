using Intranet.Entities;
using Intranet.Extensions;
using Intranet.Services.Interfaces;
using Microsoft.Extensions.Configuration;   
namespace Intranet.Services;
public class GoodsCostingService:IGoodsCostingService
{
        public string ConnectionString { get; }
        private readonly IConfiguration _configuration;

        public GoodsCostingService(IConfiguration configuration)
        {
            _configuration = configuration;
            ConnectionString = _configuration.GetConnectionString("DefaultConnection")!;
        }

        public async Task<IEnumerable<GoodsCosting>> FindAll()
        {
            return await this.FindAllAsync();
        }
        public async Task<GoodsCosting> FindById(int id)
        {
            return await this.FindByIdAsync(id);
        }

        public async Task Add(GoodsCosting entity)
        {
            await this.AddAsync(entity);
        }

        public async Task Update(GoodsCosting entity)
        {
            await this.UpdateAsync(entity);
        }

        public async Task Delete(int id)
        {
            await this.DeleteAsync(id);
        }
}