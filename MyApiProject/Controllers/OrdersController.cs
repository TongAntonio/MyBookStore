using Microsoft.AspNetCore.Mvc;
using MyApiProject.Models;
using MyApiProject.Services;

namespace MyApiProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _svc;
        public OrdersController(IOrderService svc) => _svc = svc;

        [HttpPost]
        public async Task<ActionResult<Order>> Create([FromBody] Order order)
        {
            var created = await _svc.CreateAsync(order);
            return CreatedAtAction(nameof(GetAll), new { id = created.OrderId }, created);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetAll()
        {
            var orders = await _svc.GetAllAsync();
            return Ok(orders);
        }
    }
}
