using Invoices.Extensions;
using Invoices.Models;
using Invoices.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Invoices.Controllers
{
    [ApiController]
    [Route("/api/invoices")]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _srv;

        public InvoiceController(IInvoiceService srv)
        {
            _srv = srv;
        }

        [HttpGet("merchant/{merchantId}/status/{paymentStatus}")]
        public async Task<List<InvoiceDetails>> GetAll(int merchantId, string paymentStatus)
        {
            return await _srv.GetAll(merchantId, paymentStatus);
        }

        [HttpGet("collectioninvoice/{collectionId}")]
        public async Task<FarmerInvoice> GetInvoice(int collectionId)
        {
            return await _srv.GetInvoice(collectionId);
        }

        [HttpGet("details/{invoiceId}")]
        public async Task<InvoiceChargesDetails> GetById(int invoiceId)
        {
            return await _srv.GetById(invoiceId);
        }

        [HttpPost("collectionCenter/{collectionCenterId}/status/{status}")]
        public async Task<List<CollectionCenterInvoice>> GetCollectionCenterInvoices(
            int collectionCenterId,
            string status,
            [FromBody] FilterRequest request,
            [FromQuery] int pageNumber
        )
        {
            var invoices= await _srv.GetCollectionCenterInvoices(collectionCenterId, status,request,pageNumber);
            Response.AddPaginationHeader(invoices);
            return invoices;
        }

        [HttpPost]
        public async Task<bool> Insert(Invoice invoice)
        {
            return await _srv.Insert(invoice);
        }

        [HttpPatch("rate/{invoiceId}")]
        public async Task<bool> Update(int invoiceId, UpdateRate rate)
        {
            if (rate.RatePerKg < 0)
                return false;
            return await _srv.Update(invoiceId, rate);
        }

        [HttpDelete("{invoiceId}")]
        public async Task<bool> Delete(int invoiceId)
        {
            return await _srv.Delete(invoiceId);
        }

        [HttpGet("collectionCenter/{collectionCenterId}/invoice/{invoiceId}")]
        public async Task<CollectionCenterInvoiceDetails> GetCollectionCenterInvoiceDetails(
            int collectionCenterId,
            int invoiceId
        )
        {
            return await _srv.GetCollectionCenterInvoiceDetails(collectionCenterId, invoiceId);
        }
    }
}
