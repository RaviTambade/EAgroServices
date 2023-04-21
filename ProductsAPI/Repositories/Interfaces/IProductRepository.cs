using System.Collections.Generic;
using System.Threading.Tasks;
using ProductsAPI.Models;
namespace ProductsAPI.Repositories.Interfaces;
public interface IProductRepository{
   Task<List<Product>> GetProducts();
   Task<Product> GetProduct(int productId);
   Task<bool> Insert(Product product);
   Task<bool> Update(int productId,Product product);
   Task<bool> Delete(int productId);
}