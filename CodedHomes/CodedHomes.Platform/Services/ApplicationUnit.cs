using CodedHomes.Models;
using CodedHomes.Platform.Interfaces;
using CodedHomes.Platform.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodedHomes.Platform.Services
{
    public class ApplicationUnit : IDisposable
    {

        private DataContext _context = new DataContext();

        private IRepository<Home> _homes = null;

        public IRepository<Home> Homes
        {
            get
            {
                if(this._homes == null)
                {
                    this._homes = new GenericRepository<Home>(_context);
                }
                return this._homes;
            }
        }

        public void SaveChanges()
        {
            this._context.SaveChanges();
        }

        public void Dispose()
        {
            if(this._context != null)
            {
                this._context.Dispose();
            }
        }
    }
}
