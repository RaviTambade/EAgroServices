using Transflower.EAgroServices.CollectionCenters.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Transflower.EAgroServices.CollectionCenters.Entities;

namespace Transflower.EAgroServices.CollectionCenters.Controllers;

[ApiController]
[Route("/api/inspectors")]
public class InspectorController : ControllerBase
{
    private readonly IInspectorService _service;

    public InspectorController(IInspectorService service)
    {
        _service = service;
    }

    [HttpGet("{userId:int}")]
    public async Task<Inspector?> GetInspector(int userId)
    {
        return await _service.GetInspector(userId);
    }
}
