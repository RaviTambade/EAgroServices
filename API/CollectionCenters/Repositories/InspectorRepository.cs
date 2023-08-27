using Transflower.EAgroServices.CollectionCenters.Models;
using Transflower.EAgroServices.CollectionCenters.Repositories.Interfaces;
using Transflower.EAgroServices.CollectionCenters.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;
using Transflower.EAgroServices.CollectionCenters.Entities;

namespace Transflower.EAgroServices.CollectionCenters.Repositories;

public class InspectorRepository : IInspectorRepository
{
    private readonly CollectionCenterContext _context;

    public InspectorRepository(CollectionCenterContext context)
    {
        _context = context;
    }

    public async Task<Inspector?> GetInspector(int userId)
    {
        try
        {
            var inspector = await _context.Inspectors
                .Where(inspector => inspector.UserId == userId)
                .FirstOrDefaultAsync();

            return inspector;
        }
        catch (Exception)
        {
            throw;
        }
    }
}
