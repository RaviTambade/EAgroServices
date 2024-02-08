using Microsoft.AspNetCore.Mvc;
using Intranet.Services.Interfaces;
using Intranet.Entities;

namespace Intranet.Controllers;

[ApiController]
[Route("[controller]")]
public class InvoiceController : ControllerBase
{
    private readonly IInvoiceService _invoiceService;

    public InvoiceController(IInvoiceService invoiceService)
    {
        _invoiceService = invoiceService;
    }

    [HttpGet]
    public async Task<IEnumerable<Invoice>> GetInvoices()
    {
        IEnumerable<Invoice> invoices = await _invoiceService.FindAll();
        return invoices;
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<Invoice> GetInvoiceById(int id)
    {
        Invoice invoice = await _invoiceService.FindById(id);
        return invoice;
    }

    [HttpPost]
    [Route("Add")]
    public async Task Add(Invoice invoice)
    {
        await _invoiceService.Add(invoice);
    }

    [HttpPut]
    [Route("Update")]
    public async Task Update(Invoice invoice)
    {
        await _invoiceService.Update(invoice);
    }

    [HttpDelete]
    [Route("Delete")]
    public async Task Delete(int id)
    {
        await _invoiceService.Delete(id);
    }
}
