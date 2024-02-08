using Intranet.Entities;
using Intranet.Extensions;
using Intranet.Services.Interfaces;
using Microsoft.Extensions.Configuration;   
namespace Intranet.Services;
public class GoodsCollectionService:IGoodsCollectionService
{
        public string ConnectionString { get; }
        private readonly IConfiguration _configuration;

        public GoodsCollectionService(IConfiguration configuration)
        {
            _configuration = configuration;
            ConnectionString = _configuration.GetConnectionString("DefaultConnection")!;
        }

        public async Task<IEnumerable<GoodsCollection>> FindAll()
        {
            return await this.FindAllAsync();
        }
        public async Task<GoodsCollection> FindById(int id)
        {
            return await this.FindByIdAsync(id);
        }

        public async Task Add(GoodsCollection entity)
        {
            await this.AddAsync(entity);
        }

        public async Task Update(GoodsCollection entity)
        {
            await this.UpdateAsync(entity);
        }

        public async Task Delete(int id)
        {
            await this.DeleteAsync(id);
        }
}