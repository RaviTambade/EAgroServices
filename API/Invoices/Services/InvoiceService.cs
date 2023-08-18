using Invoices.Services.Interfaces;
using Invoices.Repositories.Interfaces;
using Invoices.Models;
using ZstdNet;
using Invoices.Extensions;

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
            return await _repo.GetAll(merchantId, paymentStatus);
        }

        public async Task<FarmerInvoice> GetInvoice(int collectionId)
        {
            return await _repo.GetInvoice(collectionId);
        }

        public async Task<InvoiceChargesDetails> GetById(int invoiceId)
        {
            return await _repo.GetById(invoiceId);
        }

        public async Task<bool> Insert(Invoice invoice)
        {
            return await _repo.Insert(invoice);
        }

        public async Task<bool> Update(int invoiceId, UpdateRate rate)
        {
            return await _repo.Update(invoiceId, rate);
        }

        public async Task<bool> Delete(int invoiceId)
        {
            return await _repo.Delete(invoiceId);
        }

        public async Task<CollectionCenterInvoiceDetails> GetCollectionCenterInvoiceDetails(
            int collectionCenterId,
            int invoiceId
        )
        {
            return await _repo.GetCollectionCenterInvoiceDetails(collectionCenterId, invoiceId);
        }

        public async Task<PagedList<CollectionCenterInvoice>> GetCollectionCenterInvoices(
            int collectionCenterId,
            string status,
            FilterRequest request,
            int pageNumber
        )
        {
            return await _repo.GetCollectionCenterInvoices(
                collectionCenterId,
                status,
                request,
                pageNumber
            );
        }
    }
}
