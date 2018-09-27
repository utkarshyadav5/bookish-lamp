using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using LibraryDataAccess;

namespace LibraryManagementSystem.Controllers
{
    public class BookController : ApiController
    {
        [Authorize]
        public IEnumerable<Book> GetBooks()
        {
            using (LMSEntities entities = new LMSEntities())
            {
                return entities.Books.ToList();
            }

        }

        [Authorize]
        public HttpResponseMessage GetBookById(int id)
        {
            try
            {
                using (LMSEntities entities = new LMSEntities())
                {
                    var entity = entities.Books.First(e => e.BookId == id);
                    if (entity != null)
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, entity);
                    }
                    else
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Book with id =" + id + " is not found");
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Authorize]
        public HttpResponseMessage GetBookByName(string bookName)
        {
            try
            {
                using (LMSEntities entities = new LMSEntities())
                {
                    var entity = entities.Books.First(e => e.BookName == bookName);
                    if (entity != null)
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, entity);
                    }
                    else
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Book " + bookName + " is not found");
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Post([FromBody] Book book)
        {
            try
            {
                using (LMSEntities entities = new LMSEntities())
                {
                    entities.Books.Add(book);
                    entities.SaveChanges();
                    var message = Request.CreateResponse(HttpStatusCode.Created, book);
                    return message;
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Authorize(Roles = "Admin")]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (LMSEntities entities = new LMSEntities())
                {
                    var entity = entities.Books.First(e => e.BookId == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                            "Book with Id = " + id.ToString() + " not found to delete");
                    }
                    else
                    {
                        entities.Books.Remove(entity);
                        entities.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK);
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Authorize]
        public HttpResponseMessage putBook(int id, [FromBody] Book book)
        {
            try
            {
                using (LMSEntities entities = new LMSEntities())
                {
                    var entity = entities.Books.First(e => e.BookId == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Book with id =" + id.ToString() + "is not found to update");
                    }
                    else
                    {
                        entity.BookName = book.BookName;
                        entity.Author = book.Author;
                        entity.Genre = book.Genre;
                        entity.AvailableNumber = book.AvailableNumber;
                        entity.Quantity = book.Quantity;
                        entities.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK, entity);
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [Authorize(Roles = "Admin")]
        public HttpResponseMessage putBookCount(int id, int count)
        {
            try
            {
                using (LMSEntities entities = new LMSEntities())
                {
                    var entity = entities.Books.First(e => e.BookId == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Book with id =" + id.ToString() + "is not found to update");
                    }
                    else
                    {
                        entity.AvailableNumber += count;
                        entity.Quantity += count;
                        entities.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK, entity);
                    }
                }

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }

        }
    }
}