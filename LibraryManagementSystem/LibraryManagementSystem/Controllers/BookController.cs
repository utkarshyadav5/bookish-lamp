using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LibraryDataAccess;

namespace LibraryManagementSystem.Controllers
{
    public class BookController : ApiController
    {
        public IEnumerable<Book> GetBooks()
        {
            using (LMSEntities entities = new LMSEntities())
            {
                  return entities.Books.ToList();
            }
        }

        public Book GetBook(int id)
        {

            using (LMSEntities entities = new LMSEntities())
            {
                 return entities.Books.FirstOrDefault(e=>e.BookId==id);
            }
        }

        public HttpResponseMessage Post([FromBody] Book book)
        {
            using(LMSEntities entities=new LMSEntities())
            {
                entities.Books.Add(book);
                entities.SaveChanges();
                var message = Request.CreateResponse(HttpStatusCode.Created, book);
                return message;
            }
        }



    }
}
