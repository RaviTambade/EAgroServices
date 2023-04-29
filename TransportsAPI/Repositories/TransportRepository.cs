
using Microsoft.EntityFrameworkCore;
using TransportsAPI.Context;
using TransportsAPI.Models;
using TransportsAPI.Repositories.Interfaces;

namespace TransportsAPI.Repositories;

public class TransportRepository : ITransportRepository
{
    private IConfiguration _configuration;
    public TransportRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<Transport>> GetAllTransports()
    {
        try
        {
            using (var context = new TransportContext(_configuration))
            {
                var transports = await context.Transports.ToListAsync();
                if (transports == null)
                {
                    return null;
                }
                return transports;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }
    }


    public async Task<Transport> GetTransportById(int transportId)
    {
        try
        {
            using (var context = new TransportContext(_configuration))
            {
                Transport? transport = await context.Transports.FindAsync(transportId);
                if (transport == null)
                {
                    return null;
                }
                return transport;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }
    }

    public async Task<bool> InsertTransport(Transport transport)
    {
        bool status = false;
        try
        {
            using (var context = new TransportContext(_configuration))
            {
                await context.Transports.AddAsync(transport);
                await context.SaveChangesAsync();
                status = true;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }
        return status;
    }

    public async Task<bool> UpdateTransport(int transportId, Transport transport)
    {
        bool status = false;
        try
        {
            using (var context = new TransportContext(_configuration))
            {
                Transport? oldTransport = await context.Transports.FindAsync(transportId);
                if (oldTransport != null)
                {
                    oldTransport.FirstName = transport.FirstName;
                    oldTransport.LastName = transport.LastName;
                    oldTransport.OfficeName = transport.OfficeName;
                    oldTransport.Location = transport.Location;
                    await context.SaveChangesAsync();
                    status = true;
                }
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }
        return status;
    }


    public async Task<bool> DeleteTransport(int transportId)
    {
        bool status = false;
        try
        {
            using (var context = new TransportContext(_configuration))
            {
                Transport? transport = await context.Transports.FindAsync(transportId);
                if (transport != null)
                {
                    context.Transports.Remove(transport);
                    await context.SaveChangesAsync();
                    status = true;
                }
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
        return status;
    }
}