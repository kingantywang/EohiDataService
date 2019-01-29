﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EohiDataServerApi.Areas.ThreeD.Controllers
{
    /// <summary>
    /// 定时调度
    /// </summary>
    public class TimingSchedulingController : Controller
    {
        EFDBHelper<Models.api_quartz> dbhelper = new EFDBHelper<Models.api_quartz>();
        #region 定时任务 

        public JsonResult ReStartQuerzt()
        {
            try
            {
               string mx= QuarztHelper.CreateHttpJobForModels();
                return Json(new
                {
                    success = true,
                    message = "定时服务已启动"+ mx
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }


        /// <summary>
        /// 获取定时任务的分页列表
        /// </summary>
        /// <param name="page"></param>
        /// <param name="rows"></param>
        /// <returns></returns>
        public JsonResult TimeTaskList(int page,int rows)
        {
            int total = 0;
            var list = dbhelper.Page(page, rows, out total, u => u.id, null);
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("total", total.ToString());
            dic.Add("rows", list);
            return Json(dic, JsonRequestBehavior.AllowGet);
        }
           /// <summary>
           /// 新增/修改定时任务
           /// </summary>
           /// <param name="api_Quartz"></param>
           /// <returns></returns>
        public JsonResult TimeTaskAdd(Models.api_quartz api_Quartz)
        {
            api_Quartz.mod_date = DateTime.Now;
            if (api_Quartz.id>0)
            {
                dbhelper.Update(api_Quartz);
                QuarztHelper.JoinJob(api_Quartz.id);
            }
            else
            {
                dbhelper.Insert(api_Quartz);
                QuarztHelper.JoinJob(api_Quartz.id);
            }
            var m = dbhelper.SaveChanges();
            if (m>0)
            {
                return Json(new
                {
                    success = true,
                    message = "保存成功",
                    data = m
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                success = false,
                message = "保存失败",
            }, JsonRequestBehavior.AllowGet);
        }
            /// <summary>
            /// 通过id获取定时任务
            /// </summary>
            /// <param name="id"></param>
            /// <returns></returns>
        public JsonResult SelectTimeTaskById(int id)
        {
            var tt = dbhelper.FindById(id);
            return Json(tt, JsonRequestBehavior.AllowGet);
        }
         /// <summary>
         /// 通过id 删除定时任务
         /// </summary>
         /// <param name="id"></param>
         /// <returns></returns>
        public JsonResult DeleteTimeTask(int id)
        {
            var tt = dbhelper.FindById(id);
            dbhelper.Delete(tt);
            QuarztHelper.RemoveJob(tt.id);
            var m = dbhelper.SaveChanges();
          
            if (m > 0)
            {
                return Json(new
                {
                    success = true,
                    message = "删除成功",
                    data = m
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                success = false,
                message = "删除失败",
            }, JsonRequestBehavior.AllowGet);
        }



              /// <summary>
              /// 修改定时任务的状态
              /// </summary>
              /// <param name="id"></param>
              /// <returns></returns>
          public JsonResult TimeTaskStatusbutChange(int id)
        {
            try
            {
                Models.api_quartz entity = dbhelper.FindById(id);
                if (entity != null)
                {
                    if (entity.quartzstatus == "启动")
                    {
                        entity.quartzstatus = "停止";
                        dbhelper.Update(entity);
                    }
                    else
                    {
                        entity.quartzstatus = "启动";
                        dbhelper.Update(entity);
                      
                    }
                    dbhelper.SaveChanges();
                    QuarztHelper.JoinJob(entity.id);
                }

                return Json(new { access = true });
            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }
        }

        #endregion
    }
}
