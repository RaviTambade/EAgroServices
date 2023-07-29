using Invoices.Models;

namespace Invoices.Repositories.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<List<InvoiceDetails>> GetAll(int merchantId,string paymentStatus);
        Task<InvoiceChargesDetails> GetInvoice(int collectionId);
        Task<InvoiceChargesDetails> GetById(int invoiceId);

        Task<bool> Insert(Invoice invoice);
        Task<bool> Update(int invoiceId,UpdateRate rate);
        Task<bool> Delete(int invoiceId);
    }
}
