using Transflower.EAgroServices.CollectionCenters.Services.Interfaces;
using Transflower.EAgroServices.CollectionCenters.Repositories.Interfaces;
using Transflower.EAgroServices.CollectionCenters.Services;
using Transflower.EAgroServices.CollectionCenters.Repositories;
using Transflower.EAgroServices.CollectionCenters.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
builder.Services.AddControllers();

builder.Services.AddDbContext<CollectionCenterContext>(
    options =>
        options
            .UseMySQL(
                builder.Configuration.GetConnectionString("DefaultConnection")
                    ?? throw new ArgumentNullException(nameof(options))
            )
            .LogTo(Console.WriteLine, LogLevel.Information)
);
builder.Services.AddScoped<ICollectionCenterRepository, CollectionCenterRepository>();
builder.Services.AddScoped<ICollectionCenterService, CollectionCenterService>();
builder.Services.AddScoped<IInspectorRepository, InspectorRepository>();
builder.Services.AddScoped<IInspectorService, InspectorService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
