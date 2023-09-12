using Transflower.Invoices.Entities;
using Transflower.Invoices.Extensions;
using Transflower.Invoices.Models;
using Transflower.Invoices.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Transflower.Invoices.Controllers
{
    [ApiController]
    [Route("/api/invoices")]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _service;

        public InvoiceController(IInvoiceService service)
        {
            _service = service;
        }

        [HttpGet("merchant/{merchantId}/status/{paymentStatus}")]
        public async Task<List<InvoiceDetail>> GetAll(int merchantId, string paymentStatus)
        {
            return await _service.GetAll(merchantId, paymentStatus);
        }

        [HttpGet("collectioninvoice/{collectionId}")]

        public async Task<FarmerInvoice?> GetInvoice(int collectionId)
        {
            return await _service.GetInvoice(collectionId);
        }
        [HttpGet("farmerinvoicelist/{farmerId}")]

        public async Task<List<FarmerInvoiceList?>> GetInvoiceList(int farmerId)
        {
            return await _service.GetInvoiceList(farmerId);
        }

        [HttpGet("details/{invoiceId}")]
        public async Task<InvoiceChargesDetail?> GetById(int invoiceId)
        {
            return await _service.GetById(invoiceId);
        }

        [HttpPost("collectionCenter/{collectionCenterId}/status/{status}")]
        public async Task<List<CollectionCenterInvoice>> GetCollectionCenterInvoices(
            int collectionCenterId,
            string status,
            [FromBody] FilterRequest request,
            [FromQuery] int pageNumber
        )
        {
            var invoices = await _service.GetCollectionCenterInvoices(
                collectionCenterId,
                status,
                request,
                pageNumber
            );
            Response.AddPaginationHeader(invoices);
            return invoices;
        }

        [HttpPost]
        public async Task<bool> Insert(Invoice invoice)
        {
            return await _service.Insert(invoice);
        }

        [HttpPatch("rate/{invoiceId}")]
        public async Task<bool> Update(int invoiceId, UpdateRate rate)
        {
            if (rate.RatePerKg < 0)
                return false;
            return await _service.Update(invoiceId, rate);
        }

        [HttpDelete("{invoiceId}")]
        public async Task<bool> Delete(int invoiceId)
        {
            return await _service.Delete(invoiceId);
        }

        [HttpGet("collectionCenter/{collectionCenterId}/invoice/{invoiceId}")]
        public async Task<CollectionCenterInvoiceDetail?> GetCollectionCenterInvoiceDetails(
            int collectionCenterId,
            int invoiceId
        )
        {
            return await _service.GetCollectionCenterInvoiceDetails(collectionCenterId, invoiceId);
        }
    }
}
