﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data;
namespace WFServerWeb
{
    public static class CPutDownReceiver
    {
        public static void PutDownReceiver(string InstanceID,string NodeID)
        {
            string nodetype = CCommonFunc.GetNodeType(NodeID);
            //判断是否开始流程
            if (nodetype == CNodeType.StartType)
            {
                string StartManID = CCommonFunc.GetStartMan(InstanceID);
                CDataHelper.ExecuteNonQuery("insert into [a_flowchart_instance_node_receiver]([instance_id],[node_id],[user_id],[approval_status],node_status) values('" + InstanceID + "','" + NodeID + "','" + StartManID + "','" + ApprovalStatus.Active.ToString() + "','"+NodeStatus.Active.ToString()+"')");
            }
            //判断流程是否结束
            else if (nodetype != CNodeType.EndType)
            {
                DataTable dtReceiver = CCommonFunc.GetReceiver(InstanceID, NodeID);
                if (dtReceiver != null)
                {
                    if (dtReceiver.Rows.Count > 0)
                    {
                        for (int i = 0; i < dtReceiver.Rows.Count; i++)
                        {
                            string ReceiverID = dtReceiver.Rows[i][Global.UserID].ToString();
                            CDataHelper.ExecuteNonQuery("insert into [a_flowchart_instance_node_receiver]([instance_id],[node_id],[user_id],[approval_status],node_status) values('" + InstanceID + "','" + NodeID + "','" + ReceiverID + "','"+ApprovalStatus.Active.ToString()+"','"+NodeStatus.Active.ToString()+"')");
                        }
                    }
                }
            }
        }
    }
}
