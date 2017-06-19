using CodedHomes.Platform.Services;
using CodedHomes.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CodedHomes.Web.Controllers
{
    [Authorize]
    public class HomesController : Controller
    {
        private ApplicationUnit _unit = new ApplicationUnit();
        // GET: Homes
        [AllowAnonymous]
        public ActionResult Index()
        {
            HomesListViewModel vm = new HomesListViewModel();
            var query = this._unit.Homes.GetAll().OrderByDescending(s => s.Price);
            vm.Homes = query.ToList();
            return View("Index",vm);
        }

        protected override void Dispose(bool disposing)
        {
            this._unit.Dispose();
            base.Dispose(disposing);
        }
    }
}