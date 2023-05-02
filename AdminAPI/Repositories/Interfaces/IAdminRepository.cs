using AdminAPI.Models;
namespace AdminAPI.Repositories.Interface;
public interface IAdminRepository
{
    Task<List<Admin>> GetAll();
    Task<Admin> GetById(int adminId);
    Task<bool> Insert(Admin admin,User user,UserRole userRole);

    Task<bool> Update(int adminId,Admin admin);
    Task<bool> Delete(int adminId);


}