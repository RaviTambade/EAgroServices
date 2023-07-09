
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
         public async Task<List<Invoice>> GetAll()
        {
            try
            {
                using (var context = new InvoiceContext(_configuration))
                {
                    var invoices = await context.Invoices.ToListAsync();
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

        public async Task<Invoice> GetById(int invoiceId)
        {
            try
            {
                using (var context = new InvoiceContext(_configuration))
                {
                    var invoice = await context.Invoices.FindAsync(invoiceId);

                    if (invoice is null)
                    {
                        return null;
                    }

                    return invoice;
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

        public async Task<bool> Update(Invoice invoice)
        {
            try
            {
                bool status = false;
                using (var context = new InvoiceContext(_configuration))
                {
                    var oldInvoice = await context.Invoices.FindAsync(invoice.Id);
                    if (oldInvoice is not null)
                    {
                        oldInvoice.ShipmentItemId = invoice.ShipmentItemId;
                        oldInvoice.RatePerKg = invoice.RatePerKg;
                        oldInvoice.TotalAmount = invoice.TotalAmount;
                        oldInvoice.InvoiceDate = invoice.InvoiceDate;
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
    }
}