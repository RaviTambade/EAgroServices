using System.Collections.Generic;
using System.Threading.Tasks;
using CategoriesAPI.Models;
namespace CategoriesAPI.Repositories.Interfaces;
public interface ICategoryRepository{
   Task<List<Category>> GetCategories();
   Task<Category> GetCategory(int categoryId);
   Task<bool> Insert(Category category);
   Task<bool> Update(int categoryId,Category category);
   Task<bool> Delete(int categoryId);
}