using Microsoft.EntityFrameworkCore;
using WebutviklingsEksamen.Contexts;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<F1Context>(
    options => options.UseSqlite("Data Source=Databases/F1Db.db")
);

builder.Services.AddCors(
    options =>
    {
        options.AddPolicy("AllowAll",
        policies => policies
            .AllowAnyMethod()
            .AllowAnyOrigin()
            .AllowAnyHeader()
        );
    }
);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

DefaultFilesOptions options = new();
options.DefaultFileNames.Add("index.html");
app.UseDefaultFiles(options);

app.UseStaticFiles();


app.UseCors("AllowAll");


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