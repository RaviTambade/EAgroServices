using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CategoriesAPI.Contexts;
using CategoriesAPI.Models;
using CategoriesAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace CategoriesAPI.Repositories;
public class CategoryRepository:ICategoryRepository{
    private readonly IConfiguration _configuration;
    public CategoryRepository(IConfiguration configuration){
        _configuration=configuration;
    }
    public async Task<List<Category>> GetCategories(){
        try{
            using(var context=new CategoryContext(_configuration)){
                List<Category> categories=await context.Categories.ToListAsync();
                if(categories==null){
                    return null;
                }
                return categories;
            }
        }
        catch(Exception e){
            throw e;
        }
    }
    public async Task<Category> GetCategory(int categoryId){
        try{
            using(var context=new CategoryContext(_configuration)){
                Category category=await context.Categories.FindAsync(categoryId);
                if(category==null){
                    return null;
                }
                return category;
            }
        }
        catch(Exception e){
            throw e;
        }
    }
    public async Task<bool> Insert(Category category){
        bool status=false;
        try{
            using(var context=new CategoryContext(_configuration)){
            await context.Categories.AddAsync(category);
            await context.SaveChangesAsync();
            status=true;
            }
        }
        catch(Exception e){
            throw e;
        }
        return status;
    }
    public async Task<bool> Update(int categoryId,Category category){
        bool status=false;
        try{
            using(var context=new CategoryContext(_configuration)){
               Category? oldCategory= await context.Categories.FindAsync(categoryId);
               if(oldCategory!=null){
                oldCategory.CategoryTitle=category.CategoryTitle;
                oldCategory.Description=category.Description;
                oldCategory.ImageUrl=category.ImageUrl;
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
    public async Task<bool> Delete(int categoryId){
        bool status=false;
        try{
            using(var context=new CategoryContext(_configuration)){
                Category? category=await context.Categories.FindAsync(categoryId);
                if(category!=null){
                context.Categories.Remove(category);
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