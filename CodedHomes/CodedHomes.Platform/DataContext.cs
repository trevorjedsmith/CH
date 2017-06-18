using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;
using CodedHomes.Models;
using CodedHomes.Platform.Configuration;
using CodedHomes.Models.Interfaces;

namespace CodedHomes.Platform
{
    public class DataContext : DbContext
    {
        public DataContext():base("CodedHomes") { }

        public DbSet<Home> Homes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new HomeConfiguration());
            base.OnModelCreating(modelBuilder);
        }

        public override int SaveChanges()
        {
            ApplyRules();
            return base.SaveChanges();
        }

        private void ApplyRules()
        {
            foreach(var entry in ChangeTracker.Entries()
                   .Where(e=> e.Entity is IAuditInfo && 
                   (e.State == EntityState.Added) || (e.State== EntityState.Modified)))
            {
                IAuditInfo obj = (IAuditInfo)entry.Entity;

                if(entry.State == EntityState.Added)
                {
                    obj.CreatedOn = DateTime.Now;
                }

                obj.ModifiedOn = DateTime.Now;
            }
        }
    }
}
