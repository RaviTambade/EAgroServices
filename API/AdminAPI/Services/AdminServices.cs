using AdminAPI.Models;
using AdminAPI.Repositories.Interface;
using AdminAPI.Repositories;
using AdminAPI.Services.Interface;
namespace AdminAPI.Services;
public class AdminService : IAdminServices
{
    private readonly IAdminRepository _repo;
    public AdminService(IAdminRepository repo)
    {
        this._repo = repo;
    }
    public async Task<List<Admin>> GetAll() => await _repo.GetAll();
    public async Task<Admin> GetById(int adminId) => await _repo.GetById(adminId);
    public async Task<bool> Insert(Admin admin, User user, UserRole userRole) => await _repo.Insert(admin, user, userRole);
    public async Task<bool> Update(int adminId, Admin admin) => await _repo.Update(adminId, admin);
    public async Task<bool> Delete(int adminId) => await _repo.Delete(adminId);
}