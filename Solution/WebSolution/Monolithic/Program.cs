using Intranet.Services.Interfaces;
using Intranet.Services;
using Intranet.Entities;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddTransient<IGoodsCollectionService,GoodsCollectionService>();
builder.Services.AddTransient<ICollectionCenterService,CollectionCenterService>();
builder.Services.AddTransient<ICropService,CropService>();
builder.Services.AddTransient<IGoodsCostingService,GoodsCostingService>();
builder.Services.AddTransient<IInvoiceService,InvoiceService>();
builder.Services.AddTransient<IShipmentService,ShipmentService>();
builder.Services.AddTransient<IShipmentItemService,ShipmentItemService>();
builder.Services.AddTransient<ITransporterService,TransporterService>();
builder.Services.AddTransient<IVehicleService,VehicleService>();
builder.Services.AddTransient<IVerifiedGoodsCollectionService,VerifiedGoodsCollectionService>();

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
app.UseCors(a=>a.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();  
