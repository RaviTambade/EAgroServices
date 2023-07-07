using Transporters.Models;
using Transporters.Repositories.Interfaces;
using Transporters.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Transporters.Repositories
{
    public class TransporterRepository : ITransporterRepository
    {
        private readonly IConfiguration _configuration;

        public TransporterRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<Transporter>> GetAll()
        {
            try
            {
                using (var context = new TransporterContext(_configuration))
                {
                    var transporters = await context.Transporters.ToListAsync();
                    if (transporters == null)
                    {
                        return null;
                    }
                    return transporters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
