using System.Collections.Generic;
using System.Net;
using ConsigneesAPI.Context;
using ConsigneesAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ConsigneesAPI.Repositories;

public class ConsigneeRepository : IConsigneeRepository
{
    private readonly IConfiguration _configuration;
    public ConsigneeRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<List<Consignee>> AllConsignee()
    {
        try
        {
            using (var context = new ConsigneeContext(_configuration))
            {
                List<Consignee> consignees = await context.Consignees.ToListAsync();
                if (consignees == null)
                {
                    return null;
                }
                return consignees;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<Consignee> GetById(int consigneeId)
    {
        try
        {
            using (var context = new ConsigneeContext(_configuration))
            {
                Consignee consignee = await context.Consignees.FindAsync(consigneeId);
                if (consignee == null)
                {
                    return null;
                }
                return consignee;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<bool> Insert(Consignee consignee)
    {
        bool status = false;
        try
        {
            using (var context = new ConsigneeContext(_configuration))
            {
                await context.Consignees.AddAsync(consignee);
                await context.SaveChangesAsync();
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }
    public async Task<bool> Update(int consigneeId, Consignee consignee)
    {
        bool status = false;
        try
        {
            using (var context = new ConsigneeContext(_configuration))
            {
                Consignee? oldConsignee = await context.Consignees.FindAsync(consigneeId);
                if (oldConsignee != null)
                {
                    oldConsignee.FirstName = consignee.FirstName;
                    oldConsignee.LastName = consignee.LastName;
                    oldConsignee.CompanyName = consignee.CompanyName;
                    oldConsignee.ContactNumber = consignee.ContactNumber;
                    oldConsignee.Location = consignee.Location;
                    await context.SaveChangesAsync();
                    return true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;

    }
    public async Task<bool> Delete(int consigneeId)
    {
        bool status = false;
        try
        {
            using (var context = new ConsigneeContext(_configuration))
            {
                Consignee? consignee = await context.Consignees.FindAsync(consigneeId);
                if (consignee != null)
                {
                    context.Consignees.Remove(consignee);
                    await context.SaveChangesAsync();
                    status = true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }
}