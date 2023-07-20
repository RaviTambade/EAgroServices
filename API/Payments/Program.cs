using Payments.Repositories.Interfaces;
using Payments.Services.Interfaces;
using Payments.Repositories;
using Payments.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();

// Learn more about configuring Swagger /OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddTransient<IPaymentService, PaymentService>();
builder.Services.AddTransient<IPaymentRepository, PaymentRepository>();
builder.Services.AddTransient<ITransporterPaymentService, TransporterPaymentService>();
builder.Services.AddTransient<ITransporterPaymentRepository, TransporterPaymentRepository>();
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
