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
using MySql.Data.MySqlClient;

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

    public async Task<bool> CheckBill(int billId)
    {
        try
        {
            using (var context = new PaymentContext(_configuration))
            {
                bool exists = await context.Payments.AnyAsync(p => p.BillId == billId);
                return exists;
            }
        }
        catch (Exception e)
        {
            throw e;
        }
    }

    public async Task<bool> MakePayment(int billId)
    {
        try
        {
            using (var context = new PaymentContext(_configuration))
            {
                var billIdParam = new MySqlParameter("@billid", MySqlDbType.Int32);
                billIdParam.Value = billId;

                var ownerIdParam = new MySqlParameter("@owner_id", MySqlDbType.Int32);
                ownerIdParam.Direction = ParameterDirection.InputOutput;
                ownerIdParam.Value = 0;

                var vendorIdParam = new MySqlParameter("@vendor_id", MySqlDbType.Int32);
                vendorIdParam.Direction = ParameterDirection.InputOutput;
                vendorIdParam.Value = 0;

                var ownerAmountParam = new MySqlParameter("@owner_amount", MySqlDbType.Double);
                ownerAmountParam.Direction = ParameterDirection.InputOutput;
                ownerAmountParam.Value = 0;

                var vendorAmountParam = new MySqlParameter("@vendor_amount", MySqlDbType.Double);
                vendorAmountParam.Direction = ParameterDirection.InputOutput;
                vendorAmountParam.Value = 0;

                await context.Database.ExecuteSqlRawAsync(
                "CALL makepayment(@billid, @owner_id, @vendor_id, @owner_amount, @vendor_amount)",
    billIdParam,
    ownerIdParam,
    vendorIdParam,
    ownerAmountParam,
    vendorAmountParam
       );

                // Access the output parameter values after the stored procedure execution
                int ownerId = (int)ownerIdParam.Value;
                int vendorId = (int)vendorIdParam.Value;
                decimal ownerAmount = (decimal)ownerAmountParam.Value;
                decimal vendorAmount = (decimal)vendorAmountParam.Value;

                System.Console.WriteLine(ownerId);
                System.Console.WriteLine(vendorId);
                System.Console.WriteLine(ownerAmount);
                System.Console.WriteLine(vendorAmount);
                // var payment = new MakePayment
                // {
                //     OwnerId = ownerId,
                //     VendorId = vendorId,
                //     OwnerAmount = ownerAmount,
                //     VendorAmount = vendorAmount
                // };

                return true;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
}
