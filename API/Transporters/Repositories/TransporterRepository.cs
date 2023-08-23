using Transporters.Models;
using Transporters.Repositories.Interfaces;
using Transporters.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.VisualBasic.FileIO;
using System.Globalization;
using System.Runtime.Serialization;

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
                    return transporters;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<TransporterCorporate>> GetTransporterAndCorporateId()
        {
            try
            {
                using (var context = new TransporterContext(_configuration))
                {
                    return await context.Transporters
                        .Select(
                            transporter =>
                                new TransporterCorporate()
                                {
                                    Id = transporter.Id,
                                    CorporateId = transporter.CorporateId
                                }
                        )
                        .ToListAsync();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<Transporter?> GetById(int transporterId)
        {
            try
            {
                using (var context = new TransporterContext(_configuration))
                {
                    var transporter = await context.Transporters.FindAsync(transporterId);
                    return transporter;
                }
            }
            catch (Exception)
            {
                throw ;
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
                    status = await SaveChanges(context);
                }
                return status;
            }
            catch (Exception)
            {
                throw ;
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
                        status = await SaveChanges(context);
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
                        status = await SaveChanges(context);
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private async Task<bool> SaveChanges(TransporterContext context)
        {
            int rowsAffected = await context.SaveChangesAsync();
            if (rowsAffected > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<List<Vehicle>> GetTransportersVehicles(int transporterId)
        {
            try
            {
                using (var context = new TransporterContext(_configuration))
                {
                    var vehicles = await (
                        from transporter in context.Transporters
                        join vehicle in context.Vehicles
                            on transporter.Id equals vehicle.TransporterId
                        where transporter.Id == transporterId
                        select vehicle
                    ).ToListAsync();
                    return vehicles;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<int> GetTransporterId(int managerId)
        {
            try
            {
                using (var context = new TransporterContext(_configuration))
                {
                    int userId = await (
                        from transporter in context.Transporters
                        where transporter.ManagerId == managerId
                        select transporter.Id
                    ).FirstOrDefaultAsync();
                    return userId;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<int> GetCorporateIdOfTransporter(int transporterId)
        {
            try
            {
                using (var context = new TransporterContext(_configuration))
                {
                    int corporateId = await (
                        from transporter in context.Transporters
                        where transporter.Id == transporterId
                        select transporter.CorporateId
                    ).FirstOrDefaultAsync();
                    return corporateId;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<VehicleRevenue>> GetVehicleRevenues(int transporterId)
        {
            try
            {
                using (var context = new TransporterContext(_configuration))
                {
                    var revenues = await (
                        from vehicle in context.Vehicles
                        join transporter in context.Transporters
                            on vehicle.TransporterId equals transporter.Id
                        join shipment in context.Shipments on vehicle.Id equals shipment.VehicleId
                        join transporterpayment in context.TransporterPayments
                            on shipment.Id equals transporterpayment.ShipmentId
                        join payment in context.Payments
                            on transporterpayment.PaymentId equals payment.Id
                        where transporter.Id == transporterId
                        group new
                        {
                            vehicle,
                            shipment,
                            transporter,
                            transporterpayment,
                            payment
                        } by vehicle.RtoNumber into RtoNumberGroup
                        select new VehicleRevenue
                        {
                            RtoNumber = RtoNumberGroup.Key,
                            Amount = RtoNumberGroup.Sum(p => p.payment.Amount)
                        }
                    ).ToListAsync();
                    return revenues;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<TransporterRevenue>> GetTransporterRevenues(int transporterId)
        {
            try
            {
                using (var context = new TransporterContext(_configuration))
                {
                    var revenues = await (
                        from shipment in context.Shipments
                        join vehicle in context.Vehicles on shipment.VehicleId equals vehicle.Id
                        join transporter in context.Transporters
                            on vehicle.TransporterId equals transporter.Id
                        join transporterPayment in context.TransporterPayments
                            on shipment.Id equals transporterPayment.ShipmentId
                        join payment in context.Payments
                            on transporterPayment.PaymentId equals payment.Id
                        where transporter.Id == transporterId
                        group new { shipment, payment } by shipment.ShipmentDate.Month into g
                        orderby g.Key
                        select new TransporterRevenue()
                        {
                            MonthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(
                                g.Key
                            ),
                            Amount = g.Sum(item => item.payment.Amount)
                        }
                    ).ToListAsync();
                    return revenues;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<ShipmentCount>> GetShipmentCounts(int transporterId)
        {
            try
            {
                using (var context = new TransporterContext(_configuration))
                {
                    var shipmentCounts = await (
                        from shipment in context.Shipments
                        join vehicle in context.Vehicles on shipment.VehicleId equals vehicle.Id
                        join transporter in context.Transporters
                            on vehicle.TransporterId equals transporter.Id
                        join transporterPayment in context.TransporterPayments
                            on shipment.Id equals transporterPayment.ShipmentId
                        join payment in context.Payments
                            on transporterPayment.PaymentId equals payment.Id
                        where transporter.Id == transporterId && shipment.Status == "delivered"
                         group  shipment by new   { shipment.ShipmentDate.Year,shipment.ShipmentDate.Month } into g
                         orderby g.Key.Year,g.Key.Month
                        select new ShipmentCount()
                        {
                            MonthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(
                                g.Key.Month
                            ),
                            Count = g.Count(),
                            Year=g.Key.Year
                        }
                    ).ToListAsync();
                    return shipmentCounts;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<TransporterInvoice>> GetTransporterInvoices(int transporterId)
        {
            try{
                using(var context=new TransporterContext(_configuration)){
                    List<TransporterInvoice> invoices=await(from transporter in context.Transporters
                                                      join vehicle in context.Vehicles
                                                      on transporter.Id equals vehicle.TransporterId
                                                      join shipment in context.Shipments 
                                                      on vehicle.Id equals shipment.VehicleId
                                                      join shipmentitem in context.ShipmentItems
                                                      on shipment.Id equals shipmentitem.ShipmentId
                                                      join goodscosting in context.GoodsCostings
                                                      on shipmentitem.Id equals goodscosting.ShipmentItemId
                                                      join invoice in context.Invoices
                                                      on shipmentitem.Id equals invoice.ShipmentItemId
                                                      where transporter.Id==transporterId
                                                      group new{shipment,shipmentitem,goodscosting,invoice} by  shipmentitem.ShipmentId  into g
                                                      orderby g.Key
                                           select new TransporterInvoice()
                                           {
                                               MerchantId=g.FirstOrDefault().shipment.MerchantId,
                                               Date=g.FirstOrDefault().shipment.ShipmentDate,
                                               FreightCharges= g.FirstOrDefault().goodscosting.FreightCharges,
                                               PaymentStatus=g.FirstOrDefault().invoice.PaymentStatus
                                           }).ToListAsync();
                                           return invoices;
                }
            }
            catch(Exception){
                throw;
            }
        }
    }
}


