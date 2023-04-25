using System;
using System.Collections.Generic;
using BillingAPI.Models;
using BillingAPI.Repositories.Interfaces;
using MySql.Data.MySqlClient;
namespace BillingAPI.Repositories;
public class FarmerBillingRepository : IFarmerBillingRepository
{
    private static string conString = "server=localhost; database=eagroservicesdb; user=root; password=password";
    public List<FarmerBill> GetAllFarmerBills()
    {
        List<FarmerBill> farmerBills = new List<FarmerBill>();
        List<FarmerBill> newfarmerBills = new List<FarmerBill
        >();
        MySqlConnection con = new MySqlConnection();
        con.ConnectionString = conString;
        try
        {
            string query = " SELECT farmer_bills.bill_id,farmers.farmer_id,farmers.first_name, farmers.last_name,products.product_id," +
                           " products.product_title,products.unit_price,bill_products.quantity," +
                           " (products.unit_price * bill_products.quantity) AS amount," +
                           " farmer_bills.payment_mode, farmer_bills.bill_date FROM bill_products" +
                           " INNER JOIN products ON products.product_id = bill_products.product_id" +
                           " INNER JOIN farmer_bills ON farmer_bills.bill_id = bill_products.bill_id" +
                           " INNER JOIN farmers ON farmers.farmer_id = farmer_bills.farmer_id" +
                           " ORDER BY farmer_bills.bill_id ";
            MySqlCommand command = new MySqlCommand(query, con);
            con.Open();
            MySqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                int billId = int.Parse(reader["bill_id"].ToString());
                int farmerId = int.Parse(reader["farmer_id"].ToString());
                string firstName = reader["first_name"].ToString();
                string lastName = reader["last_name"].ToString();
                int productId = int.Parse(reader["product_id"].ToString());
                string productTitle = reader["product_title"].ToString();
                string paymentMode = reader["payment_mode"].ToString();
                double unitPrice = double.Parse(reader["unit_price"].ToString());
                int quantity = int.Parse(reader["quantity"].ToString());
                double amount = double.Parse(reader["amount"].ToString());
                DateTime date = DateTime.Parse(reader["bill_date"].ToString());

                FarmerBill farmerBill = new FarmerBill()
                {
                    BillId = billId,
                    FarmerId = farmerId,
                    FirstName = firstName,
                    LastName = lastName,
                    PaymentMode = paymentMode,
                    BillDate = date
                };
                BillProduct product = new BillProduct()
                {
                    ProductId = productId,
                    ProductTitle = productTitle,
                    UnitPrice = unitPrice,
                    Quantity = quantity,
                    Amount = amount,
                };
                farmerBill.BillProduct.Add(product);
                farmerBills.Add(farmerBill);
            }
            reader.Close();

            var groupedBills = farmerBills.GroupBy(farmerBill => farmerBill.BillId).ToList();

            foreach (var groupedbill in groupedBills)
            {
                System.Console.WriteLine(groupedbill.Key);
                FarmerBill farmerBill1 = new FarmerBill();

                foreach (var farmerBill2 in groupedbill)
                {
                    if(farmerBill1.BillId==0){
                    farmerBill1.BillId = farmerBill2.BillId;
                    farmerBill1.FarmerId = farmerBill2.FarmerId;
                    farmerBill1.FirstName = farmerBill2.FirstName;
                    farmerBill1.LastName = farmerBill2.LastName;
                    farmerBill1.PaymentMode = farmerBill2.PaymentMode;
                    farmerBill1.BillDate = farmerBill2.BillDate;
                    }
                    foreach (var product in farmerBill2.BillProduct)
                    {
                        BillProduct billProduct = new BillProduct()
                        {
                            ProductId = product.ProductId,
                            ProductTitle = product.ProductTitle,
                            Quantity = product.Quantity,
                            UnitPrice = product.UnitPrice,
                            Amount = product.Amount
                        };
                        farmerBill1.BillProduct.Add(billProduct);
                    }
                }
                newfarmerBills.Add(farmerBill1);
            }
        }
        catch (Exception e)
        {
            throw e;
        }
        finally
        {
            con.Close();
        }
        return newfarmerBills;
    }
}