using AccountAPI.Models;
using AccountAPI.Context;
using System.Threading.Tasks;
using System.Collections;

namespace AccountAPI.Repositories.Interfaces;
public interface IAccountRepository{
    public Task<IEnumerable<Account>> GetAllAccounts();
    public Task<Account> GetAccount(int accountId);

    public Task<bool> Insert(Account account);
    public Task<bool> Update(int accountId,Account account);
    public Task<bool>Delete(int accountId);


    

}