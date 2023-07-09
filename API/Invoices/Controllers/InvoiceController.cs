
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
         [HttpGet]
        public async Task<List<Invoice>> GetAll()
        {
            return await _srv.GetAll();
        }

        [HttpGet("{invoiceId}")]
        public async Task<Invoice> GetById(int invoiceId)
        {
            return await _srv.GetById(invoiceId);
        }

        [HttpPost]
        public async Task<bool> Insert(Invoice invoice)
        {
            return await _srv.Insert(invoice);
        }

        [HttpPut]
        public async Task<bool> Update(Invoice invoice)
        {
            return await _srv.Update(invoice);
        }

        [HttpDelete("{invoiceId}")]
        public async Task<bool> Delete(int invoiceId)
        {
            return await _srv.Delete(invoiceId);
        }

    }
}