using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace Intranet.Extensions;
public interface IRepository<T> where T : class
{
    string ConnectionString{get;}
    Task<IEnumerable<T>> FindAll();
    Task<T> FindById(int id);
    Task Add(T entity);
    Task Delete(int id);
    Task Update(T entity);
}

