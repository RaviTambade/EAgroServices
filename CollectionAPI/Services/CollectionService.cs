using CollectionAPI.Models;
using CollectionAPI.Repositories.Interfaces;
using CollectionAPI.Services.Interfaces;

namespace CollectionAPI.Services;

public class CollectionService : ICollectionService
{
    private readonly ICollectionRepository _repo;

    public CollectionService(ICollectionRepository repo)
    {
        _repo = repo;
    }


}