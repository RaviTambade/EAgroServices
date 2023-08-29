using Transflower.EAgroServices.Shipments.Services.Interfaces;
using Transflower.EAgroServices.Shipments.Repositories.Interfaces;
using Transflower.EAgroServices.Shipments.Services;
using Transflower.EAgroServices.Shipments.Repositories;
using Transflower.EAgroServices.Shipments.Models;
using Transflower.EAgroServices.Shipments.Extensions;
using Transflower.EAgroServices.Shipments.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<ShipmentContext>(
    options =>
        options
            .UseMySQL(
                builder.Configuration.GetConnectionString("DefaultConnection")
                    ?? throw new ArgumentNullException(nameof(options))
            )
            .LogTo(Console.WriteLine, LogLevel.Information)
            .EnableSensitiveDataLogging()
            .EnableDetailedErrors()
);

builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddScoped<IShipmentService, ShipmentService>();
builder.Services.AddScoped<IShipmentRepository, ShipmentRepository>();
builder.Services.AddScoped<IShipmentItemService, ShipmentItemService>();
builder.Services.AddScoped<IShipmentItemRepository, ShipmentItemRepository>();
builder.Services.AddScoped<
    IFilterHelperService<ShippedCollection>,
    FilterHelperService<ShippedCollection>
>();

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
app.UseCors(
    x =>
        x.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders(new string[] { "X-Pagination" })
);

app.UseAuthorization();

app.MapControllers();

app.Run();
