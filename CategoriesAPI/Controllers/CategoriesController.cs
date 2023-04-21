using System.Collections.Generic;
using System.Threading.Tasks;
using CategoriesAPI.Models;
using CategoriesAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
namespace CategoriesAPI.Controller;
[ApiController]
[Route("/api/[controller]")]
public class CategoriesController:ControllerBase{
    private readonly ICategoryService _srv;
    public CategoriesController(ICategoryService srv){
        _srv=srv;
    }

    [HttpGet]
    [Route("getallcategories")]
    public async Task<List<Category>> GetCategories(){
        return await _srv.GetCategories();
    }

    [HttpGet]
    [Route("getcategory/{id}")]
    public async Task<Category> GetCategory(int id){
        return await _srv.GetCategory(id);
    }

    [HttpPost]
    [Route("insert")]
    public async Task<bool> Insert(Category category){
        return await _srv.Insert(category);
    }
    
    [HttpPut]
    [Route("update/{id}")]
    public async Task<bool> Update(int id,Category category){
        return await _srv.Update(id,category);
    }
    
    [HttpDelete]
    [Route("delete/{id}")]
    public async Task<bool> Delete(int id){
        return await _srv.Delete(id);
    }
}