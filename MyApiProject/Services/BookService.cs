using MyApiProject.Models;
using MyApiProject.Repositories;

namespace MyApiProject.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _repo;
        public BookService(IBookRepository repo) => _repo = repo;
        public async Task<IEnumerable<Book>> GetAllAsync() => await _repo.GetAllAsync();
    }
}
