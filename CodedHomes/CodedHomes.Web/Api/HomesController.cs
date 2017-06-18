using CodedHomes.Models;
using CodedHomes.Platform.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CodedHomes.Web.Api
{
    [Authorize]
    public class HomesController : ApiController
    {
        private ApplicationUnit _unit = new ApplicationUnit();

        [AllowAnonymous]
        [HttpGet]
        [Route("api/homes")]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(this._unit.Homes.GetAll());
            }
            catch(Exception ex)
            {
                return Json(new {Exception = ex });
            }           
        }

        [Authorize(Roles ="Admin, Manager, User")]
        [HttpGet]
        [Route("api/homes/{id}")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                var home = this._unit.Homes.GetById(id);
                if(home == null)
                {
                    return NotFound();
                }
                return Ok(home);
            }
            catch(Exception ex)
            {
                return Json(new { Exception = ex });
            }
        }

        [Authorize(Roles ="Admin, Manager, User")]
        [HttpPut]
        [Route("api/homes/{id}")]
        public IHttpActionResult Put(int id, Home home)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != home.Id)
                {
                    return BadRequest();
                }

                var existingHome = this._unit.Homes.GetById(id);

                _unit.Homes.Detach(existingHome);
                home.CreatedOn = existingHome.CreatedOn;

                //save changes
                this._unit.Homes.Update(home);
                this._unit.SaveChanges();
                return Ok(new { UpdatedHome = home });
            }
            catch (Exception ex)
            {
                return Json(new { Exception = ex });
            }

        }

        [Authorize(Roles ="Admin, Manager, User")]
        [HttpPost]
        [Route("api/homes")]
        public IHttpActionResult Post(Home home)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    this._unit.Homes.Add(home);
                    this._unit.SaveChanges();

                    return Created("api/homes/",home);
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch(Exception ex)
            {
                return Json(new { Exception = ex });
            }
        }

        [Authorize(Roles ="Admin, Manager")]
        [HttpDelete]
        [Route("api/homes/{id}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                var home = this._unit.Homes.GetById(id);

                if (home == null)
                {
                    return NotFound();
                }

                this._unit.Homes.Delete(home);
                this._unit.SaveChanges();
                return Ok(home);

            }
            catch (Exception ex)
            {

                return Json(new { Exception = ex });
            }
        }
    }
}
