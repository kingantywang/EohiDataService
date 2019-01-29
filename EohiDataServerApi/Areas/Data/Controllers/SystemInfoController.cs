﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EohiDataServerApi.Areas.ThreeD.Controllers
{
    public class SystemInfoController : Controller
    {
        EFDBHelper<Models.a_systeminfo> dbhelper = new EFDBHelper<Models.a_systeminfo>();
        EFDBHelper<Models.a_system_updatefile> dbupdate = new EFDBHelper<Models.a_system_updatefile>();
        EFDBHelper<Models.a_system_article> dbarticle = new EFDBHelper<Models.a_system_article>();
        EFDBHelper<Models.api_role> dbrole = new EFDBHelper<Models.api_role>();
        EFDBHelper<Models.api_role_menu> dbrolemenu = new EFDBHelper<Models.api_role_menu>();
        EFDBHelper<Models.api_user_role> dbroleUser = new EFDBHelper<Models.api_user_role>();
        EFDBHelper<Models.api_user> dbuser = new EFDBHelper<Models.api_user>();
        #region 系统信息


        //系统信息
        public JsonResult SystemInfoData()
        {
            var item = new Models.a_systeminfo();
            var list = dbhelper.GetAll(u => u.id);
            if (list.Count > 0)
            {
                item = list.FirstOrDefault();
            }
            else
            {
                item = new Models.a_systeminfo();
                item.system_id = Guid.NewGuid().ToString().ToUpper();

                item.system_name = "";
                item.system_worksitename = "";

                item.company_name = "";
                item.company_linkman = "";
                item.company_tel = "";
                item.company_address = "";

                item.system_licenseno = "未授权";
                item.system_effdate_e = "未授权";
                item.system_effdate_s = "未授权";


            }

            string directoryPath = Server.MapPath("~/LicenseFile/");
            string filepath = directoryPath + "/" + "License.lic";
            MyLicense license = MyLicenseHelper.Get(filepath);

            if (license.licenseno == "")
            {
                item.system_licenseno = "未授权";
                item.system_effdate_e = "未授权";
                item.system_effdate_s = "未授权";
            }
            else
            {
                item.system_licenseno = license.licenseno;
                item.system_effdate_s = license.licensedatestart.ToString("yyyy-MM-dd");
                item.system_effdate_e = license.licensedateend.ToString("yyyy-MM-dd");
            }
            return Json(item, JsonRequestBehavior.AllowGet);
        }

        //保存系统信息
        [HttpPost]
        public JsonResult SystemInfoSave(Models.a_systeminfo entity)
        {
            int m = 0;
            if (entity.id <= 0)
            {
                dbhelper.Insert(entity);
                m = dbhelper.SaveChanges();
            }
            else
            {
                var olditem = dbhelper.FindById(entity.id);
                if (olditem != null)
                {
                    //olditem. = System.Data.EntityState.Detached; 
                    //这个是在同一个上下文能修改的关键
                    dbhelper.GetDbContext().Entry<Models.a_systeminfo>(olditem).State = System.Data.EntityState.Detached;

                    entity.system_effdate_e = olditem.system_effdate_e;
                    entity.system_effdate_s = olditem.system_effdate_s;
                    entity.system_licenseno = olditem.system_licenseno;
                }
                dbhelper.Update(entity);
                m = dbhelper.SaveChanges();
            }
            return Json(m, JsonRequestBehavior.AllowGet);
        }

        //得到上传文件列表
        public JsonResult GetUpdateFileList(int page, int rows, string order, string sort)
        {
            int total = 0;
            bool isAsc = true;
            if (sort == "dasc")
            {
                isAsc = false;
            }
            var list = dbupdate.LoadPageItems(rows, page, out total, u => u.id >= 0, u => order, isAsc).ToList();
            return Json(new {
                rows=list,
                total=total
            }, JsonRequestBehavior.AllowGet);
        }


        private int? filesize = 0;
        private string fileUrl = null;
        /// <summary>
        /// 保存文件信息
        /// </summary>
        /// <param name="a_System_Updatefile"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult UpdateFileSave(Models.a_system_updatefile a_System_Updatefile)
        {
            //Models.a_system_updatefile a_System_Updatefile = new Models.a_system_updatefile();
            //a_System_Updatefile.filename = filename;
            //a_System_Updatefile.filesize =Convert.ToInt32( filesize);
            //a_System_Updatefile.savedir = savedir;
            //a_System_Updatefile.versionno = versionno;
            //a_System_Updatefile.fileurl = fileinputidhib;
            a_System_Updatefile.uptime = DateTime.Now;
            if (a_System_Updatefile.id > 0)
            {
                dbupdate.Update(a_System_Updatefile);
            }
            else
            {
                dbupdate.Insert(a_System_Updatefile);

            }
            var m = dbupdate.SaveChanges();
            if (m > 0)
            {
                return Json(new
                {
                    statusCode = 200,
                    title = "操作提示",
                    message = "恭喜你，保存成功！"
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                statusCode = 300,
                title = "操作提示",
                message = "恭喜你，保存失败！"
            }, JsonRequestBehavior.AllowGet);
            //   return Json(m, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 通过id获取文件信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult SelectFileById(int id)
        {
            var file = dbupdate.FindById(id);
            fileUrl = file.fileurl;
            filesize = file.filesize;
            return Json(file, JsonRequestBehavior.AllowGet);
        }

        //文件更新上传文件

        [ValidateInput(false)]
        public JsonResult UpdateFileUp()
        {
            bool isSavedSuccessfully = true;
            string fName = "";
            int fileSize = 0;
            string path = null;
            try
            {
                foreach (string fileName in Request.Files)
                {
                    HttpPostedFileBase file = Request.Files[fileName];
                    //Save file content goes here
                    fName = file.FileName;
                    string exName = System.IO.Path.GetExtension(file.FileName); //得到扩展名



                    if (file != null && file.ContentLength > 0)
                    {
                        fileSize = file.ContentLength / 1024;
                        filesize = fileSize;
                        var originalDirectory = new DirectoryInfo(string.Format("{0}NewAdmin\\update", Server.MapPath(@"\")));

                        string pathString = System.IO.Path.Combine(originalDirectory.ToString(), DateTime.Now.ToString("yyyy-MM-dd"));
                        // var fileName1 = Path.GetFileName(file.FileName);
                        var fileName1 = Guid.NewGuid().ToString() + exName;
                        fName = fileName1;
                        bool isExists = System.IO.Directory.Exists(pathString);

                        if (!isExists)
                            System.IO.Directory.CreateDirectory(pathString);

                        path = string.Format("{0}\\{1}", pathString, fileName1);



                        if (System.IO.File.Exists(path))
                            System.IO.File.Delete(path);
                        //保存
                        file.SaveAs(path);

                        fileUrl = "update/" + DateTime.Now.ToString("yyyy-MM-dd") + "/" + fName;
                    }
                }

            }
            catch (Exception ex)
            {
                isSavedSuccessfully = false;
            }


            if (isSavedSuccessfully)
            {
                //   Dictionary<string, object> dic = new Dictionary<string, object>();
                //   dic.Add("filename", fName);
                //   dic.Add("filesize", fileSize + "k");
                //var str=   JsonConvert.SerializeObject(dic);

                return Json(new
                {
                    statusCode = 200,
                    title = "操作提示",
                    filename = fName,
                    filesize = fileSize + "k",
                    message = "上传成功！",
                    //   filePath=path


                    filePath = "update/" + DateTime.Now.ToString("yyyy-MM-dd") + "/" + fName,

                }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new
                {
                    Message = "Error in saving file"
                });
            }
        }
        //通过id删除文件更新中的文件
        public JsonResult DeleteFileUpById(int id)
        {
            var file = dbupdate.FindById(id);
            if (file != null)
            {
                dbupdate.Delete(file);
            }
            int mint = dbupdate.SaveChanges();
            if (mint > 0)
            {
                return Json(new
                {
                    success = true,
                    title = "操作提示",
                    message = "恭喜你，删除成功！"
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                success = false,
                title = "操作提示",
                message = "恭喜你，删除失败！"
            }, JsonRequestBehavior.AllowGet);
        }

        //许可证
        public JsonResult LicenseGet()
        {
            var item = dbhelper.GetAll(u => u.id).FirstOrDefault();
            if (item != null)
            {
            }
            else
            {
                item = new Models.a_systeminfo();
                item.system_id = Guid.NewGuid().ToString().ToUpper();
                item.system_name = "";
                item.system_worksitename = "";
                item.company_name = "";
                item.company_linkman = "";
                item.company_tel = "";
                item.company_address = "";

                item.system_licenseno = "未授权";
                item.system_effdate_e = "未授权";
                item.system_effdate_s = "未授权";
            }

            string directoryPath = Server.MapPath("~/LicenseFile/");
            string filepath = directoryPath + "License.lic";
            MyLicense license = MyLicenseHelper.Get(filepath);

            if (license.licenseno == "")
            {
                item.system_licenseno = "未授权";
                item.system_effdate_e = "未授权";
                item.system_effdate_s = "未授权";
            }
            else
            {
                item.system_licenseno = license.licenseno;
                item.system_effdate_s = license.licensedatestart.ToString("yyyy-MM-dd");
                item.system_effdate_e = license.licensedateend.ToString("yyyy-MM-dd");
            }
            LinenceMap linenceMap = new LinenceMap();
            linenceMap.system_licenseno = item.system_licenseno;
            linenceMap.system_effdate_s = item.system_effdate_s;
            linenceMap.system_effdate_e = item.system_effdate_e;


            string hardcode = Computer.GetBIOSInfo().ToUpper();
            hardcode = DESEncrypt.md5(hardcode, 32).ToUpper();
            linenceMap.system_hardwarecode = hardcode;

            return Json(linenceMap, JsonRequestBehavior.AllowGet);
        }
        //企业动态列表
        public JsonResult EntDynamics(int page, int rows)
        {
            int total = 0;
            var list = dbarticle.Page(page, rows, out total, u => u.id, null);
            //Models.api_items
            return Json(new {
                rows=list,
                total
            },
            JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 首页
        /// </summary>
        /// <param name="page"></param>
        /// <param name="rows"></param>
        /// <returns></returns>
        public JsonResult TopEntDynamics(int page, int rows)
        {
            int total = 0;
            List<Models.a_system_article> a_System_Articles = dbarticle.GetAll(u => u.istop == 1, u => u.id);
            if (a_System_Articles.Count>=10)
            {
                return Json(a_System_Articles,
      JsonRequestBehavior.AllowGet);
            }
            else
            {
                var list = dbarticle.Page(page, rows, out total, u => u.id, u=>u.istop!=1);
                if (list.Count>0)
                {
                    a_System_Articles = a_System_Articles.Union(list.Skip(0).Take(10 - a_System_Articles.Count)).ToList();
                }
                return Json(a_System_Articles,
                JsonRequestBehavior.AllowGet);
            }
        }


        //通过id获取企业动态
        public JsonResult EntDynamicsById(int? id)
        {
            Models.a_system_article item = dbarticle.FindById(id);
            return Json(item, JsonRequestBehavior.AllowGet);
        }
        //通过id删除企业动态
        public JsonResult EntDynamicsDel(int id)
        {
            var art = dbarticle.FindById(id);
            dbarticle.Delete(art);
            int m = dbarticle.SaveChanges();
            return Json(m, JsonRequestBehavior.AllowGet);
        }
        //新增或编辑修改企业动态
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult EntDynamicsyAdd(Models.a_system_article a_System_Article)
        {
            if (a_System_Article.articlecontent==null)
            {
                a_System_Article.articlecontent = "";
            }
            if (a_System_Article.title==null)
            {
                a_System_Article.title = "";
            }
            if (a_System_Article.subtitle==null)
            {
                a_System_Article.subtitle = "";
            }
            if (a_System_Article.perviewimage==null)
            {
                a_System_Article.perviewimage = "";
            }
            if (a_System_Article.putime==null)
            {
                a_System_Article.putime = DateTime.Now;
            }
            if (a_System_Article.author==null)
            {
                a_System_Article.author = "";
            }
            if (a_System_Article.istop!=1)
            {
                a_System_Article.istop = 0;
            }
            if (a_System_Article.id > 0)
            {
                dbarticle.Update(a_System_Article);
            }
            else
            {
                a_System_Article.putime = DateTime.Now;
                dbarticle.Insert(a_System_Article);
            }
            int m = dbarticle.SaveChanges();
            if (m>0)
            {
                return Json(new
                {
                    success = true,
                    data = m,
                    message = "保存成功"
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                success = false,
                data = m,
                message = "保存失败，请重试"
            }, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region 角色管理

        public JsonResult AdmSystemRoles(int page, int rows)
        {
            int total = 0;
            var list = dbrole.Page(page, rows, out total, u => u.id, null);
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("rows", list);
            dic.Add("total", total.ToString());
            dic.Add("page", page);
            return Json(dic, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult AddAdmSystemRole(Models.api_role api_Role)
        {
          var role=  dbrole.FirstOrDefault(u => u.role_name == api_Role.role_name);
            if (role!=null)
            {
                return Json(new
                {
                    success = false,
                    message = "此角色已存在"
                }, JsonRequestBehavior.AllowGet);
            }
            if (api_Role.id > 0)
            {
                dbrole.Update(api_Role);
            }
            else
            {
                api_Role.role_guid = Guid.NewGuid().ToString();
                api_Role.create_time = DateTime.UtcNow;
                dbrole.Insert(api_Role);
            }
            int mx = dbrole.SaveChanges();
            if (mx > 0)
            {
                return Json(new
                {
                    success = true,
                    data = mx,
                    message = "保存成功"
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                success = false,
                data = mx,
                message = "保存失败，请重试"
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetApiRoleById(int id)
        {
            Models.api_role api_Role = dbrole.FindById(id);
            return Json(api_Role, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteAPIRoleById(int id)
        {
                var apiite = dbrole.FindById(id);
            dbrole.Delete(apiite);
            if (apiite!=null)
            {
             List<Models.api_user_role> api_User_Roles=   dbroleUser.GetAll(u => u.role_guid == apiite.role_guid, u => u.id);
                if (api_User_Roles.Count>0)
                {
                    api_User_Roles.ForEach(mx => dbroleUser.Delete(mx));
                }
                List<Models.api_role_menu> api_Role_Menus = dbrolemenu.GetAll(u => u.role_guid == apiite.role_guid, u => u.id);
                if (api_Role_Menus.Count>0)
                {
                    api_Role_Menus.ForEach(mx => dbrolemenu.Delete(mx));
                }

            }
            int m = dbhelper.SaveChanges();
            m += dbroleUser.SaveChanges();
            m += dbrolemenu.SaveChanges();
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


        public JsonResult GetUsersByRoleGuid(string guid)
        {
            List<string> roleuserguids = new List<string>();
            dbroleUser.GetAll(u => u.role_guid == guid, u => u.id).ForEach(m => roleuserguids.Add(m.user_guid));
            List<Models.api_user> api_UsersAll = dbuser.GetList<Models.api_user>(u => u.id > 0);
            return Json(new
            {
                success = true,
                message = "请求成功",
                dataRoleUserGuids = roleuserguids,
                dataAllUsers = api_UsersAll
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateApiRoleUser(string roleguid, string roleuserguids)
        {
            if (roleuserguids != null && roleuserguids.Length > 0)
            {
                string[] roleusers = roleuserguids.Split(new char[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries);
                List<Models.api_user_role> api_User_Roles = dbroleUser.GetAll(u => u.role_guid == roleguid, u => u.id > 0);
                if (api_User_Roles.Count > 0)
                {
                    api_User_Roles.ForEach(u => dbroleUser.Delete(u));
                }
                roleusers.ToList().ForEach(u =>
                  {
                      dbroleUser.Insert(new Models.api_user_role() { role_guid = roleguid, user_guid = u });
                  });
            }
            int mx = dbroleUser.SaveChanges();
            return Json(new
            {
                success = true,
                message = "请求成功",
                data = mx
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateApiRoleMenus(string roleguid, string checkedNodes)
        {
            if (checkedNodes != null && checkedNodes.Length > 0)
            {
                string[] rolemenus = checkedNodes.Split(new char[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries);
                List<Models.api_role_menu> api_Role_Menus = dbrolemenu.GetAll(u => u.role_guid == roleguid, u => u.id > 0);
                if (api_Role_Menus.Count > 0)
                {
                    api_Role_Menus.ForEach(u => dbrolemenu.Delete(u));
                }
                rolemenus.ToList().ForEach(u =>
                {
                    dbrolemenu.Insert(new Models.api_role_menu() { role_guid = roleguid, menu_guid = u });
                });
            }
            int mx = dbroleUser.SaveChanges();
            return Json(new
            {
                success = true,
                message = "请求成功",
                data = mx
            }, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetRoleMenusbyRoleGuid(string roleguid)
        {
            List<Models.api_role_menu> api_Role_Menus = dbrolemenu.GetAll(u => u.role_guid == roleguid, u => u.id > 0);
            List<string> rolemenuguids = new List<string>();
            if (api_Role_Menus != null && api_Role_Menus.Count > 0)
            {
                api_Role_Menus.ForEach(u => rolemenuguids.Add(u.menu_guid));
            }
            return Json(new
            {
                success = true,
                data = rolemenuguids,
                message = "请求成功"
            }, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region 用户管理
        public JsonResult AdmSystemUsers(int page, int rows)
        {
            int total = 0;
            var list = dbuser.Page(page, rows, out total, u => u.id, null);
            Dictionary<string, object> dic = new Dictionary<string, object>();
            dic.Add("rows", list);
            dic.Add("total", total.ToString());
            dic.Add("page", page);
            return Json(dic, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult AddAdmSystemUser(Models.api_user api_User)
        {
           var user= dbuser.FirstOrDefault(u => u.user_name == api_User.user_name);
            if (user!=null)
            {
                return Json(new
                {
                    success = false,
                    message = "此用户已存在"
                }, JsonRequestBehavior.AllowGet);
            }
            if (api_User.id > 0)
            {
                dbuser.Update(api_User);
            }
            else
            {
                api_User.user_id = Guid.NewGuid().ToString();
                api_User.create_time = DateTime.UtcNow;
                dbuser.Insert(api_User);
            }
            List<string> userroleguids = new List<string>();
            if (api_User.user_roles != null && api_User.user_roles.Length > 0 && api_User.user_roles != "")
            {
                userroleguids = api_User.user_roles.Split(new char[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries).ToList();
            }
            int mx = dbuser.SaveChanges();
            List<Models.api_user_role> api_User_Roles = dbroleUser.GetAll(u => u.user_guid == api_User.user_id, u => u.id > 0);
            if (api_User_Roles != null && api_User_Roles.Count > 0)
            {
                api_User_Roles.ForEach(u => dbroleUser.Delete(u));
                mx += dbroleUser.SaveChanges();
            }
            userroleguids.ForEach(u => { dbroleUser.Insert(new Models.api_user_role() { user_guid = api_User.user_id, role_guid = u }); mx += dbroleUser.SaveChanges(); });
            if (mx > 0)
            {
                return Json(new
                {
                    success = true,
                    data = mx,
                    message = "保存成功"
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                success = false,
                data = mx,
                message = "保存失败，请重试"
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetApiUserById(string guid)
        {
            Models.api_user api_User = dbuser.GetAll(u => u.user_id == guid,u=>u.id).FirstOrDefault();
            List<string> userroleguids = new List<string>();
            dbroleUser.GetAll(u => u.user_guid == guid, u => u.id).ForEach(m => userroleguids.Add(m.role_guid));
            List<Models.api_role> api_RolesAll = dbrole.GetList<Models.api_role>(u => u.id > 0);
            return Json(new
            {
                success = true,
                message = "请求成功",
                dataapiuser = api_User,
                dataUserRoleGuids = userroleguids,
                dataAllRoles = api_RolesAll
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteAPIUserById(int id)
        {
            var apiite = dbuser.FindById(id);
            dbuser.Delete(apiite);
            if (apiite!=null)
            {
                List<Models.api_user_role> api_User_Roles = dbroleUser.GetAll(u => u.user_guid == apiite.user_id, u => u.id);
                if (api_User_Roles.Count>0)
                {
                    api_User_Roles.ForEach(mx => dbroleUser.Delete(mx));
                }
            }
            int m = dbuser.SaveChanges();
            m += dbroleUser.SaveChanges();
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

        public JsonResult GetRolesByUserGuid(string guid)
        {
            List<string> userroleguids = new List<string>();
            dbroleUser.GetAll(u => u.role_guid == guid, u => u.id).ForEach(m => userroleguids.Add(m.role_guid));
            List<Models.api_role> api_RolesAll = dbrole.GetList<Models.api_role>(u => u.id > 0);
            return Json(new
            {
                success = true,
                message = "请求成功",
                dataUserRoleGuids = userroleguids,
                dataAllRoles = api_RolesAll
            }, JsonRequestBehavior.AllowGet);
        }
        #endregion

    }


    //许可证数据类
    class LinenceMap
    {
        public string system_hardwarecode { get; set; }
        public string system_licenseno { get; set; }
        public string system_effdate_s { get; set; }
        public string system_effdate_e { get; set; }

        public string fileUrl { get; set; }
    }



}
