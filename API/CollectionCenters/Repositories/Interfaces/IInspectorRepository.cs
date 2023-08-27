using Transflower.EAgroServices.CollectionCenters.Entities;

namespace Transflower.EAgroServices.CollectionCenters.Repositories.Interfaces;

public interface IInspectorRepository
{
    Task<Inspector?> GetInspector(int userId);
}
