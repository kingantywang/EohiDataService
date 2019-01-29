/**
 * Created by 郭广平 2018.05.16
 */

(function ($) {

    /**
     * 默认参数
     */
    var defaultOpts = {
        item: '',
        image: '',
        color: '#FFFFFF'
    };

    /**
     * 定义类
     */
    var VImage = function (options) {
        this.options = $.extend({}, defaultOpts, options);
        //记录item值;
        defaultOpts.item = this.options.item;

        div = undefined;

        this.init();
    }

    VImage.prototype = {
        init: function () {
            var self = this;
            //console.log('test');
            var pdiv = this.options.item;
            var dataPanel2 = $('<div class="data-item-image"></div>');
            var dataPanel2_img = $('<img src="#" />');
            dataPanel2.html(dataPanel2_img);
            var width = $(pdiv).width();
            var height = $(pdiv).height();
            dataPanel2_img.css({
                width: width,
                height: height,
                top: 0,
                left: 0,
                position: 'absolute',
                //background: "url('" + this.options.viewoption.image + "')  no-repeat",
                //"background-size": "100% 100%"

            });
            dataPanel2_img.attr("src", this.options.viewoption.image);
            self.appendHandler(dataPanel2, pdiv);

            self.div = dataPanel2_img;

            // 指定图表的配置项和数据
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
        bind: function (object, func) {
            return function () {
                return func.apply(object, arguments);
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
            $(pdiv).find('img').css({
                width: width,
                height: height
            });

            //self.resizeDiv.css({
            //    display: 'none'
            //});

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
            else {
                dataview.attr("src", this.options.viewoption.image);
            }
        },
        /*
       * 设置显示选项;
       */
        setViewoption: function (viewoption) {
            debugger;
            //this.options = $.extend({}, defaultOpts, option);
            var self = this;
            self.options.viewoption = $.extend({}, self.options.viewoption, viewoption);

            //更改div
            var dataview = self.div;


            // 指定图表的配置项和数据
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
                dataview.attr("src", this.options.viewoption.image);
            }

        },
        setData_jsondata: function () {
            var self = this;
            var viewdata = self.options.viewdata;
            if (viewdata.datafor == "image") {
                //x y s
                var datamapping = viewdata.datamapping;
                //从
                var data = viewdata.datajson;
                var imgurl = data[0][datamapping.value];

                self.div.css({
                    width: self.width,
                    height: self.height,
                    top: 0,
                    left: 0,
                    position: 'absolute',
                    //background: "url('" + imgurl + "')  no-repeat",
                    //"background-size": "100% 100%"
                }).attr("src", imgurl);

            }

        }
        ,
        setData_apidata: function () {
            var self = this;

            var viewdata = self.options.viewdata;
            if (viewdata.datafor == "image") {

                //从api获取数据
                $.ajax({
                    url: viewdata.dataapi.url,
                    type: "post",
                    async: true,
                    data: {
                    },
                    success: function (data) {

                        //x y s
                        var datamapping = viewdata.datamapping;

                        var imgurl = data[0][datamapping.value]

                        self.div.css({
                            width: self.width,
                            height: self.height,
                            top: 0,
                            left: 0,
                            position: 'absolute',
                        }).attr("src", imgurl);

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
    }
    window.VImage = VImage;

})(jQuery);