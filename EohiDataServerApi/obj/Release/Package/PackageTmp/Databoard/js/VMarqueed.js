﻿(function ($) {

    /**
     * 默认参数 走马灯
     */
    var defaultOpts = {
        item: '',
        color: '#FFFFFF',
        fontsize: "32px",
    };




    /**
     * 定义类
     */
    var VMarqueed = function (options) {

        //var itemno = self.options.itemno;
        this.options = $.extend({}, defaultOpts, options);

        this.marqueeidf = "";
        this.marqueespan = "";

        defaultOpts.item = this.options.item;

        div = undefined;

        this.init();
    }

    VMarqueed.prototype = {
        init: function () {
            debugger;
            var self = this;
            //console.log('test');
            var pdiv = this.options.item;
            self.marqueeidf = this.NewGuid();
            self.marqueespan = this.NewGuid();
            var dataPanel2 = $('<marquee id="' + self.marqueeidf + '" class="data-item-text"><span id="' + self.marqueespan + '" ></span></marquee>');

            self.appendHandler(dataPanel2, pdiv);
            self.div = dataPanel2;
            var width = $(pdiv).width();
            var height = $(pdiv).height();
            $('#' + self.marqueeidf).css({
                width: width,
                height: height,
            });
            $('#' + self.marqueeidf).attr(self.options.viewoption.marquee);
            $('#' + self.marqueespan).css(self.options.viewoption.span);

            //指定span的text
            $("#" + self.marqueespan).html(self.options.viewoption.span.html)

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
                dataPanel2.html(self.options.viewoption.marquee.html)
        }
        ,





        S4: function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        },
        NewGuid: function () {
            return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
        },

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
            $(pdiv).children('div.data-item-text').css({
                width: width,
                height: height,
            });

            $('#' + self.marqueeidf).css({
                width: width,
                height: height,
            });

            $('#' + self.marqueespan).css({
                width: width,
                height: height,
            });


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
                    debugger;
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
            var dataview = $(pdiv).children('div.data-item-text');

            //更改文本内容
            dataview.html(self.options.viewoption.span.html);

            var width = $(pdiv).width();
            var height = $(pdiv).height();
            //更改div
            dataview.css({
                width: width,
                height: height,
            });

            $('#' + self.marqueeidf).css({
                width: width,
                height: height,
            });

            $('#' + self.marqueespan).css({
                width: width,
                height: height,
            });



            $('#' + self.marqueeidf).attr(self.options.viewoption.marquee);
            $('#' + self.marqueespan).css(self.options.viewoption.span);

           
           // dataview.css(self.options.viewoption);
        }

        ,
        setData_jsondata: function () {
            var self = this;
            var viewdata = self.options.viewdata;
            $("#" + this.marqueespan).html(viewdata.datajson[0].value)
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
                    $("#" + self.marqueespan).html(data[0].value)
                    // self.onclick = data.value;
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
    window.VMarqueed = VMarqueed;

})(jQuery);