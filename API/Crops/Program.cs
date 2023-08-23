using Crops.Repositories.Interfaces;
using Crops.Repositories;
using Crops.Services.Interfaces;
using Crops.Services;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddTransient<ICropRepository,CropRepository>();
builder.Services.AddTransient<ICropService,CropService>();
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
app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
