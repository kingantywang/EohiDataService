﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EohiDataServerApi.Areas.WF.Controllers
{
    public class DataController : Controller
    {
        //
        // GET: /WF/Data/

        EFDBHelper<Models.a_flowchart> chartHelper = new EFDBHelper<Models.a_flowchart>();
        EFDBHelper<Models.a_flowchart_line> lineHelper = new EFDBHelper<Models.a_flowchart_line>();
        EFDBHelper<Models.a_flowchart_node> nodeHelper = new EFDBHelper<Models.a_flowchart_node>();
        EFDBHelper<Models.a_flowchart_node_approveitem> nodeApproveHelper = new EFDBHelper<Models.a_flowchart_node_approveitem>();
        EFDBHelper<Models.a_flowchart_node_switchitem> nodeSwitchHelper = new EFDBHelper<Models.a_flowchart_node_switchitem>();
        //
        // GET: /WorkFlow/Data/

        public ActionResult Index()
        {
            return View();
        }


        public JsonResult GetList()
        {
            List<Models.a_flowchart> list = chartHelper.GetAll(u => u.id > 0);
            if (list != null && list.Count > 0)
            {

                return Json(new
                {
                    success = true,
                    code = list.Count,
                    msg = "请求成功",
                    total = list.Count,
                    rows = list
                }, JsonRequestBehavior.AllowGet);

            }
            return Json(new
            {
                success = false,
                code = 0,
                msg = "暂无数据，或操作有误"
            }, JsonRequestBehavior.AllowGet);
        }
        //[HttpPost]
        [ValidateInput(false)]
        public JsonResult AddFlow(Models.a_flowchart a_Flowchart)
        {
            if (a_Flowchart != null && a_Flowchart.id > 0)
            {
                chartHelper.Update(a_Flowchart);
            }
            else
            {
                a_Flowchart.flowchart_id = Guid.NewGuid().ToString().ToUpper();
                chartHelper.Insert(a_Flowchart);
            }
            int m = chartHelper.SaveChanges();

            //return Json(m, JsonRequestBehavior.AllowGet);
            return Json(new
            {
                success = true,
                count = m,
                data = a_Flowchart
            }, JsonRequestBehavior.AllowGet);
        }


        //[HttpPost]
        [ValidateInput(false)]
        public JsonResult AddFlowEdit(Models.a_flowchart a_Flowchart)
        {
                //int flowid, string flowchart_version, string note,string flowchart_id
            if (a_Flowchart.id > 0)
            {
                chartHelper.Update(a_Flowchart);
            }
            int m = chartHelper.SaveChanges();

            return Json(new { 
                success=true,
                count =m,
                data = a_Flowchart
            }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFlowById(int id)
        {
            var flow = chartHelper.FindById(id);
            if (flow != null && flow.id > 0)
            {
                return Json(new
                {
                    success = true,
                    data = flow
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                success = false,
            }, JsonRequestBehavior.AllowGet);
     
        }

        public JsonResult DeleteFlowById(int id)
        {
            var flow = chartHelper.FindById(id);
            chartHelper.Delete(flow);
            int m = chartHelper.SaveChanges();
            if (m>0)
            {
                return Json(new
                {
                    success = true,
                    code=m,
                    data = flow
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                success = false,
                code=0,
            }, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public JsonResult clearChart(string flowchart_id)
        {
            try
            {
                //删除线条
                lineHelper.Delete(u => u.flowchart_id == flowchart_id);
                lineHelper.SaveChanges();

                //删除节点
                nodeHelper.Delete(u => u.flowchart_id == flowchart_id);
                nodeHelper.SaveChanges();


                //删除节点审批项定义
                nodeApproveHelper.Delete(u => u.flowchart_id == flowchart_id);
                nodeApproveHelper.SaveChanges();

                //删除节点分支定义
                nodeSwitchHelper.Delete(u => u.flowchart_id == flowchart_id);
                nodeSwitchHelper.SaveChanges();


                return Json(new
                {
                    access = true,
                    code = 0,
                    msg = ""
                },
                JsonRequestBehavior.AllowGet);
            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }
        }

        [HttpPost]
        public JsonResult getLines(string flowchart_id)
        {
            try
            {
                int rows = 0;
                var list = lineHelper.GetAll(u => u.flowchart_id == flowchart_id,u=>u.id);
                return Json(new
                {
                    access = true,
                    code = 0,
                    msg = "",
                    count = rows,
                    data = list
                },
                JsonRequestBehavior.AllowGet);
            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }
        }

        [HttpPost]
        public JsonResult getNodes(string flowchart_id)
        {
            try
            {
                int rows = 0;
                var list = nodeHelper.GetAll(u => u.flowchart_id == flowchart_id,a=> a.id).ToList();
                return Json(new
                {
                    access = true,
                    code = 0,
                    msg = "",
                    count = rows,
                    data = list
                },
                JsonRequestBehavior.AllowGet);
            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }
        }

        [HttpPost]
        public JsonResult getNodesApprove(string flowchart_id)
        {
            try
            {
                int rows = 0;
                var list = nodeApproveHelper.GetAll(u => u.flowchart_id == flowchart_id, a => a.id).ToList();
                return Json(new
                {
                    access = true,
                    code = 0,
                    msg = "",
                    count = rows,
                    data = list
                },
                JsonRequestBehavior.AllowGet);
            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }
        }


        [HttpPost]
        public JsonResult getNodesSwitch(string flowchart_id)
        {
            try
            {
                int rows = 0;
                var list = nodeSwitchHelper.GetAll(u => u.flowchart_id == flowchart_id, a => a.id).ToList();
                return Json(new
                {
                    access = true,
                    code = 0,
                    msg = "",
                    count = rows,
                    data = list
                },
                JsonRequestBehavior.AllowGet);
            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }
        }



        /// <summary>
        /// 通过节点node_id 获取节点数据;
        /// </summary>
        /// <param name="node_id"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult getNodeByNodeId(string node_id)
        {
            try
            {
                Models.a_flowchart_node node =  nodeHelper.GetAll(u => u.node_id == node_id,u=>u.id).FirstOrDefault();
                if (node == null)
                {
                    return Json(new
                    {
                        access = false,
                        code = 0,
                        msg = "为找到node_id[" + node_id + "]对应的节点。",
                    },
                    JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new
                    {
                        access = true,
                        code = 0,
                        msg = "",
                        data = node
                    },
                   JsonRequestBehavior.AllowGet);

                }
               
            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }
        }


       
        // 通过节点node_id 获取节点数据;
        [HttpPost]
        public JsonResult saveNodeLabel(Models.a_flowchart_node newnode)
        {
            try
            {
                Models.a_flowchart_node node = nodeHelper.GetAll(u => u.node_id == newnode.node_id,u=>u.id).FirstOrDefault();
                if (node == null)
                {
                    nodeHelper.Insert(newnode);
                    nodeHelper.SaveChanges();
                    return Json(new
                    {
                        access = true,
                        code = 0,
                        msg = "已添加node_id[" + newnode.node_id + "]对应的节点。",
                    },
                    JsonRequestBehavior.AllowGet);
                }
                else
                {
                   
                    //更新描述
                    node.label = newnode.label;

                    nodeHelper.Update(node);
                    nodeHelper.SaveChanges();
                    return Json(new
                    {
                        access = true,
                        code = 0,
                        msg = "已修改node_id[" + newnode.node_id + "]对应的节点。",
                        data=node
                    },
                    JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }
        }


        //保存连接线;
        [ValidateInput(false)]
        [HttpPost]
        public JsonResult saveLine(Models.a_flowchart_line line)
        {
            try
            {
                //删除;
                lineHelper.Delete(line);

                //
                lineHelper.Insert(line);
                lineHelper.SaveChanges();

                return Json(new { access = true, data = line }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }
        }


        //保存节点
        [ValidateInput(false)]
        [HttpPost]
        public JsonResult saveNode(Models.a_flowchart_node node)
        {
            try
            {
                //删除;
                nodeHelper.Delete(node);
                //nodeHelper.SaveChanges();
                //插入;
                nodeHelper.Insert(node);
                nodeHelper.SaveChanges();

                return Json(new { access = true, data = node }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }
        }

        //保存审批节点-审批项定义
        [ValidateInput(false)]
        [HttpPost]
        public JsonResult saveNodeApproveItem(Models.a_flowchart_node_approveitem approve)
        {
            try
            {
              
                //插入;
                nodeApproveHelper.Insert(approve);
                nodeApproveHelper.SaveChanges();

                return Json(new { access = true, data = approve }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }
        }

        //保存分支节点-分支定义
        [ValidateInput(false)]
        [HttpPost]
        public JsonResult saveNodeSwitchItem(Models.a_flowchart_node_switchitem switchitem)
        {
            try
            {
               
                //插入;
                nodeSwitchHelper.Insert(switchitem);
                nodeSwitchHelper.SaveChanges();

                return Json(new { access = true, data = switchitem }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception exp)
            {
                return Json(new { access = false, msg = exp.Message });
            }
        }

    }
}
