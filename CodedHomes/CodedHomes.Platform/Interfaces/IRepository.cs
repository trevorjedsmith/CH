using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodedHomes.Platform.Interfaces
{
    public interface IRepository<T> where T : class
    {
        //Read
        IQueryable<T> GetAll();
        T GetById(int id);
        //Create
        void Add(T entity);
        //Update
        void Update(T entity);
        //Delete or detach
        void Delete(T entity);
        void Delete(int id);
        void Detach(T entity);
    }
}
