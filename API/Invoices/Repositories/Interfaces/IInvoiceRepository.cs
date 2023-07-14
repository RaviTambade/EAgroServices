using Invoices.Models;

namespace Invoices.Repositories.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<List<InvoiceDetails>> GetAll(int merchantId);
        Task<InvoiceChargesDetails> GetById(int invoiceId);

        Task<bool> Insert(Invoice invoice);
        Task<bool> Update(int invoiceId,UpdateRate rate);
        Task<bool> Delete(int invoiceId);
    }
}
