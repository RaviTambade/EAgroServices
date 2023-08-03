using Shipments.Services.Interfaces;
using Shipments.Repositories.Interfaces;
using Shipments.Services;
using Shipments.Repositories;
using Shipments.Models;
using Shipments.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddScoped<IShipmentService, ShipmentService>();
builder.Services.AddScoped<IShipmentRepository, ShipmentRepository>();
builder.Services.AddScoped<IShipmentItemService, ShipmentItemService>();
builder.Services.AddScoped<IShipmentItemRepository, ShipmentItemRepository>();
builder.Services.AddScoped<IFilterHelperService<ShippedCollection>,FilterHelperService<ShippedCollection>>();

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
