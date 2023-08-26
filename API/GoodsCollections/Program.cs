using Transflower.EAgroServices.GoodsCollections.Services.Interfaces;
using Transflower.EAgroServices.GoodsCollections.Repositories.Interfaces;
using Transflower.EAgroServices.GoodsCollections.Services;
using Transflower.EAgroServices.GoodsCollections.Models;
using Transflower.EAgroServices.GoodsCollections.Repositories;
using Transflower.EAgroServices.GoodsCollections.Extensions;
using Transflower.EAgroServices.GoodsCollections.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddDbContext<GoodsCollectionContext>(
    options =>
        options
            .UseMySQL(
                builder.Configuration.GetConnectionString("DefaultConnection")
                    ?? throw new ArgumentNullException(nameof(options))
            )
            .LogTo(Console.WriteLine, LogLevel.Information)
);
builder.Services.AddScoped<IGoodsCollectionRepository, GoodsCollectionRepository>();
builder.Services.AddScoped<IGoodsCollectionService, GoodsCollectionService>();
builder.Services.AddScoped<IFilterHelperService<VerifiedCollectionDetail>,FilterHelperService<VerifiedCollectionDetail>>();
builder.Services.AddScoped<IFilterHelperService<Collection>,FilterHelperService<Collection>>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().WithExposedHeaders(
                       new string[] {"X-Pagination"}
                    ));

app.UseAuthorization();

app.MapControllers();

app.Run();
