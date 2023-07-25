using VerifiedGoodsCollections.Repositories;
using VerifiedGoodsCollections.Repositories.Interfaces;
using VerifiedGoodsCollections.Services;
using VerifiedGoodsCollections.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();
builder.Services.AddScoped<IVerifiedCollectionRepository,VerifiedCollectionRepository>();
builder.Services.AddScoped<IVerifiedCollectionService,VerifiedCollectionService>();
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
