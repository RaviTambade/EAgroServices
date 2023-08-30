using Transflower.EAgroServices.RateCards.Services.Interfaces;
using Transflower.EAgroServices.RateCards.Services;
using Transflower.EAgroServices.RateCards.Repositories;
using Transflower.EAgroServices.RateCards.Repositories.Interfaces;
using Transflower.EAgroServices.RateCards.Repositories.Contexts;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<RateCardContext>(
     options =>
        options
            .UseMySQL(
                builder.Configuration.GetConnectionString("DefaultConnection")
                    ?? throw new ArgumentNullException(nameof(options))
            )
            .LogTo(Console.WriteLine, LogLevel.Information)
);
builder.Services.AddTransient<IRateCardRepository,RateCardRepository>();
builder.Services.AddTransient<IRateCardService,RateCardService>();
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

app.MapControllers();

app.Run();
