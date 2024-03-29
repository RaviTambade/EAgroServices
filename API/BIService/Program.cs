using Transflower.EAgroServices.BIService.Services.Interfaces;
using Transflower.EAgroServices.BIService.Repositories.Interfaces;
using Transflower.EAgroServices.BIService.Services;
using Transflower.EAgroServices.BIService.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<ICollectionCenterRepository, CollectionCenterRepository>();
builder.Services.AddScoped<ICollectionCenterService, CollectionCenterService>();
builder.Services.AddScoped<ITransporterRepository, TransporterRepository>();
builder.Services.AddScoped<ITransporterService, TransporterService>();
builder.Services.AddScoped<IFarmerService, FarmerService>();
builder.Services.AddScoped<IFarmerRepository, FarmerRepository>();
builder.Services.AddScoped<IMerchantRepository, MerchantRepository>();
builder.Services.AddScoped<IMerchantService, MerchantService>();

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
app.UseAuthorization();
app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyHeader());
app.MapControllers();

app.Run();
