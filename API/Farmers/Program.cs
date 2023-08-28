using Transflower.EAgroServices.Farmers.Repositories;
using Transflower.EAgroServices.Farmers.Contexts;
using Transflower.EAgroServices.Farmers.Repositories.Interfaces;
using Transflower.EAgroServices.Farmers.Services;
using Transflower.EAgroServices.Farmers.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddDbContext<FarmerContext>(
    options =>
        options
            .UseMySQL(
                builder.Configuration.GetConnectionString("DefaultConnection")
                    ?? throw new ArgumentNullException(nameof(options))
            )
            .LogTo(Console.WriteLine, LogLevel.Information)
);
builder.Services.AddScoped<IFarmersCollectionRepository, FarmersCollectionRepository>();
builder.Services.AddScoped<IGoodsCollectionService, GoodsCollectionService>();
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
app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().WithExposedHeaders(
                       new string[] { "X-Pagination" }
                    ));
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
