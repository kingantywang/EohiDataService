//------------------------------------------------------------------------------
// <auto-generated>
//    此代码是根据模板生成的。
//
//    手动更改此文件可能会导致应用程序中发生异常行为。
//    如果重新生成代码，则将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace EohiDataServerApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class a_flowchart_node
    {
        public int id { get; set; }
        public string flowchart_id { get; set; }
        public string node_id { get; set; }
        public string nodetype { get; set; }
        public string remark { get; set; }
        public string sourcepoints { get; set; }
        public string targetpoints { get; set; }
        public string label { get; set; }
        public string style { get; set; }
        public Nullable<int> x { get; set; }
        public Nullable<int> y { get; set; }
        public string operatorscript { get; set; }
        public string switchscript { get; set; }
        public string flowscript { get; set; }
        public string processscript { get; set; }
        public string approvalnotescript { get; set; }
    }
}
