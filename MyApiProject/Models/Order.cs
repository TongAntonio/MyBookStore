using System.ComponentModel.DataAnnotations;

namespace MyApiProject.Models
{
    public class Order
    {
        public int orderId { get; set; }
        public string orderNumber { get; set; }
        public string bookId { get; set; }
        public string title { get; set; }
        public decimal price { get; set; }
        public string store { get; set; }
        public decimal totalPaid { get; set; }
        public DateTime createdAt { get; set; } = DateTime.UtcNow;
    }
}
