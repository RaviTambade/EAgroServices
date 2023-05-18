using System.Globalization;
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
    public async Task<List<Transport>> GetAll()
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


    public async Task<Transport> GetById(int transportId)
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

    public async Task<bool> Insert(User user, Transport transport, UserRole userRole)
    {
        bool status = false;
        int userId = 0;
        try
        {
            using (var context = new TransportContext(_configuration))
            {
                await context.Users.AddAsync(user);
                await context.SaveChangesAsync();
                userId = user.UserId;
                transport.UserId = userId;
                userRole.UserId = userId;
                await context.Transports.AddAsync(transport);
                await context.UserRoles.AddAsync(userRole);
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

    public async Task<bool> Update(int transportId, Transport transport)
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


    public async Task<bool> Delete(int transportId)
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

    public async Task<List<TransportFareDetails>> TransportHistory(int transportId)
    {
        try
        {
            using (var context = new TransportContext(_configuration))
            {
                var transportHistory = await (from transport in context.Transports
                                              join transportTruck in context.Trucks
                                              on transport.TransportId equals transportTruck.TransportId
                                              join sell in context.Sells
                                              on transportTruck.TruckId equals sell.TruckId
                                              join billing in context.Billings
                                              on sell.SellId equals billing.SellId
                                              join freightRate in context.FreightRates
                                              on billing.BillId equals freightRate.BillId
                                              where transport.TransportId == transportId
                                              select new TransportFareDetails()
                                              {
                                                //   FreightRate = freightRate,
                                                //   Billing = billing,
                                                //   Truck = transportTruck,
                                                  TruckNumber=transportTruck.TruckNumber,
                                                  FromDestination=freightRate.FromDestination,
                                                  ToDestination=freightRate.ToDestination,
                                                  Kilometers=freightRate.Kilometers,
                                                  RatePerKm=freightRate.RatePerKm,
                                                  FreightCharges=billing.FreightCharges,
                                                  Date=billing.Date
                                              }).ToListAsync();
                return transportHistory;
            }

        }
        catch (Exception e)
        {
            throw e;
        }

    }

    public async Task<List<TransportTruckHistory>> TransportTruckHistoryByMonth(int transportId)
    {
        try
        {
            using (var context = new TransportContext(_configuration))
            {
                var transportHistory =
             await (from sells_billing in context.Billings
                    join sells in context.Sells on sells_billing.SellId equals sells.SellId
                    join transport_trucks in context.Trucks on sells.TruckId equals transport_trucks.TruckId
                    join transports in context.Transports on transport_trucks.TransportId equals transports.TransportId
                    where transports.TransportId == transportId
                    group sells_billing by new
                    {
                        sells_billing.Date.Month,
                        transport_trucks.TruckNumber,
                        sells_billing.Date.Year
                    } into g
                    orderby g.Key.Month
                    select new TransportTruckHistory()
                    {
                        TotalFreightCharges = g.Sum(s => s.FreightCharges),
                        Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key.Month),
                        TruckNumber = g.Key.TruckNumber,
                        Year = g.Key.Year
                    }).ToListAsync();

                return transportHistory;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<List<TransportTruckHistory>> TransportTruckHistoryByYear(int transportId)
    {
        try
        {
            using (var context = new TransportContext(_configuration))
            {
                var transportHistory =
             await (from sells_billing in context.Billings
                    join sells in context.Sells on sells_billing.SellId equals sells.SellId
                    join transport_trucks in context.Trucks on sells.TruckId equals transport_trucks.TruckId
                    join transports in context.Transports on transport_trucks.TransportId equals transports.TransportId
                    where transports.TransportId == transportId
                    group sells_billing by new
                    {
                        transport_trucks.TruckNumber,
                        sells_billing.Date.Year
                    } into g
                    select new TransportTruckHistory()
                    {
                        TotalFreightCharges = g.Sum(s => s.FreightCharges),
                        TruckNumber = g.Key.TruckNumber,
                        Year = g.Key.Year
                    }).ToListAsync();

                return transportHistory;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
}