using Intranet.Entities;
using Intranet.Extensions;
using Intranet.Services.Interfaces;
using Microsoft.Extensions.Configuration;   
namespace Intranet.Services;
public class InvoiceService:IInvoiceService
{
        public string ConnectionString { get; }
        private readonly IConfiguration _configuration;

        public InvoiceService(IConfiguration configuration)
        {
            _configuration = configuration;
            ConnectionString = _configuration.GetConnectionString("DefaultConnection")!;
        }

        public async Task<IEnumerable<Invoice>> FindAll()
        {
            return await this.FindAllAsync();
        }
        public async Task<Invoice> FindById(int id)
        {
            return await this.FindByIdAsync(id);
        }

        public async Task Add(Invoice entity)
        {
            await this.AddAsync(entity);
        }

        public async Task Update(Invoice entity)
        {
            await this.UpdateAsync(entity);
        }

        public async Task Delete(int id)
        {
            await this.DeleteAsync(id);
        }
}