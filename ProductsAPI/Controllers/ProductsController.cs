using System.Collections.Generic;
using System.Threading.Tasks;
using ProductsAPI.Models;
using ProductsAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using CategProductsAPIoriesAPI.Services;

namespace ProductsAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class ProductsController:ControllerBase{
    private readonly IProductService _srv;
    public ProductsController(IProductService srv){
        _srv=srv;
    }

    [HttpGet]
    [Route("getallproducts")]
    public async Task<List<Product>> GetProducts(){
        return await _srv.GetProducts();
    }

    [HttpGet]
    [Route("getproduct/{id}")]
    public async Task<Product> GetProduct(int id){
        return await _srv.GetProduct(id);
    }

    [HttpPost]
    [Route("insert")]
    public async Task<bool> Insert(Product product){
        return await _srv.Insert(product);
    }
    
    [HttpPut]
    [Route("update/{id}")]
    public async Task<bool> Update(int id,Product product){
        return await _srv.Update(id,product);
    }
    
    [HttpDelete]
    [Route("delete/{id}")]
    public async Task<bool> Delete(int id){
        return await _srv.Delete(id);
    }
}