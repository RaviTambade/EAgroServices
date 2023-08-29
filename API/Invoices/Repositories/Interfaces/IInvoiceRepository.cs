using Transflower.Invoices.Extensions;
using Transflower.Invoices.Models;
using Transflower.Invoices.Entities;


namespace Transflower.Invoices.Repositories.Interfaces;

public interface IInvoiceRepository
{
    Task<List<InvoiceDetail>> GetAll(int merchantId, string paymentStatus);
    Task<FarmerInvoice?> GetInvoice(int collectionId);
    Task<InvoiceChargesDetail?> GetById(int invoiceId);
    Task<PagedList<CollectionCenterInvoice>> GetCollectionCenterInvoices(int collectionCenterId, string status, FilterRequest request, int pageNumber);
    Task<CollectionCenterInvoiceDetail?> GetCollectionCenterInvoiceDetails(int collectionCenterId, int invoiceId);
    Task<bool> Insert(Invoice invoice);
    Task<bool> Update(int invoiceId, UpdateRate rate);
    Task<bool> Delete(int invoiceId);
}

