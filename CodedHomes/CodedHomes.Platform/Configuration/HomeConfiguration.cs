using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity.ModelConfiguration;
using CodedHomes.Models;

namespace CodedHomes.Platform.Configuration
{
    public class HomeConfiguration : EntityTypeConfiguration<Home>
    {
        public HomeConfiguration()
        {
            //Address
            Property(p => p.StreetAddress).IsRequired().HasMaxLength(100);
            Property(p => p.StreetAddress2).IsOptional().HasMaxLength(100);
            Property(p => p.City).IsRequired().HasMaxLength(50);
            Property(p => p.ZipCode).IsRequired();
            Property(p => p.ImageName).HasMaxLength(100);

            //Audit
            Property(p => p.CreatedOn).IsRequired().HasColumnType("datetime");
            Property(p => p.ModifiedOn).IsRequired().HasColumnType("datetime");
        }
    }
}
