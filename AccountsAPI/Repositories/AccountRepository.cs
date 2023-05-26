using System;
using System.Collections;
using System.Threading.Tasks;
using AccountsAPI.Context;
using AccountsAPI.Models;
using AccountsAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace AccountsAPI.Repositories;
public class AccountRepository : IAccountRepository
{
    private readonly IConfiguration _configuration;
    public AccountRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public async Task<IEnumerable<Account>> GetAll()
    {
        try
        {
            using (var context = new AccountContext(_configuration))
            {
                IEnumerable<Account> accounts = await context.Accounts.ToListAsync();
                if (accounts == null)
                {
                    return null;
                }
                return accounts;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<Account> GetById(int accountId)
    {
        try
        {
            using (var context = new AccountContext(_configuration))
            {
                Account account = await context.Accounts.FindAsync(accountId);
                if (account == null)
                {
                    return null;
                }
                return account;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }
    public async Task<bool> Insert(Account account)
    {
        bool status = false;
        try
        {
            using (var context = new AccountContext(_configuration))
            {
                await context.Accounts.AddAsync(account);
                await context.SaveChangesAsync();
                status = true;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }
    public async Task<bool> Update(int accountId, Account account)
    {
        bool status = false;
        try
        {
            using (var context = new AccountContext(_configuration))
            {
                Account oldAccount = await context.Accounts.FindAsync(accountId);
                if (oldAccount != null)
                {
                    oldAccount.AccountNumber = account.AccountNumber;
                    oldAccount.IfscCode = account.IfscCode;
                    await context.SaveChangesAsync();
                    status = true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }
    public async Task<bool> Delete(int accountId)
    {
        bool status = false;
        try
        {
            using (var context = new AccountContext(_configuration))
            {
                Account account = await context.Accounts.FindAsync(accountId);
                if (account != null)
                {
                    context.Accounts.Remove(account);
                    await context.SaveChangesAsync();
                    status = true;
                }
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        return status;
    }
}
