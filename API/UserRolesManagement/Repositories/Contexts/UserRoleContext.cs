using Transflower.EAgroServices.UserRolesManagement.Entities;
using Microsoft.EntityFrameworkCore;

namespace Transflower.EAgroServices.UserRolesManagement.Repositories.Contexts;

public class UserRoleContext : DbContext
{
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Role> Roles { get; set; }

    public UserRoleContext(DbContextOptions options)
        : base(options)
    {
        UserRoles = Set<UserRole>();
        Roles = Set<Role>();
    }
}
