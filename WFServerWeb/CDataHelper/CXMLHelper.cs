﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data;
namespace WFServerWeb
{
    public class CXMLHelper : IDataManager
    {
        public int ExecuteNonQuery(string cmdText)
        {
            return 0;
        }
        public DataTable GetDataTable(string cmdText)
        {
            return new DataTable();
        }
    }
}