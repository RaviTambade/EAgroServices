using Invoices.Models;
using Invoices.Repositories.Interfaces;
using Invoices.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Invoices.Repositories
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly IConfiguration _configuration;

        public InvoiceRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<InvoiceDetails>> GetAll(int merchantId, string paymentStatus)
        {
            try
            {
                using (var context = new InvoiceContext(_configuration))
                {
                    var invoices = await (
                        from invoice in context.Invoices
                        join shipmentItem in context.ShipmentItems
                            on invoice.ShipmentItemId equals shipmentItem.Id
                        join shipment in context.Shipments
                            on shipmentItem.ShipmentId equals shipment.Id
                        join collection in context.GoodsCollections
                            on shipmentItem.CollectionId equals collection.Id
                        join verifiedCollection in context.VerifiedCollections
                            on collection.Id equals verifiedCollection.CollectionId
                        join crop in context.Crops on collection.CropId equals crop.Id
                        where
                            shipment.MerchantId == merchantId
                            && invoice.PaymentStatus == paymentStatus
                        select new InvoiceDetails()
                        {
                            Id = invoice.Id,
                            FarmerId = collection.FarmerId,
                            CropName = crop.Title,
                            Quantity = collection.Quantity,
                            Weight = verifiedCollection.Weight,
                            RatePerKg = invoice.RatePerKg,
                            PaymentStatus = invoice.PaymentStatus,
                            TotalAmount = invoice.TotalAmount,
                            InvoiceDate = invoice.InvoiceDate
                        }
                    ).ToListAsync();

                    if (invoices is null)
                    {
                        return null;
                    }
                    return invoices;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<InvoiceDetails>> GetCollectionCenterInvoices(int collectionCenterId)
        {
            try
            {
                using (var context = new InvoiceContext(_configuration))
                {
                    var invoices = await (
                        from invoice in context.Invoices
                        join shipmentItem in context.ShipmentItems
                            on invoice.ShipmentItemId equals shipmentItem.Id
                        join shipment in context.Shipments
                            on shipmentItem.ShipmentId equals shipment.Id
                        join charges in context.Costing
                            on shipmentItem.Id equals charges.ShipmentItemId
                        join merchant in context.Merchants on shipment.MerchantId equals merchant.Id
                        join collection in context.GoodsCollections
                            on shipmentItem.CollectionId equals collection.Id
                        join verifiedCollection in context.VerifiedCollections
                            on collection.Id equals verifiedCollection.CollectionId
                        join crop in context.Crops on collection.CropId equals crop.Id
                        where
                            collection.CollectionCenterId == collectionCenterId
                            && invoice.PaymentStatus == "paid"
                        select new InvoiceDetails()
                        {
                            Id = invoice.Id,
                            MerchantCorporateId = merchant.CorporateId,
                            FarmerId = collection.FarmerId,
                            CropName = crop.Title,
                            Quantity = collection.Quantity,
                            Weight = verifiedCollection.Weight,
                            RatePerKg = invoice.RatePerKg,
                            // PaymentStatus = invoice.PaymentStatus,
                            TotalAmount = charges.ServiceCharges + charges.LabourCharges,
                            InvoiceDate = invoice.InvoiceDate
                        }
                    ).ToListAsync();

                    if (invoices is null)
                    {
                        return null;
                    }
                    return invoices;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<InvoiceChargesDetails> GetById(int invoiceId)
        {
            try
            {
                using (var context = new InvoiceContext(_configuration))
                {
                    var invoiceDetails = await (
                        from invoice in context.Invoices
                        join shipmentItem in context.ShipmentItems
                            on invoice.ShipmentItemId equals shipmentItem.Id
                        join charges in context.Costing
                            on shipmentItem.Id equals charges.ShipmentItemId
                        join shipment in context.Shipments
                            on shipmentItem.ShipmentId equals shipment.Id
                        join vehicle in context.Vehicles on shipment.VehicleId equals vehicle.Id
                        join transporter in context.Transporters
                            on vehicle.TransporterId equals transporter.Id
                        join collection in context.GoodsCollections
                            on shipmentItem.CollectionId equals collection.Id
                        join collectionCenter in context.CollectionCenters
                            on collection.CollectionCenterId equals collectionCenter.Id
                        join verifiedCollection in context.VerifiedCollections
                            on collection.Id equals verifiedCollection.CollectionId
                        join crop in context.Crops on collection.CropId equals crop.Id
                        where invoice.Id == invoiceId
                        select new InvoiceChargesDetails()
                        {
                            Id = invoice.Id,
                            FarmerId = collection.FarmerId,
                            CollectionId = collection.Id,
                            CollectionCenterCorporateId = collectionCenter.CorporateId,
                            TransporterCorporateId = transporter.CorporateId,
                            VehicleNumber = vehicle.RtoNumber,
                            CropName = crop.Title,
                            Grade = verifiedCollection.Grade,
                            ContainerType = collection.ContainerType,
                            Quantity = collection.Quantity,
                            TotalWeight = collection.Weight,
                            NetWeight = verifiedCollection.Weight,
                            FreightCharges = charges.FreightCharges,
                            LabourCharges = charges.LabourCharges,
                            PaymentStatus = invoice.PaymentStatus,
                            ServiceCharges = charges.ServiceCharges,
                            RatePerKg = invoice.RatePerKg,
                            FarmerAmount = invoice.TotalAmount,
                            InvoiceDate = invoice.InvoiceDate
                        }
                    ).FirstOrDefaultAsync();

                    return invoiceDetails;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<InvoiceChargesDetails> GetInvoice(int collectionId)
        {
            try
            {
                using (var context = new InvoiceContext(_configuration))
                {
                    var invoiceDetails = await (
                        from invoice in context.Invoices
                        join shipmentItem in context.ShipmentItems
                            on invoice.ShipmentItemId equals shipmentItem.Id
                        join charges in context.Costing
                            on shipmentItem.Id equals charges.ShipmentItemId
                        join shipment in context.Shipments
                            on shipmentItem.ShipmentId equals shipment.Id
                        join vehicle in context.Vehicles on shipment.VehicleId equals vehicle.Id
                        join transporter in context.Transporters
                            on vehicle.TransporterId equals transporter.Id
                        join collection in context.GoodsCollections
                            on shipmentItem.CollectionId equals collection.Id
                        join collectionCenter in context.CollectionCenters
                            on collection.CollectionCenterId equals collectionCenter.Id
                        join verifiedCollection in context.VerifiedCollections
                            on collection.Id equals verifiedCollection.CollectionId
                        join crop in context.Crops on collection.CropId equals crop.Id
                        where shipmentItem.CollectionId == collectionId
                        select new InvoiceChargesDetails()
                        {
                            Id = invoice.Id,
                            FarmerId = collection.FarmerId,
                            CollectionId = collection.Id,
                            CollectionCenterCorporateId = collectionCenter.CorporateId,
                            TransporterCorporateId = transporter.CorporateId,
                            VehicleNumber = vehicle.RtoNumber,
                            CropName = crop.Title,
                            Grade = verifiedCollection.Grade,
                            ContainerType = collection.ContainerType,
                            Quantity = collection.Quantity,
                            TotalWeight = collection.Weight,
                            NetWeight = verifiedCollection.Weight,
                            FreightCharges = charges.FreightCharges,
                            LabourCharges = charges.LabourCharges,
                            PaymentStatus = invoice.PaymentStatus,
                            ServiceCharges = charges.ServiceCharges,
                            RatePerKg = invoice.RatePerKg,
                            FarmerAmount = invoice.TotalAmount,
                            InvoiceDate = invoice.InvoiceDate
                        }
                    ).FirstOrDefaultAsync();
                    return invoiceDetails;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Insert(Invoice invoice)
        {
            try
            {
                bool status = false;
                using (var context = new InvoiceContext(_configuration))
                {
                    await context.Invoices.AddAsync(invoice);
                    status = await SaveChanges(context);
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Update(int invoiceId, UpdateRate rate)
        {
            try
            {
                bool status = false;
                using (var context = new InvoiceContext(_configuration))
                {
                    var oldInvoice = await context.Invoices.FindAsync(invoiceId);
                    if (oldInvoice is not null)
                    {
                        oldInvoice.RatePerKg = rate.RatePerKg;
                        status = await SaveChanges(context);
                    }
                    if (status)
                        context.Database.ExecuteSqlRaw(
                            "CALL calculate_total_amount(@p0)",
                            invoiceId
                        );
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Delete(int invoiceId)
        {
            try
            {
                bool status = false;
                using (var context = new InvoiceContext(_configuration))
                {
                    var invoice = await context.Invoices.FindAsync(invoiceId);
                    if (invoice is not null)
                    {
                        context.Invoices.Remove(invoice);
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

        private async Task<bool> SaveChanges(InvoiceContext context)
        {
            int rowsAffected = await context.SaveChangesAsync();
            if (rowsAffected > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<CollectionCenterInvoiceDetails> GetCollectionCenterInvoiceDetails(
            int collectionCenterId,
            int invoiceId
        )
        {
            try
            {
                using (var context = new InvoiceContext(_configuration))
                {
                    var invoiceDetails = await (
                        from invoice in context.Invoices
                        join shipmentItem in context.ShipmentItems
                            on invoice.ShipmentItemId equals shipmentItem.Id
                        join charges in context.Costing
                            on shipmentItem.Id equals charges.ShipmentItemId
                        join shipment in context.Shipments
                            on shipmentItem.ShipmentId equals shipment.Id
                        join merchant in context.Merchants on shipment.MerchantId equals merchant.Id
                        join vehicle in context.Vehicles on shipment.VehicleId equals vehicle.Id
                        join transporter in context.Transporters
                            on vehicle.TransporterId equals transporter.Id
                        join collection in context.GoodsCollections
                            on shipmentItem.CollectionId equals collection.Id
                        join collectionCenter in context.CollectionCenters
                            on collection.CollectionCenterId equals collectionCenter.Id
                        join verifiedCollection in context.VerifiedCollections
                            on collection.Id equals verifiedCollection.CollectionId
                        join crop in context.Crops on collection.CropId equals crop.Id
                        where
                            invoice.Id == invoiceId
                            && collection.CollectionCenterId == collectionCenterId
                        select new CollectionCenterInvoiceDetails()
                        {
                            FarmerId = collection.FarmerId,
                            MerchantCorporateId = merchant.CorporateId,
                            TransporterCorporateId = transporter.CorporateId,
                            VehicleNumber = vehicle.RtoNumber,
                            CropName = crop.Title,
                            Grade = verifiedCollection.Grade,
                            ContainerType = collection.ContainerType,
                            Quantity = collection.Quantity,
                            TotalWeight = collection.Weight,
                            NetWeight = verifiedCollection.Weight,
                            FreightCharges = charges.FreightCharges,
                            LabourCharges = charges.LabourCharges,
                            ServiceCharges = charges.ServiceCharges,
                            RatePerKg = invoice.RatePerKg,
                            FarmerAmount = invoice.TotalAmount,
                            InvoiceDate = invoice.InvoiceDate
                        }
                    ).FirstOrDefaultAsync();

                    return invoiceDetails;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
