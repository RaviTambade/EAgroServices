using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ProductsAPI.Contexts;
using ProductsAPI.Models;
using ProductsAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace ProductsAPI.Repositories;
public class ProductRepository:IProductRepository{
    private readonly IConfiguration _configuration;
    public ProductRepository(IConfiguration configuration){
        _configuration=configuration;
    }
    public async Task<List<Product>> GetProducts(){
        try{
            using(var context=new ProductContext(_configuration)){
                List<Product> products=await context.Products.ToListAsync();
                if(products==null){
                    return null;
                }
                return products;
            }
        }
        catch(Exception e){
            throw e;
        }
    }
    public async Task<Product> GetProduct(int productId){
        try{
            using(var context=new ProductContext(_configuration)){
                Product product=await context.Products.FindAsync(productId);
                if(product==null){
                    return null;
                }
                return product;
            }
        }
        catch(Exception e){
            throw e;
        }
    }
    public async Task<bool> Insert(Product product){
        bool status=false;
        try{
            using(var context=new ProductContext(_configuration)){
            await context.Products.AddAsync(product);
            await context.SaveChangesAsync();
            status=true;
            }
        }
        catch(Exception e){
            throw e;
        }
        return status;
    }
    public async Task<bool> Update(int productId,Product product){
        bool status=false;
        try{
            using(var context=new ProductContext(_configuration)){
               Product? oldProduct= await context.Products.FindAsync(productId);
               if(oldProduct!=null){
                oldProduct.ProductTitle=product.ProductTitle;
                oldProduct.Description=product.Description;
                oldProduct.ImageUrl=product.ImageUrl;
                oldProduct.StockAvailable=product.StockAvailable;
                oldProduct.UnitPrice=product.UnitPrice;
                oldProduct.DealerId=product.DealerId;
                oldProduct.CategoryId=product.CategoryId;
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
    public async Task<bool> Delete(int productId){
        bool status=false;
        try{
            using(var context=new ProductContext(_configuration)){
                Product? product=await context.Products.FindAsync(productId);
                if(product!=null){
                context.Products.Remove(product);
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