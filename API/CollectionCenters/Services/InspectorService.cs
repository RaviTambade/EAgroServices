
using Transflower.EAgroServices.CollectionCenters.Services.Interfaces;
using Transflower.EAgroServices.CollectionCenters.Repositories.Interfaces;
using Transflower.EAgroServices.CollectionCenters.Entities;

namespace Transflower.EAgroServices.CollectionCenters.Services;
public class InspectorService : IInspectorService
{
    private readonly IInspectorRepository _repository;

    public InspectorService(IInspectorRepository repository)
    {
        _repository = repository;
    }

    public async Task<Inspector?> GetInspector(int userId)
    {
       return await _repository.GetInspector(userId);
    }


}