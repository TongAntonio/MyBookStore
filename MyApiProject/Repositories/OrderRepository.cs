using MyApiProject.Data;
using MyApiProject.Models;

namespace MyApiProject.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly BookStoreContext _ctx;

        public OrderRepository(BookStoreContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<Order> CreateAsync(Order order)
        {
            order.OrderNumber = $"ORD-{Guid.NewGuid():N}".ToUpper();
            _ctx.Orders.Add(order);
            await _ctx.SaveChangesAsync();
            return order;
        }

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await Task.FromResult(_ctx.Orders.OrderByDescending(o => o.CreatedAt).AsEnumerable());
        }
    }
}
