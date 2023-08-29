using Transflower.EAgroServices.Transporters.Services.Interfaces;
using Transflower.EAgroServices.Transporters.Repositories.Interfaces;
using Transflower.EAgroServices.Transporters.Services;
using Transflower.EAgroServices.Transporters.Repositories;
using Microsoft.EntityFrameworkCore;
using Transflower.EAgroServices.Transporters.Repositories.Contexts;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TransporterContext>(
    options =>
        options
            .UseMySQL(
                builder.Configuration.GetConnectionString("DefaultConnection")
                    ?? throw new ArgumentNullException(nameof(options))
            )
            .LogTo(Console.WriteLine, LogLevel.Information)
);

builder.Services.AddCors();
builder.Services.AddControllers();

builder.Services.AddScoped<ITransporterRepository, TransporterRepository>();
builder.Services.AddScoped<ITransporterService, TransporterService>();

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
