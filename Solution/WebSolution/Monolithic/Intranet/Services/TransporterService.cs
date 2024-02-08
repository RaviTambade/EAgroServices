using Intranet.Entities;
using Intranet.Extensions;
using Intranet.Services.Interfaces;
using Microsoft.Extensions.Configuration;   
namespace Intranet.Services;
public class TransporterService:ITransporterService
{
        public string ConnectionString { get; }
        private readonly IConfiguration _configuration;

        public TransporterService(IConfiguration configuration)
        {
            _configuration = configuration;
            ConnectionString = _configuration.GetConnectionString("DefaultConnection")!;
        }

        public async Task<IEnumerable<Transporter>> FindAll()
        {
            return await this.FindAllAsync();
        }
        public async Task<Transporter> FindById(int id)
        {
            return await this.FindByIdAsync(id);
        }

        public async Task Add(Transporter entity)
        {
            await this.AddAsync(entity);
        }

        public async Task Update(Transporter entity)
        {
            await this.UpdateAsync(entity);
        }

        public async Task Delete(int id)
        {
            await this.DeleteAsync(id);
        }
}