using MyApiProject.Models;

namespace MyApiProject.Repositories
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetAllAsync();
    }
}
