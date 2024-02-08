using Intranet.Entities;
using Intranet.Extensions;
using Intranet.Services.Interfaces;
using Microsoft.Extensions.Configuration;   
namespace Intranet.Services;
public class CollectionCenterService:ICollectionCenterService
{
        public string ConnectionString { get; }
        private readonly IConfiguration _configuration;

        public CollectionCenterService(IConfiguration configuration)
        {
            _configuration = configuration;
            ConnectionString = _configuration.GetConnectionString("DefaultConnection")!;
        }

        public async Task<IEnumerable<CollectionCenter>> FindAll()
        {
            return await this.FindAllAsync();
        }
        public async Task<CollectionCenter> FindById(int id)
        {
            return await this.FindByIdAsync(id);
        }

        public async Task Add(CollectionCenter entity)
        {
            await this.AddAsync(entity);
        }

        public async Task Update(CollectionCenter entity)
        {
            await this.UpdateAsync(entity);
        }

        public async Task Delete(int id)
        {
            await this.DeleteAsync(id);
        }
}