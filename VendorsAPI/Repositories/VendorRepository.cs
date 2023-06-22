using System.Globalization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VendorsAPI.Context;
using VendorsAPI.Models;
using VendorsAPI.Repositories.Interfaces;

namespace VendorsAPI.Repositories;

public class VendorRepository : IVendorRepository
{
    private IConfiguration _configuration;

    public VendorRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<List<Vendor>> GetAll()
    {
        try
        {
            using (var context = new VendorsContext(_configuration))
            {
                var Vendors = await context.Vendors.ToListAsync();
                if (Vendors == null)
                {
                    return null;
                }
                return Vendors;
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
            using (var context = new VendorsContext(_configuration))
            {
                Transport? transport = await (from vendor in context.Vendors
                                              join user in context.Transports
                                              on vendor.TransportId equals user.Id
                                              where user.Id == transportId
                                              select new Transport()
                                              {
                                                  FirstName = user.FirstName,
                                                  LastName = user.LastName,
                                                  ImageUrl = user.ImageUrl,
                                                  ContactNumber = user.ContactNumber,
                                                  AadharId = user.AadharId
                                              }
                                         ).FirstOrDefaultAsync();
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
    public async Task<List<SellTransport>> GetSellTransports(int vehicleId)
    {
        try
        {
            using (var context = new VendorsContext(_configuration))
            {
                var sellTransport = await (from sell in context.Sells
                                                     join vehicle in context.Vehicles
                                                     on sell.VehicleId equals vehicle.Id
                                                     join transport in context.Transports
                                                     on sell.MerchantId equals transport.Id
                                                     where sell.VehicleId == vehicleId
                                                     select new SellTransport()
                                                     {
                                                         FirstName = transport.FirstName,
                                                         LastName = transport.LastName,
                                                         VehicleNumber = vehicle.VehicleNumber,
                                                         Quantity = sell.Quantity,
                                                         NetWeight = sell.NetWeight,
                                                         RatePerKg = sell.RatePerKg,
                                                         Date = sell.Date
                                                     }
                ).ToListAsync();
                if (sellTransport == null)
                {
                    return null;
                }
                return sellTransport;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }
    }

// for records of a Vendor fare details -used in VendorList
public async Task<List<VendorsFareDetails>> VendorHistory(int VendorId)
{
    try
    {
        using (var context = new VendorsContext(_configuration))
        {
            var VendorHistory = await (
                from Vendor in context.Vendors
                join VendorVehicle in context.Vehicles
                    on Vendor.Id equals VendorVehicle.VendorId
                join sell in context.Sells on VendorVehicle.Id equals sell.VehicleId
                join billing in context.SellsBillings on sell.Id equals billing.SellId
                join freightRate in context.FreightRates
                    on billing.Id equals freightRate.BillId
                where Vendor.Id == VendorId
                orderby billing.Date descending
                select new VendorsFareDetails()
                {
                    VehicleNumber = VendorVehicle.VehicleNumber,
                    FromDestination = freightRate.FromDestination,
                    ToDestination = freightRate.ToDestination,
                    Kilometers = freightRate.Kilometers,
                    RatePerKm = freightRate.RatePerKm,
                    FreightCharges = billing.FreightCharges,
                    Date = billing.Date
                }
            ).ToListAsync();
            return VendorHistory;
        }
    }
    catch (Exception e)
    {
        throw e;
    }
}

//used for  column chart-one Vehicle revenue per month of a year
public async Task<List<VendorsVehicleHistory>> VendorVehicleHistoryByMonth(int VendorId)
{
    try
    {
        using (var context = new VendorsContext(_configuration))
        {
            var VendorHistory = await (
                from sells_billing in context.SellsBillings
                join sells in context.Sells on sells_billing.SellId equals sells.Id
                join Vendor_Vehicles in context.Vehicles
                    on sells.VehicleId equals Vendor_Vehicles.Id
                join Vendors in context.Vendors
                    on Vendor_Vehicles.VendorId equals Vendors.Id
                where Vendors.Id == VendorId
                group sells_billing by new
                {
                    sells_billing.Date.Month,
                    Vendor_Vehicles.VehicleNumber,
                    sells_billing.Date.Year
                } into g
                orderby g.Key.Month
                select new VendorsVehicleHistory()
                {
                    TotalFreightCharges = g.Sum(s => s.FreightCharges),
                    Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(g.Key.Month),
                    VehicleNumber = g.Key.VehicleNumber,
                    Year = g.Key.Year
                }
            ).ToListAsync();

            return VendorHistory;
        }
    }
    catch (Exception e)
    {
        throw e;
    }
}

//used for piechart -all Vehicles revenue per year of one Vendor
public async Task<List<VendorsVehicleHistory>> VendorVehicleHistoryByYear(int VendorId)
{
    try
    {
        using (var context = new VendorsContext(_configuration))
        {
            var VendorHistory = await (
                from sells_billing in context.SellsBillings
                join sells in context.Sells on sells_billing.SellId equals sells.Id
                join Vendor_Vehicles in context.Vehicles
                    on sells.VehicleId equals Vendor_Vehicles.Id
                join Vendors in context.Vendors
                    on Vendor_Vehicles.VendorId equals Vendors.Id
                where Vendors.Id == VendorId
                group sells_billing by new
                {
                    Vendor_Vehicles.VehicleNumber,
                    sells_billing.Date.Year
                } into g
                select new VendorsVehicleHistory()
                {
                    TotalFreightCharges = g.Sum(s => s.FreightCharges),
                    VehicleNumber = g.Key.VehicleNumber,
                    Year = g.Key.Year
                }
            ).ToListAsync();

            return VendorHistory;
        }
    }
    catch (Exception e)
    {
        throw e;
    }
}

// Vehicle orders count  per month of a Vendor
public async Task<List<VendorOrderCount>> VendorVehicleOrdersPerMonth(int VendorId)
{
    try
    {
        using (var context = new VendorsContext(_configuration))
        {
            var VendorOrdersCount = await (
                from sell in context.Sells
                join Vehicle in context.Vehicles on sell.VehicleId equals Vehicle.Id
                where Vehicle.VendorId == VendorId
                group sell by new
                {
                    sell.Date.Year,
                    sell.Date.Month,
                    sell.VehicleId
                } into billingGroup
                orderby billingGroup.Key.Month, billingGroup.Key.Year descending
                select new VendorOrderCount()
                {
                    Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(
                        billingGroup.Key.Month
                    ),
                    Year = billingGroup.Key.Year,
                    OrderCount = billingGroup.Count(),
                    VehicleNumber = (
                        from Vehicle in context.Vehicles
                        where Vehicle.Id == billingGroup.Key.VehicleId
                        select Vehicle.VehicleNumber
                    ).FirstOrDefault()
                }
            ).ToListAsync();
            return VendorOrdersCount;
        }
    }
    catch (Exception e)
    {
        throw e;
    }
}

// for getting all Vehicles of Vendor
public async Task<List<Vehicle>> GetVendorsVehicles(int VendorId)
{
    try
    {
        using (var context = new VendorsContext(_configuration))
        {
            var VendorVehicles = await (
                from Vendors in context.Vendors
                join VendorVehicle in context.Vehicles
                    on Vendors.Id equals VendorVehicle.VendorId
                where Vendors.Id == VendorId
                select VendorVehicle
            ).ToListAsync();
            return VendorVehicles;
        }
    }
    catch (Exception e)
    {
        throw e;
    }
}
public async Task<bool> Update(int vendorId, Vendor vendor)
{
    bool status = false;
    try
    {
        using (var context = new VendorsContext(_configuration))
        {
            Vendor oldVendor = await context.Vendors.FindAsync(vendorId);
            if (oldVendor != null)
            {
                oldVendor.CompanyName = vendor.CompanyName;
                oldVendor.TransportId = vendor.TransportId;
                await context.SaveChangesAsync();
                status = true;
            }
        }
    }
    catch (Exception e)
    {
        throw e;
        System.Console.WriteLine(e);
    }
    return status;
}
public async Task<bool> Delete(int vendorId)
{
    bool status = false;
    try
    {
        using (var context = new VendorsContext(_configuration))
        {
            Vendor? vendor = await context.Vendors.FindAsync(vendorId);
            if (vendor != null)
            {
                context.Vendors.Remove(vendor);
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



}