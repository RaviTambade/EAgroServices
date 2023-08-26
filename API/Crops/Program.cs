using Transflower.EAgroServices.Crops.Repositories.Interfaces;
using Transflower.EAgroServices.Crops.Repositories;
using Transflower.EAgroServices.Crops.Services.Interfaces;
using Transflower.EAgroServices.Crops.Services;
using Transflower.EAgroServices.Crops.Contexts;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
builder.Services.AddDbContext<CropContext>(
    options =>
        options
            .UseMySQL(
                builder.Configuration.GetConnectionString("DefaultConnection")
                    ?? throw new ArgumentNullException(nameof(options))
            )
            .LogTo(Console.WriteLine, LogLevel.Information)
);
builder.Services.AddControllers();
builder.Services.AddTransient<ICropRepository, CropRepository>();
builder.Services.AddTransient<ICropService, CropService>();

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
