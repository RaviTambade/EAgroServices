using Intranet.Entities;
using Intranet.Extensions;
using Intranet.Services.Interfaces;
using Microsoft.Extensions.Configuration;   
namespace Intranet.Services;
public class VerifiedGoodsCollectionService:IVerifiedGoodsCollectionService
{
        public string ConnectionString { get; }
        private readonly IConfiguration _configuration;

        public VerifiedGoodsCollectionService(IConfiguration configuration)
        {
            _configuration = configuration;
            ConnectionString = _configuration.GetConnectionString("DefaultConnection")!;
        }

        public async Task<IEnumerable<VerifiedGoodsCollection>> FindAll()
        {
            return await this.FindAllAsync();
        }
        public async Task<VerifiedGoodsCollection> FindById(int id)
        {
            return await this.FindByIdAsync(id);
        }

        public async Task Add(VerifiedGoodsCollection entity)
        {
            await this.AddAsync(entity);
        }

        public async Task Update(VerifiedGoodsCollection entity)
        {
            await this.UpdateAsync(entity);
        }

        public async Task Delete(int id)
        {
            await this.DeleteAsync(id);
        }
}