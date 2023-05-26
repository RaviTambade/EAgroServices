using System.Collections;
using System.Threading.Tasks;
using AccountsAPI.Models;
using AccountsAPI.Repositories;
using AccountsAPI.Repositories.Interfaces;
using AccountsAPI.Services.Interfaces;
namespace AccountsAPI.Services;
public class AccountService : IAccountServices
{
    private readonly IAccountRepository _repo;
    public AccountService(IAccountRepository repo)
    {
        _repo = repo;
    }
    public async Task<IEnumerable<Account>> GetAll() => await _repo.GetAll();
    public async Task<Account> GetById(int accountId) => await _repo.GetById(accountId);
    public async Task<bool> Insert(Account account) => await _repo.Insert(account);
    public async Task<bool> Update(int accountId, Account account) => await _repo.Update(accountId, account);
    public async Task<bool> Delete(int accountId) => await _repo.Delete(accountId);
}