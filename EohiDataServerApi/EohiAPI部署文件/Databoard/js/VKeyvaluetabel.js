﻿/**
 * Created by 郭广平 2018.05.16
 */

(function ($) {

    /**
     * 默认参数
     */
    var defaultOpts = {
        item: '',
        html: '显示文本',
        color: '#FFFFFF',
        fontsize: "32px",
        borderStyle: "solid",           //边线样式 none 没有，solid 线条
        borderWidth: "1px",
        borderColor: "#fff",        //边线颜色
        backgroundColor: "none",   //div背景色
        backgroundtabelColor: "none",  //表格背景色
        textalign: "right",//右对齐 left 左,center 中
        padding_right_left: "0px",         //左右间距 内容和边框的间距
        padding_top_buttom: "0px",    //上下间距 内容和边框的间距
    };

    /**
     * 定义类
     */
    var VKeyvaluetabel = function (options) {
        this.options = $.extend({}, defaultOpts, options);

        //记录item值;
        defaultOpts.item = this.options.item;

        div = undefined;

        this.stopscrollA1 = false;
        this.marqueesHeightA1 = 285;
        //var scrollElemA1 = document.getElementById('A1');
        this.scrollElemA1 = undefined;
        this.preTopA1 = 0;
        this.currentTopA1 = 0;
        this.stoptimeA1 = 0;
        //var leftElemA2 = document.getElementById('A2');
        this.leftElemA2 = undefined;

        this.init();
    }

    VKeyvaluetabel.prototype = {
        init: function () {
            var self = this;

            //console.log('test');
            var pdiv = this.options.item;
            var id = this.options.itemno;
            var dataPanel2 = $('<div class="data-item-table"  id="data-item-table-' + this.options.itemno + '"></div>');
            var width = $(pdiv).width();
            var height = $(pdiv).height();
            dataPanel2.css({
                width: width,
                height: height,
                //top: 0,
                //left: 0,
                //position: 'absolute',
                "background-color": this.options.viewoption.backgroundColor,
                "font-size": this.options.viewoption.fontsize,
            });
            self.appendHandler(dataPanel2, pdiv);
            self.div = dataPanel2;

            //创建表头;
            self.createVTable();
           

            //记载数据
            var viewdata = self.options.viewdata;
            if (viewdata != undefined) {
                //设置数据;
                if (viewdata.datatype == "json") {
                    self.setData_jsondata();
                }
                if (viewdata.datatype == "api") {
                    //检查定时器
                    self.setData_apidata();
                }
            }
           
        }
        ,
        createVTable: function () {
            var self = this;
            var pdiv = this.options.item;
            var tablewidth = $(pdiv).width();
            var itemno = self.options.itemno;
            $('#data-item-table-' + this.options.itemno).html("");
            //加载数据
            var viewoption = self.options.viewoption;
            var html = "";
            //创建表头;
            html += ' <table id="table-' + itemno + '" class="vtable"  width="' + tablewidth + '" border="0" cellpadding="0">';
            html += '  <thead>';
            html += '  <tr class="titletd">';
            html += '   <th  width="' + viewoption.keycolumn.width + 'px" style = "color:' + viewoption.color + '; font-size:' + viewoption.fontsize + '">' + viewoption.keycolumn.caption + '</th>';
            html += '   <th  width="' + viewoption.valuecolumn.width + 'px"  style = "color:' + viewoption.color + '; font-size:' + viewoption.fontsize + '">' + viewoption.valuecolumn.caption + '</th>';
            html += '  </tr>';
            html += ' </thead>';
            html += ' <tbody id="table-tbody-' + itemno +'">';
            html += ' </tbody>';
            html += ' </table>';
            //alert(html);
            //将表格放入;
            $('#data-item-table-' + this.options.itemno).html(html);

        }
        ,
        /**
         * 插入容器
         */
        appendHandler: function (handlers, target) {
            for (var i = 0; i < handlers.length; i++) {
                el = handlers[i];
                $(target).append(el);
            }
        }


        /*
        * 更改大小
        */
        ,
        resize: function () {

            var self = this;
            //console.log('test');
            var pdiv = this.options.item;

            //self.resizeDiv = undefined;//拖拽面板
            //更改数据面板大小

            var width = $(pdiv).width();
            var height = $(pdiv).height();



        },

        /*
       * 设置数据
       */
        setViewdata: function (viewdata) {

            var self = this;
            self.options.viewdata = $.extend({}, self.options.viewdata, viewdata);
            //加载数据
            var viewdata = self.options.viewdata;
            if (viewdata != undefined) {
                //设置数据;
                if (viewdata.datatype == "json") {
                    self.setData_jsondata();
                }
                if (viewdata.datatype == "api") {
                    //检查定时器
                    self.setData_apidata();
                }
            }
            else {

            }
        }
        ,
        /*
       * 设置显示选项
       */
        setViewoption: function (option) {
            this.options = $.extend({}, defaultOpts, option);

            var self = this;
            //console.log('test');
            var pdiv = this.options.item;
            //更改div
            var dataview = $(pdiv).children('div.data-item-percent-pie');

            //更改文本内容
            //dataview.html(this.options.html);
            dataview.css({
                color: this.options.color,
                "font-size": this.options.fontsize,
            });




            //加载数据
            var viewdata = self.options.viewdata;
            if (viewdata != undefined) {

                //设置数据;
                if (viewdata.datatype == "json") {
                    self.setData_jsondata();
                }
                if (viewdata.datatype == "api") {
                    //检查定时器
                    self.setData_apidata();
                }
            }
            //else
            //    dataview.html(this.options.viewoption.html)

        }
        ,
        setData_jsondata: function () {
            var self = this;
            var viewdata = self.options.viewdata;
            //x y s
            var datamapping = viewdata.datamapping;
            //从
            var data = viewdata.datajson;
            //组装 tbody;
            self.createVTBody(data);

        }
        ,
        bind: function (object, func) {
            return function () {
                return func.apply(object, arguments);
            }
        }
        ,
        setData_apidata: function () {
            var self = this;

            var viewdata = self.options.viewdata;
            var url = viewdata.dataapi.url;
            //从api获取数据
            $.ajax({
                url: url,
                type: "post",
                async: true,
                data: {
                },
                success: function (data) {

                    //组装 tbody;
                    self.createVTBody(data);


                    //自动请求状态; intervalloading 
                    //自动请求间隔秒数;  intervalsecond
                    if (viewdata.dataapi.intervalloading && viewdata.dataapi.intervalsecond != undefined) {

                        var times = viewdata.dataapi.intervalsecond * 1000;

                        setTimeout(self.bind(self, self.setData_apidata), times);
                    }
                },
                error: function (e) {
                    //自动请求状态; intervalloading 
                    //自动请求间隔秒数;  intervalsecond
                    if (viewdata.dataapi.intervalloading && viewdata.dataapi.intervalsecond != undefined) {

                        var times = viewdata.dataapi.intervalsecond * 1000;

                        setTimeout(self.bind(self, self.setData_apidata), times);
                    }
                }
            });
        }
        ,
        createVTBody: function (data) {
            var self = this;
            var itemno = self.options.itemno;
            //加载数据
            var viewoption = self.options.viewoption;
            if (viewoption == undefined) return;
         
            $('#table-tobody-' + this.options.itemno).html("");
            var rows = self.options.viewdata.datajson;
            var html = "";
            //html += ' <table  id="table-' + itemno + '"  class="VKeyvaluetabel">';
            //html += '  <tr >';

            //data 
            for (b = 0; b < data.length; b++) {
                var vobj = data[b];
               // var object = { "name": "zhangsan", "sex": "男", "age": "29" };
                for (var obj in vobj) {
                   
                    html += "<tr>"

                    var name = obj;
                    var value = vobj[name];

                    html += '  <td  nowrap';
                    html += ' style = "color:' + self.options.viewoption.color + '; ';
                    html += ' padding: ' + self.options.viewoption.padding_top_buttom + ' ' + self.options.viewoption.padding_right_left + '; ';
                    html += ' border-width:' + self.options.viewoption.borderWidth + ';   ';
                    html += ' border-color:' + self.options.viewoption.borderColor + ';   ';
                    html += ' border-style:' + self.options.viewoption.borderStyle + ';   ';
                    html += ' text-align:' + self.options.viewoption.textalign + ';   ';
                    html += ' width:' + self.options.viewoption.keycolumn.width + 'px;   ';
                    html += '" > ' + name + '</td > ';

                    html += '  <td  nowrap';
                    html += ' style = "color:' + self.options.viewoption.color + '; ';
                    html += ' padding: ' + self.options.viewoption.padding_top_buttom + ' ' + self.options.viewoption.padding_right_left + '; ';
                    html += ' border-width:' + self.options.viewoption.borderWidth + ';   ';
                    html += ' border-color:' + self.options.viewoption.borderColor + ';   ';
                    html += ' border-style:' + self.options.viewoption.borderStyle + ';   ';
                    html += ' text-align:' + self.options.viewoption.textalign + ';   ';
                    html += ' width:' + self.options.viewoption.valuecolumn.width + 'px;   ';
                    html += '" > ' + value + '</td > ';

                    html += "</tr>"
                }
            }

            //将表格放入;
            $('#table-tbody-' + this.options.itemno).html(html);

        }

    }
    window.VKeyvaluetabel = VKeyvaluetabel;

})(jQuery);