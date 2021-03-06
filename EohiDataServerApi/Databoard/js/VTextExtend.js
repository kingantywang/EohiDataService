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
        fontsize:"32px"
    };

    /**
     * 定义类
     */
    var VTextExtend = function (options) {
        this.options = $.extend({}, defaultOpts, options || {});

        //记录item值;
        defaultOpts.item = this.options.item;

        div = undefined;

        newGuidExtend = undefined;

        this.init();
    }


    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    function NewGuidExtend() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    VTextExtend.prototype = {
        init: function () {
            var self = this;
            //console.log('test');
            self.newGuidExtend = NewGuidExtend();
            var pdiv = this.options.item;
            var dataPanel2 = $('<div id="' + self.newGuidExtend+'" class="data-item-textextend"></div>');
            var width = $(pdiv).width();
            var height = $(pdiv).height();
            dataPanel2.css({
                width: width,
                height: height,
                top: 0,
                left: 0
            });
            self.appendHandler(dataPanel2, pdiv);
            //
            dataPanel2.css(self.options.viewoption);
            
            self.div = dataPanel2;

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
            else
                dataPanel2.html(this.options.viewoption.html)
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
        ,
        /*
        * 更改大小
        */
        resize: function () {
           
            var self = this;
            //console.log('test');
            var pdiv = this.options.item;

            //self.resizeDiv = undefined;//拖拽面板
            //更改数据面板大小

            var width = $(pdiv).width();
            var height = $(pdiv).height();

            //更改div
            $(pdiv).children('div.data-item-textextend').css({
                width: width,
                height: height
            }).css(self.options.viewoption);

            //self.resizeDiv.css({
            //    display: 'none'
            //});

        },
        /*
       * 设置数据选项
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
            else
                self.div.html(this.options.viewoption.html)
        }
        ,
        /*
        * 设置显示选项;
        */
        setViewoption: function (viewoption) {
            //this.options = $.extend({}, defaultOpts, option);
            var self = this;
            self.options.viewoption = $.extend({}, self.options.viewoption, viewoption);

            var self = this;
            //console.log('test');
            var pdiv = this.options.item;
            //更改div
            var dataview =  $(pdiv).children('div.data-item-textextend');

            //更改文本内容
            //dataview.html(this.options.html);
            dataview.css(self.options.viewoption);
            
        }
        ,
        setData_jsondata: function () {
            debugger;
            var self = this;
            var viewdata = self.options.viewdata;

            var valmapp = viewdata.datamapping.value;
            //从
            var data = viewdata.datajson;
            //更改文本内容
            $('#' + self.newGuidExtend).html(data[valmapp]);
            var option = $.extend(self.options.viewoption, data);
            $('#' + self.newGuidExtend).css(option);


          //  var dx = [];

            //for (var b = 0; b < data.length; b++) {
            //    var di = data[b];
            //    dx.push(di[datamapping.value]);
            //}
            //self.div.html(dx[0]);

        }
         ,
        bind : function(object, func) {  
            return function() {  
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
                    //更改文本内容
                    $('#' + self.newGuidExtend).html(data.value);
                    var option = $.extend(self.options.viewoption, data);
                    $('#' + self.newGuidExtend).css(option);
                   

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
    }
    window.VTextExtend = VTextExtend;

})(jQuery);