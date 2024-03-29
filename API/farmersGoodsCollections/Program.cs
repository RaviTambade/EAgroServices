using Transflower.EAgroservice.Repositories;
using Transflower.EAgroservice.Repositories.Interface;
using Transflower.EAgroservice.Services;
using Transflower.EAgroservice.Services.Interfaces;
using Transflower.EAgroservice.Repositories.Interface;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors();


builder.Services.AddTransient<IGoodsCollectionRepository, GoodsCollectionRepository>();
builder.Services.AddTransient<IGoodsCollectionService, GoodsCollectionService>();

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
