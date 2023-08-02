using GoodsCollections.Services.Interfaces;
using GoodsCollections.Repositories.Interfaces;
using GoodsCollections.Services;
using GoodsCollections.Models;
using GoodsCollections.Repositories;
using GoodsCollections.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddScoped<IGoodsCollectionRepository, GoodsCollectionRepository>();
builder.Services.AddScoped<IGoodsCollectionService, GoodsCollectionService>();
builder.Services.AddScoped<IFilterHelperService<VerifiedCollectionDetails>,FilterHelperService<VerifiedCollectionDetails>>();
builder.Services.AddScoped<IFilterHelperService<Collection>,FilterHelperService<Collection>>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
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
