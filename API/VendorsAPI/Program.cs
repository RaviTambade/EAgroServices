using VendorsAPI.Repositories.Interfaces;
using VendorsAPI.Repositories;
using VendorsAPI.Services;
using VendorsAPI.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddTransient<IVehicleRepository,VehicleRepository>();
builder.Services.AddTransient<IVehicleServices,VehicleServices>();
builder.Services.AddTransient<IVendorRepository,VendorRepository>();
builder.Services.AddTransient<IVendorService,VendorsService>();

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

 app.UseCors(x => x.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader());
 

app.UseAuthorization();

app.MapControllers();

app.Run();
