﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EohiDataServerApi.Areas.Admin.Controllers
{
    public class ArticleController : Controller
    {
        EFDBHelper<Models.a_system_article> dbhelper = new EFDBHelper<Models.a_system_article>();
        //
        // GET: /Admin/Article/

        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 获取列表;
        /// </summary>
        /// <param name="page"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public JsonResult getlist(int page, int limit)
        {
            int rows = 0;
           var list = dbhelper.Page(page, limit, out rows, u => u.id, null);
            //Models.api_items
            return Json(new
            {
                code = 0,
                msg = "",
                count = rows,
                data = list
            },
            JsonRequestBehavior.AllowGet);
        }
        [ValidateInput(false)]
        public ActionResult Edit(int id)
        {
            Models.a_system_article item = dbhelper.FindById(id);
            //Models.Model_ApiItem entity = new Models.Model_ApiItem();
            if (item == null)
            {
                //新增;
                item = new Models.a_system_article();
                item.id = 0;
                item.istop = 0;
                item.title = "";
                item.subtitle = "";
                item.perviewimage = "";
                item.author = "";
                item.source = "转发";
                item.articlecontent = "";
                ViewBag.entity = item;
            }
            else
            {
                // ApiItemService.GetById(id);
                ViewBag.entity = item;
            }
            return View();//
        }


        [HttpPost]
        [ValidateInput(false)]
        public JsonResult dataSave(Models.a_system_article entity)
        {
            try
            {
                if (entity.id <= 0)
                {
                    dbhelper.Insert(entity);
                    dbhelper.SaveChanges();
                }
                else
                {
                    dbhelper.Update(entity);
                    dbhelper.SaveChanges();
                }
                return Json(new { access = true });

            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }

        }

        public JsonResult Del(int id)
        {
            try
            {
                Models.a_system_article item = dbhelper.FindById(id);
                dbhelper.Delete(item);
                dbhelper.SaveChanges();
                return Json(new { access = true });
            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }
        }
    }
}