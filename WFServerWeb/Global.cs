﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Collections;
using System.Net;
using System.Net.Sockets;
public static class Global
{
    public static string UserID = "user_id";

    public static DataType DataTypeUse = DataType.SQLSERVER;
    public static string BaseDir;
    public static string SqlConnStr = "server=115.28.5.204,13533;uid=sa;pwd=abbABB123!@#;database=kailifon";
    public static string IP;
    public static string server;
    public static string userid;
    public static string password;
    public static string database;
    public static string dbport;
    public static Queue StartWFCmdArr = new Queue();
    public static Queue WFTransmitCmdArr = new Queue();

    public static string GetLocalIP()
    {
        try
        {
            string HostName = Dns.GetHostName(); //得到主机名
            IPHostEntry IpEntry = Dns.GetHostEntry(HostName);
            for (int i = 0; i < IpEntry.AddressList.Length; i++)
            {
                if (IpEntry.AddressList[i].AddressFamily == AddressFamily.InterNetwork)
                {
                    return IpEntry.AddressList[i].ToString();
                }
            }
            return "";
        }
        catch (Exception ex)
        {
            return "";
        }
    }
}

public static class CNodeType
{
    public static string StartType = "start";
    public static string ApproveType = "approve";
    public static string SwitchType = "switch";
    public static string ProcessType = "process";
    public static string EndType = "end";
}

public enum DataType
{
    SQLSERVER,
    ORACLE,
    MYSQL,
    TXT,
    XML
}

public enum InstanceStatus
{
    Active,
    Complete,
    Error
}

public enum ApprovalStatus
{
    Active,
    Complete
}

public enum NodeStatus
{
    Active,
    Complete
}
public struct struCmdStartWF
{
    public struCmdStartWF(string wfname,string funcid,string wfdataid,string opemanid)
    {
        WFName = wfname;
        FuncID = funcid;
        WFDataID = wfdataid;
        OpeManID = opemanid;
    }
    public string WFName;
    public string FuncID;
    public string WFDataID;
    public string OpeManID;
}


public struct struCmdWFTransmit
{
    public struCmdWFTransmit(string instanceid, string nodeid, string approvalopinion, string opemanid)
    {
        InstanceID = instanceid;
        NodeID = nodeid;
        ApprovalOpinion = approvalopinion;
        OpeManID = opemanid;
    }
    public string InstanceID;
    public string NodeID;
    public string ApprovalOpinion;
    public string OpeManID;
}