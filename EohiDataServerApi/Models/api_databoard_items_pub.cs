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
    
    public partial class api_databoard_items_pub
    {
        public int id { get; set; }
        public string pubno { get; set; }
        public string itemno { get; set; }
        public Nullable<int> itemindex { get; set; }
        public Nullable<int> itemx { get; set; }
        public Nullable<int> itemy { get; set; }
        public Nullable<int> itemw { get; set; }
        public Nullable<int> itemh { get; set; }
        public string itemtype { get; set; }
        public string itemversion { get; set; }
        public string itemoption { get; set; }
        public string itemdata { get; set; }
        public string Intervalloading { get; set; }
        public Nullable<int> intervalsecond { get; set; }
        public string cre_man { get; set; }
        public Nullable<System.DateTime> mod_date { get; set; }
        public string mod_man { get; set; }
    }
}
