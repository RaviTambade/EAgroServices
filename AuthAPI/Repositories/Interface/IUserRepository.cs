using AuthAPI.Models;
namespace AuthAPI.Repository.Interfaces;
public interface IUserRepository {
    Task<AuthenticateResponse> Authenticate(AuthenticateRequest request);
}