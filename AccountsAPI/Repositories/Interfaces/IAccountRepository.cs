using AccountsAPI.Models;
using AccountsAPI.Context;
using System.Threading.Tasks;
using System.Collections;

namespace AccountsAPI.Repositories.Interfaces;
public interface IAccountRepository{
    public Task<IEnumerable<Account>> GetAllAccounts();
    public Task<Account> GetAccount(int accountId);

    public Task<bool> Insert(Account account);
    public Task<bool> Update(int accountId,Account account);
    public Task<bool>Delete(int accountId);


    

}