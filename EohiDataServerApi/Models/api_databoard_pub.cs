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
    
    public partial class api_databoard_pub
    {
        public int id { get; set; }
        public string pubno { get; set; }
        public string perviewimage { get; set; }
        public string boardnote { get; set; }
        public Nullable<int> gridsize { get; set; }
        public Nullable<System.DateTime> cre_date { get; set; }
        public string cre_man { get; set; }
        public Nullable<System.DateTime> mod_date { get; set; }
        public string mod_man { get; set; }
        public string mainoption { get; set; }
    }
}
