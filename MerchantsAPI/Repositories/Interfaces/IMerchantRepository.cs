using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MerchantsAPI.Models;
namespace MerchantsAPI.Repositories.Interfaces;
public interface IMerchantRepository
{
     Task<List<Merchant>> GetMerchants();
     Task<Merchant> GetMerchant(int merchantId);
     Task<List<MerchantRecord>> GetMerchantSellRecords(int merchantId);
     Task<List<MerchantRecord>> GetTodaysMerchantSellRecords(int merchantId,StartDateFilter startDate);

     Task<List<MerchantRecord>> GetMerchantSellRecordsByDate(int merchantId,DateFilter dateFilter);
     Task<List<Merchant>>  SearchByName(string name);
     Task<List<string>> GetMerchantsNames();


}