using UserRolesManagement.Models;
using UserRolesManagement.Repositories.Interfaces;
using UserRolesManagement.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;

namespace UserRolesManagement.Repositories
{
    public class UserRoleRepository : IUserRoleRepository
    {
        private readonly IConfiguration _configuration;

        public UserRoleRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<UserRole>> GetAll()
        {
            try
            {
                using (var context = new UserRoleContext(_configuration))
                {
                    var userRoles = await context.UserRoles.ToListAsync();
                    if (userRoles is null)
                    {
                        return null;
                    }
                    return userRoles;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<UserRole> GetById(int userRoleId)
        {
            try
            {
                using (var context = new UserRoleContext(_configuration))
                {
                    var userRole = await context.UserRoles.FindAsync(userRoleId);

                    if (userRole is null)
                    {
                        return null;
                    }

                    return userRole;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<string>> GetRolesByUserId(int userId)
        {
            try
            {
                using (var context = new UserRoleContext(_configuration))
                {
                    var roles = await (
                        from role in context.Roles
                        join userRples in context.UserRoles on role.Id equals userRples.RoleId
                        where userRples.UserId == userId
                        select role.Name
                    ).ToListAsync();

                    if (roles is null)
                    {
                        return null;
                    }

                    return roles;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Insert(UserRole userRole)
        {
            try
            {
                bool status = false;
                using (var context = new UserRoleContext(_configuration))
                {
                    await context.UserRoles.AddAsync(userRole);
                    status = await SaveChanges(context);
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Update(UserRole userRole)
        {
            try
            {
                bool status = false;
                using (var context = new UserRoleContext(_configuration))
                {
                    var oldMerchant = await context.UserRoles.FindAsync(userRole.Id);
                    if (oldMerchant is not null)
                    {
                        oldMerchant.UserId = userRole.UserId;
                        oldMerchant.RoleId = userRole.RoleId;
                        status = await SaveChanges(context);
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<bool> Delete(int userRoleId)
        {
            try
            {
                bool status = false;
                using (var context = new UserRoleContext(_configuration))
                {
                    var userRole = await context.UserRoles.FindAsync(userRoleId);
                    if (userRole is not null)
                    {
                        context.UserRoles.Remove(userRole);
                        status = await SaveChanges(context);
                    }
                    return status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        private async Task<bool> SaveChanges(UserRoleContext context)
        {
            int rowsAffected = await context.SaveChangesAsync();
            if (rowsAffected > 0)
            {
                return true;
            }
            return false;
        }
    }
}
