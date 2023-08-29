using Transflower.Invoices.Services.Interfaces;
using Transflower.Invoices.Repositories.Interfaces;
using Transflower.Invoices.Models;
using Transflower.Invoices.Extensions;
using Transflower.Invoices.Entities;

namespace Transflower.Invoices.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IInvoiceRepository _repository;

        public InvoiceService(IInvoiceRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<InvoiceDetail>> GetAll(int merchantId, string paymentStatus)
        {
            return await _repository.GetAll(merchantId, paymentStatus);
        }

        public async Task<FarmerInvoice?> GetInvoice(int collectionId)
        {
            return await _repository.GetInvoice(collectionId);
        }

        public async Task<InvoiceChargesDetail?> GetById(int invoiceId)
        {
            return await _repository.GetById(invoiceId);
        }

        public async Task<bool> Insert(Invoice invoice)
        {
            return await _repository.Insert(invoice);
        }

        public async Task<bool> Update(int invoiceId, UpdateRate rate)
        {
            return await _repository.Update(invoiceId, rate);
        }

        public async Task<bool> Delete(int invoiceId)
        {
            return await _repository.Delete(invoiceId);
        }

        public async Task<CollectionCenterInvoiceDetail?> GetCollectionCenterInvoiceDetails(
            int collectionCenterId,
            int invoiceId
        )
        {
            return await _repository.GetCollectionCenterInvoiceDetails(collectionCenterId, invoiceId);
        }

        public async Task<PagedList<CollectionCenterInvoice>> GetCollectionCenterInvoices(
            int collectionCenterId,
            string status,
            FilterRequest request,
            int pageNumber
        )
        {
            return await _repository.GetCollectionCenterInvoices(
                collectionCenterId,
                status,
                request,
                pageNumber
            );
        }
    }
}
