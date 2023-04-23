using AccountsAPI.Repositories.Interfaces;
using AccountsAPI.Services.Interfaces;
using AccountsAPI.Repositories;
using System.Threading.Tasks;
using System.Collections;
using AccountsAPI.Models;

namespace AccountsAPI.Services;
public class AccountService:IAccountServices{

     private readonly IAccountRepository _repo;
    public AccountService(IAccountRepository repo){
        _repo=repo;
    }
    public async Task<IEnumerable<Account>> GetAllAccounts()=>await _repo.GetAllAccounts();

    public async Task<Account> GetAccount(int accountId)=>await _repo.GetAccount(accountId);
    public async Task<bool> Insert(Account account)=>await _repo.Insert(account);
    public async Task<bool> Update(int accountId,Account account)=>await  _repo.Update(accountId,account);
    public async Task<bool> Delete(int accountId)=>await _repo.Delete(accountId);
    
}