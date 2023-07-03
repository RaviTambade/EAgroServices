using System.Threading.Tasks;
using PaymentAPI.Context;
using PaymentAPI.Models;
using PaymentAPI.Repositories.Interfaces;
using System.Linq;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Net;
using Microsoft.EntityFrameworkCore;
using MySql.Data;
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

 public async Task<MakePayment> MakePayment(int billId)
{
    try
    {
        using (var context = new PaymentContext(_configuration))
        {
            var ownerAmountParam = new SqlParameter("@owner_amount", SqlDbType.Float)
            {
                Direction = ParameterDirection.Output
            };
            var vendorAmountParam = new SqlParameter("@vendor_amount", SqlDbType.Float)
            {
                Direction = ParameterDirection.Output
            };
            var ownerIdParam = new SqlParameter("@owner_id", SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
            };
            var vendorIdParam = new SqlParameter("@vendor_id", SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
            };

            await context.Database.ExecuteSqlRawAsync(
                "EXECUTE makepayment @billid, @owner_id OUT, @vendor_id OUT, @owner_amount OUT, @vendor_amount OUT",
                new SqlParameter("@billid", billId),
                ownerIdParam,
                vendorIdParam,
                ownerAmountParam,
                vendorAmountParam
            );

            int ownerId = (int)ownerIdParam.Value;
            int vendorId = (int)vendorIdParam.Value;
            double ownerAmount = (double)ownerAmountParam.Value;
            double vendorAmount = (double)vendorAmountParam.Value;

            var payment = new MakePayment
            {
                OwnerId = ownerId,
                VendorId = vendorId,
                OwnerAmount = ownerAmount,
                VendorAmount = vendorAmount
            };

            return payment;
        }
    }
    catch (Exception ex)
    {
        throw ex;
    }
}

}