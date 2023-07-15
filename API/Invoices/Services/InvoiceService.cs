
using Invoices.Services.Interfaces;
using Invoices.Repositories.Interfaces;
using Invoices.Models;

namespace Invoices.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IInvoiceRepository _repo;

        public InvoiceService(IInvoiceRepository repo)
        {
            _repo = repo;
        }
         public async Task<List<InvoiceDetails>> GetAll(int merchantId, string paymentStatus)
        {
            return await _repo.GetAll(merchantId,paymentStatus);
        }

        public async Task<InvoiceChargesDetails> GetById(int invoiceId)
        {
            return await _repo.GetById(invoiceId);
        }

        public async Task<bool> Insert(Invoice invoice)
        {
            return await _repo.Insert(invoice);
        }

        public async Task<bool> Update(int invoiceId,UpdateRate rate)
        {
            return await _repo.Update(invoiceId,rate);
        }

        public async Task<bool> Delete(int invoiceId)
        {
            return await _repo.Delete(invoiceId);
        }
    }
}