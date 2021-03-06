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
        //color: '#FFFFFF',
       // fontsize: "32px" ,
        //backgroundColor: "#DD0054",  //背景色div
        //fontbackColor: "#15A05C"      //数字背景色
        backdivcss: '',
        rollnumbackcss: '',
        rollnumcss: '',
        allheight:''

    };

    /**
     * 定义类
     */
    var VTextNumber = function (options) {
        debugger;
        this.options = $.extend({}, defaultOpts, options);

        //记录item值;
        defaultOpts.item = this.options.item;

        div = undefined;
        
        this.init();
    }

    VTextNumber.prototype = {
        init: function () {
            var self = this;
            //console.log('test');
            var pdiv = this.options.item;
            var itemno = this.options.itemno;
            var dataPanel2 = $('<div class="data-item-text-number" id="number-' + itemno + '"></div>');
            var width = $(pdiv).width();
            var height = $(pdiv).height();
            dataPanel2.css({
                width: width,
                height: height,
            });
            self.appendHandler(dataPanel2, pdiv);
            //
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
            else {
                $("#number-" + itemno).rollNumDaq({
                    itemno:itemno,
                    deVal: 10000,
                    rollnumbackcss: self.options.viewoption.rollnumbackcss,
                    rollnumcss: self.options.viewoption.rollnumcss,
                    allheight: self.options.viewoption.allheight
                });
            } 
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
            $(pdiv).children('div.data-item-text-number' ).css({
                width: width,
                height: height
            });


         

            //self.resizeDiv.css({
            //    display: 'none'
            //});

        },
        show_num: function (n) {
            var self = this;
            var itemno = this.options.itemno;
            /*$("#number-" + itemno ).numberRock({
            //$(".data-item-text-number").numberRock({
                lastNumber: n,
                duration: 2000,
                easing: 'swing',  //慢快慢
            });
            */

            //取整数;
            n = Math.round(n);

            $("#number-" + itemno).rollNumDaq({
                itemno: itemno,
                deVal: n,
                rollnumbackcss: self.options.viewoption.rollnumbackcss,
                rollnumcss: self.options.viewoption.rollnumcss,
                allheight: self.options.viewoption.allheight
            });
            $("#number-" + itemno).css(self.options.viewoption.backdivcss)
        },
        bind: function (object, func) {
            return function () {
                return func.apply(object, arguments);
            }
        }
        ,
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
            var dataview = $(pdiv).children('div.data-item-text-number');

            //更改文本内容
            //dataview.html(this.options.html);
            dataview.css(self.options.viewoption.backdivcss);



        }
        ,
        setData_jsondata: function () {
            var self = this;
            var viewdata = self.options.viewdata;

            //x y s
            var datamapping = viewdata.datamapping;
            //从
            var data = viewdata.datajson;
            var dx = [];

            for (var b = 0; b < data.length; b++) {
                var di = data[b];
                dx.push(di[datamapping.value]);
            }
            //self.div.html(dx[0]);
            self.show_num(parseInt(dx[0]))


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

                    //x y s
                    var datamapping = viewdata.datamapping;
                    //data=d;
                    var dx = [];
                    for (var b = 0; b < data.length; b++) {
                        var di = data[b];
                        dx.push(di[datamapping.value]);
                    }

                    //self.div.html(dx[0]);
                    self.show_num(parseInt(dx[0]))

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
    window.VTextNumber = VTextNumber;

})(jQuery);