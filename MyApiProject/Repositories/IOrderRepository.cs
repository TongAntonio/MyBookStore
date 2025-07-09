using MyApiProject.Models;

namespace MyApiProject.Repositories
{
    public interface IOrderRepository
    {
        Task<Order> CreateAsync(Order order);
        Task<IEnumerable<Order>> GetAllAsync();
    }
}
