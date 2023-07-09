using Invoices.Models;

namespace Invoices.Repositories.Interfaces
{
    public interface IInvoiceRepository
    {
        Task<List<Invoice>> GetAll();
        Task<Invoice> GetById(int invoiceId);
        Task<bool> Insert(Invoice invoice);
        Task<bool> Update(Invoice invoice);
        Task<bool> Delete(int invoiceId);
    }
}
