using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Microsoft.AspNet.Identity;
using CodedHomes.Web.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace CodedHomes.Web.Helpers
{
    public class RoleEvaluator
    {
        ApplicationDbContext userscontext = new ApplicationDbContext();
        private UserStore<ApplicationUser> userStore;
        private UserManager<ApplicationUser> userManager;

        public RoleEvaluator()
        {          
            userStore = new UserStore<ApplicationUser>(userscontext);
            userManager = new UserManager<ApplicationUser>(userStore);
        }

        public bool CanEdit
        {
            get
            {
                var userId = System.Web.HttpContext.Current.User.Identity.GetUserId();
                return userManager.IsInRole(userId, "Admin") || 
                       userManager.IsInRole(userId, "Manager") || 
                       userManager.IsInRole(userId, "User");
            }
        }

        public bool CanDelete
        {
            get
            {
                var userId = System.Web.HttpContext.Current.User.Identity.GetUserId();
                return userManager.IsInRole(userId, "Admin") ||
                       userManager.IsInRole(userId, "Manager");
            }
        }
    }
}