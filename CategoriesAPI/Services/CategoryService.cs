using System.Collections.Generic;
using System.Threading.Tasks;
using CategoriesAPI.Models;
using CategoriesAPI.Repositories.Interfaces;
using CategoriesAPI.Services.Interfaces;

namespace CategoriesAPI.Services;
public class CategoryService:ICategoryService{
    private readonly ICategoryRepository _repo;
    public CategoryService(ICategoryRepository repo){
        _repo=repo;
    }
    public async Task<List<Category>> GetCategories()=>await _repo.GetCategories();
    public async Task<Category> GetCategory(int categoryId)=>await _repo.GetCategory(categoryId);
    public async Task<bool> Insert(Category category)=>await _repo.Insert(category);
    public async Task<bool> Update(int categoryId,Category category)=>await _repo.Update(categoryId,category);
    public async Task<bool> Delete(int categoryId)=>await _repo.Delete(categoryId);

}