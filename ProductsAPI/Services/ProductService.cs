using System.Collections.Generic;
using System.Threading.Tasks;
using ProductsAPI.Models;
using ProductsAPI.Repositories.Interfaces;
using ProductsAPI.Services.Interfaces;

namespace CategProductsAPIoriesAPI.Services;
public class ProductService:IProductService{
    private readonly IProductRepository _repo;
    public ProductService(IProductRepository repo){
        _repo=repo;
    }
    public async Task<List<Product>> GetProducts()=>await _repo.GetProducts();
    public async Task<Product> GetProduct(int productId)=>await _repo.GetProduct(productId);
    public async Task<bool> Insert(Product product)=>await _repo.Insert(product);
    public async Task<bool> Update(int productId,Product product)=>await _repo.Update(productId,product);
    public async Task<bool> Delete(int productId)=>await _repo.Delete(productId);

}