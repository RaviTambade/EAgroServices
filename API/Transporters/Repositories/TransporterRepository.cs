using Transporters.Models;
using Transporters.Repositories.Interfaces;
using Transporters.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

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
                    // foreach (var transporter in transporters)
                    //     await GetNameofTransporter(transporter.CorporateId);
                    return transporters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // private async Task<bool> GetNameofTransporter(int transporterId)
        // {
        //     using (var httpClient = new HttpClient())
        //     {
        //         using (
        //             var response = await httpClient.GetAsync(
        //                 $"http://localhost:5041/api/corporates/{transporterId}"
        //             )
        //         )
        //         {
        //             var apiResponse = await response.Content.ReadAsStringAsync();
        //             var corporate = JsonSerializer.Deserialize<object>(apiResponse);
        //             Console.WriteLine(corporate);
        //         }
        //         return true;
        //     }
        // }

        public async Task<Transporter> GetById(int transporterId)
        {
            try
            {
                using (var context = new TransporterContext(_configuration))
                {
                    var transporter = await context.Transporters.FindAsync(transporterId);

                    if (transporter == null)
                    {
                        return null;
                    }

                    return transporter;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Insert(Transporter transporter)
        {
            try
            {
                bool status = false;
                using (var context = new TransporterContext(_configuration))
                {
                    await context.Transporters.AddAsync(transporter);
                    int rowsAffected = context.SaveChanges();
                    if (rowsAffected > 0)
                    {
                        status = true;
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Update(Transporter transporter)
        {
            try
            {
                bool status = false;
                using (var context = new TransporterContext(_configuration))
                {
                    var oldTransporter = await context.Transporters.FindAsync(transporter.Id);
                    if (oldTransporter is not null)
                    {
                        oldTransporter.CorporateId = transporter.CorporateId;
                        oldTransporter.ManagerId = transporter.ManagerId;
                        int rowsAffected = context.SaveChanges();
                        if (rowsAffected > 0)
                        {
                            status = true;
                        }
                    }

                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Delete(int transporterId)
        {
            try
            {
                bool status = false;
                using (var context = new TransporterContext(_configuration))
                {
                    var transporter = await context.Transporters.FindAsync(transporterId);
                    if (transporter is not null)
                    {
                        context.Transporters.Remove(transporter);
                        int rowsAffected = context.SaveChanges();
                        if (rowsAffected > 0)
                        {
                            status = true;
                        }
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
