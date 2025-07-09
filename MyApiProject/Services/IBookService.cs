using MyApiProject.Models;

namespace MyApiProject.Services
{
    public interface IBookService
    {
        Task<IEnumerable<Book>> GetAllAsync();
    }
}
