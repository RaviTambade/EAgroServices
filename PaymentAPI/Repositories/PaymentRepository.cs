using System.Threading.Tasks;
using PaymentAPI.Context;
using PaymentAPI.Models;
using PaymentAPI.Repositories.Interfaces;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using Microsoft.EntityFrameworkCore;

namespace PaymentAPI.Repositories;

public class PaymentRepository : IPaymentRepository
{
    private readonly IConfiguration _configuration;

    public PaymentRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<bool> Insert(Payment payment)
    {
        bool status = false;
        try
        {
            using (var context = new PaymentContext(_configuration))
            {
                await context.Payments.AddAsync(payment);
                int rowsAffected = await context.SaveChangesAsync();
                if (rowsAffected > 0)
                {
                    status = true;
                }
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
        return status;
    }

    public async Task<bool> CheckBill(int billId){
        try{
            using(var context=new PaymentContext(_configuration)){
            bool exists = await context.Payments.AnyAsync(p => p.BillId == billId);
            return exists;
            }
        }
        catch(Exception e){
            throw e;
    }
}
}