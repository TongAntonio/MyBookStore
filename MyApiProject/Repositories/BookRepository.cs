using System.Text.Json;
using MyApiProject.Models;

namespace MyApiProject.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly IHttpClientFactory _http;
        private readonly IConfiguration _config;

        public BookRepository(IHttpClientFactory http, IConfiguration config)
        {
            _http = http;
            _config = config;
        }

        public async Task<IEnumerable<Book>> GetAllAsync()
        {
            var client = _http.CreateClient();
            var books = new List<Book>();

            foreach (var kv in _config.GetSection("ExternalApis").GetChildren())
            {
                var store = kv.Key;
                var url   = kv.Value;
                var json  = await client.GetStringAsync(url);
                var list  = JsonSerializer.Deserialize<List<BookDto>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                books.AddRange(list.Select(b => new Book {
                    Id     = b.Id,
                    Title  = b.Title,
                    Author = b.Author,
                    Price  = b.Price,
                    Store  = store
                }));
            }

            return books;
        }
    }
}
