using System.ComponentModel.DataAnnotations;

namespace MyApiProject.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public string OrderNumber { get; set; }
        public string BookId { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string Store { get; set; }
        public decimal TotalPaid { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
