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

        // POST /api/Orders/create
         [HttpPost("create")]
        public async Task<ActionResult<Order>> Create([FromBody] Order order)
        {
            var created = await _svc.CreateAsync(order);
            return CreatedAtAction(nameof(GetAll), new { id = created.OrderId }, created);
        }

         // POST /api/Orders
        [HttpPost]
        public IActionResult Post([FromBody] Order order)
        {
            if (order == null) 
                return BadRequest("Order body is null");

            // ... บันทึก order, กำหนด ID ฯลฯ
            order.OrderId = new Random().Next(1, 1000);
            return CreatedAtAction(nameof(Post), new { id = order.OrderId }, order);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetAll()
        {
            var orders = await _svc.GetAllAsync();
            return Ok(orders);
        }
   
    }
}
