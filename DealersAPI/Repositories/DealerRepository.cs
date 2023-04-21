using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DealersAPI.Contexts;
using DealersAPI.Models;
using DealersAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace DealersAPI.Repositories;
public class DealerRepository:IDealerRepository{
    private readonly IConfiguration _configuration;
    public DealerRepository(IConfiguration configuration){
        _configuration=configuration;
    }
    public async Task<List<Dealer>> GetDealers(){
        try{
            using(var context=new DealerContext(_configuration)){
                List<Dealer> dealers=await context.Dealers.ToListAsync();
                if(dealers==null){
                    return null;
                }
                return dealers;
            }
        }
        catch(Exception e){
            throw e;
        }
    }
    public async Task<Dealer> GetDealer(int dealerId){
        try{
            using(var context=new DealerContext(_configuration)){
                Dealer dealer=await context.Dealers.FindAsync(dealerId);
                if(dealer==null){
                    return null;
                }
                return dealer;
            }
        }
        catch(Exception e){
            throw e;
        }
    }
    public async Task<bool> Insert(Dealer dealer){
        bool status=false;
        try{
            using(var context=new DealerContext(_configuration)){
            await context.Dealers.AddAsync(dealer);
            await context.SaveChangesAsync();
            status=true;
            }
        }
        catch(Exception e){
            throw e;
        }
        return status;
    }
    public async Task<bool> Update(int dealerId,Dealer dealer){
        bool status=false;
        try{
            using(var context=new DealerContext(_configuration)){
               Dealer? oldDealer= await context.Dealers.FindAsync(dealerId);
               if(oldDealer!=null){
                oldDealer.FirstName=dealer.FirstName;
                oldDealer.LastName=dealer.LastName;
                oldDealer.CompanyName=dealer.CompanyName;
                oldDealer.ContactNumber=dealer.ContactNumber;
                oldDealer.Location=dealer.Location;
                await context.SaveChangesAsync();
                status=true;
               }
            }
        }
        catch(Exception e){
            throw e;
        }
        return status;
    }
    public async Task<bool> Delete(int dealerId){
        bool status=false;
        try{
            using(var context=new DealerContext(_configuration)){
                Dealer? dealer=await context.Dealers.FindAsync(dealerId);
                if(dealer!=null){
                context.Dealers.Remove(dealer);
                await context.SaveChangesAsync();
                status=true;
                }
            }
        }
        catch(Exception e){
            throw e;
        }
        return status;
    }
}