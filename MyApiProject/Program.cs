using Microsoft.EntityFrameworkCore;
using MyApiProject.Data;
using MyApiProject.Repositories;
using MyApiProject.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. ลงทะเบียน CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClient", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")   // Origin ของ Angular dev-server
            .AllowAnyMethod()                       // GET, POST, PUT, DELETE ฯลฯ
            .AllowAnyHeader()                       // Content-Type, Authorization ฯลฯ
            .AllowCredentials();                    // ถ้าใช้ cookies/authentication
    });
});

// Add EF, repositories, services
builder.Services.AddDbContext<BookStoreContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHttpClient();
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ensure DB
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<BookStoreContext>();
    db.Database.EnsureCreated();
}

// 2. เปิด Swagger UI เสมอ
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My Book Store API V1");
    c.RoutePrefix = string.Empty;
});

// 3. เปิดใช้ CORS ก่อน MapControllers
app.UseCors("AllowAngularClient");

// 4. ถ้ามีไฟล์ static (Angular build) เอาไว้ข้างหลัง
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.Run();
