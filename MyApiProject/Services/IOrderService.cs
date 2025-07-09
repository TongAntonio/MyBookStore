using MyApiProject.Models;

namespace MyApiProject.Services
{
    public interface IOrderService
    {
        Task<Order> CreateAsync(Order order);
        Task<IEnumerable<Order>> GetAllAsync();
    }
}
