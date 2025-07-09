using MyApiProject.Models;
using MyApiProject.Repositories;

namespace MyApiProject.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _repo;
        public OrderService(IOrderRepository repo) => _repo = repo;

        public async Task<Order> CreateAsync(Order order) => await _repo.CreateAsync(order);

        public async Task<IEnumerable<Order>> GetAllAsync() => await _repo.GetAllAsync();
    }
}
