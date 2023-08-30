using Transflower.EAgroServices.Transporters.Models;
using Transflower.EAgroServices.Transporters.Repositories.Interfaces;
using Transflower.EAgroServices.Transporters.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using Transflower.EAgroServices.Transporters.Entities;

namespace Transflower.EAgroServices.Transporters.Repositories;

public class TransporterRepository : ITransporterRepository
{
    private readonly TransporterContext _context;

    public TransporterRepository(TransporterContext context)
    {
        _context = context;
    }

    public async Task<List<Transporter>> GetAll()
    {
        try
        {
            var transporters = await _context.Transporters.ToListAsync();
            return transporters;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<TransporterCorporate>> GetTransporterAndCorporateId()
    {
        try
        {
            var transporterCorporates = await _context.Transporters
                .Select(
                    transporter =>
                        new TransporterCorporate()
                        {
                            Id = transporter.Id,
                            CorporateId = transporter.CorporateId
                        }
                )
                .ToListAsync();
            return transporterCorporates;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<Transporter?> GetById(int transporterId)
    {
        try
        {
            var transporter = await _context.Transporters.FindAsync(transporterId);
            return transporter;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> Insert(Transporter transporter)
    {
        bool status = false;
        try
        {
            await _context.Transporters.AddAsync(transporter);
            status = await SaveChanges(_context);
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<bool> Update(Transporter transporter)
    {
        bool status = false;
        try
        {
            var oldTransporter = await _context.Transporters.FindAsync(transporter.Id);
            if (oldTransporter is not null)
            {
                oldTransporter.CorporateId = transporter.CorporateId;
                oldTransporter.ManagerId = transporter.ManagerId;
                status = await SaveChanges(_context);
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    public async Task<bool> Delete(int transporterId)
    {
        bool status = false;
        try
        {
            var transporter = await _context.Transporters.FindAsync(transporterId);
            if (transporter is not null)
            {
                _context.Transporters.Remove(transporter);
                status = await SaveChanges(_context);
            }
        }
        catch (Exception)
        {
            throw;
        }
        return status;
    }

    private async Task<bool> SaveChanges(TransporterContext _context)
    {
        int rowsAffected = await _context.SaveChangesAsync();
        return rowsAffected > 0;
    }

    public async Task<List<Vehicle>> GetTransportersVehicles(int transporterId)
    {
        try
        {
            var vehicles = await (
                from transporter in _context.Transporters
                join vehicle in _context.Vehicles on transporter.Id equals vehicle.TransporterId
                where transporter.Id == transporterId
                select vehicle
            ).ToListAsync();
            return vehicles;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<int> GetTransporterId(int managerId)
    {
        try
        {
            int transporterId = await (
                from transporter in _context.Transporters
                where transporter.ManagerId == managerId
                select transporter.Id
            ).FirstOrDefaultAsync();
            return transporterId;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<int> GetCorporateIdOfTransporter(int transporterId)
    {
        try
        {
            int corporateId = await (
                from transporter in _context.Transporters
                where transporter.Id == transporterId
                select transporter.CorporateId
            ).FirstOrDefaultAsync();
            return corporateId;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<List<TransporterInvoice>> GetTransporterInvoices(
        int transporterId,
        string paymentStatus
    )
    {
        try
        {
            var transporterInvoices = await (
                from transporter in _context.Transporters
                join vehicle in _context.Vehicles on transporter.Id equals vehicle.TransporterId
                join shipment in _context.Shipments on vehicle.Id equals shipment.VehicleId
                join merchant in _context.Merchants on shipment.MerchantId equals merchant.Id
                where transporter.Id == transporterId && shipment.Status == ShipmentStatus.Delivered
                let calculatedPaymentStatus = _context.TransporterPayments.Any(
                    tp => tp.ShipmentId == shipment.Id
                )
                    ? PaymentStatus.Paid
                    : PaymentStatus.UnPaid
                where calculatedPaymentStatus == paymentStatus
                select new TransporterInvoice()
                {
                    CorporateId = merchant.CorporateId,
                    Date = shipment.ShipmentDate,
                    FreightCharges = _context.TotalFreightCharges(shipment.Id),
                    PaymentStatus = paymentStatus
                }
            ).ToListAsync();
            return transporterInvoices;
        }
        catch (Exception)
        {
            throw;
        }
    }
}
