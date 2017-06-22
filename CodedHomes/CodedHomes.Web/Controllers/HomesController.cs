using CodedHomes.Models;
using CodedHomes.Platform.Services;
using CodedHomes.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
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
            return View("Index", vm);
        }

        public ActionResult New()
        {
            HomeViewModel vm = new HomeViewModel();
            vm.IsNew = true;

            return View("Home", vm);
        }

        public ActionResult Edit(int id = 0)
        {

            HomeViewModel vm = new HomeViewModel();
            vm.Home = this._unit.Homes.GetById(id);

            if(vm.Home != null)
            {
                return View("Home", vm);
            }

            return View("NotFound");
        }

        [HttpPost]
        public ActionResult UploadImage(HttpPostedFileBase image, int id)
        {
            JsonResult result;
            Home home;
            Random rand = new Random();
            string unique;
            string ext;
            string filename;
            string path;

            unique = rand.Next(1000000).ToString();
            ext = Path.GetExtension(image.FileName).ToLower();
            filename = string.Format("{0}-{1}{2}", id, unique, ext);

            path = Path.Combine(HttpContext.Server.MapPath(Config.ImagesFolderPath), filename);

            if (ext == ".png" || ext == ".jpg")
            {
                home = _unit.Homes.GetById(id);
                if(home != null)
                {
                    home.ImageName = filename;
                    _unit.Homes.Update(home);
                    _unit.SaveChanges();

                    image.SaveAs(path);

                    result = Json(new
                    {
                        imageUrl = string.Format("{0}{1}", Config.ImagesUrlPrefix, filename)
                    });
                }
                else
                {
                    result = Json(new
                    {
                        status = "error",
                        statusText = "There is no home with this id"
                    });
                }
            }
            else
            {
                result = Json(new
                {
                    status = "error",
                    statusText = "The file must be a jpg or png"
                });
            }

            return result;
        }

        protected override void Dispose(bool disposing)
        {
            this._unit.Dispose();
            base.Dispose(disposing);
        }
    }
}