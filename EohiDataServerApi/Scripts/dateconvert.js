function dateRender(strTime, fmt) {

    if (strTime == undefined || strTime == "")
        return "";

    var obj = new Date(parseInt(strTime.replace("/Date(", "").replace(")/", ""), 10));
    if (obj == null || obj == undefined)
    { return ""; }

    if (fmt == undefined || fmt == null || fmt == "")
        fmt = "yyyy-MM-dd";

    //obj.getFullYear() + "-" + obj.getMonth() + "-" + obj.getDate();

    return obj.Format(fmt)
    //格式化输出;
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}