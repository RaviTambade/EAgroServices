using Microsoft.AspNetCore.Mvc;
using CollectionAPI.Models;
using CollectionAPI.Services.Interfaces;
namespace CollectionAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class CollectionsController : ControllerBase
{
    private readonly ICollectionService _service;
    public CollectionsController(ICollectionService service)
    {
        _service = service;
    }

}