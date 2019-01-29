/**
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
    var VPercentPie = function (options) {
        this.options = $.extend({}, defaultOpts, options);

        //记录item值;
        defaultOpts.item = this.options.item;

        div = undefined;

        this.chart;

        this.piedefopt;
        
        this.init();
    }

    VPercentPie.prototype = {
        init: function () {
            var self = this;
            //console.log('test');
            var pdiv = this.options.item;
            var id = this.options.itemno;
            var dataPanel2 = $('<div class="data-item-percent-pie"  id="data-item-percent-pie-' + this.options.itemno + '"></div>');
            var width = $(pdiv).width();
            var height = $(pdiv).height();
            dataPanel2.css({
                width: width,
                height: height,
                top: 0,
                left: 0,
                position: 'absolute',
                //color: this.options.viewoption.color,
                //"font-size": this.options.viewoption.fontsize,
            });
            self.appendHandler(dataPanel2, pdiv);
            self.div = dataPanel2;
            

            var myChart = echarts.init(dataPanel2[0], "chalk");
            // var myChart = echarts.init(dataPanel[0]);
            self.chart = myChart;



           
            self.piedefopt = {
                title: {
                    text: '0%',
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#0580f2',
                        fontSize: '22'
                    }
                },
                color: ['rgba(176, 212, 251, 1)'],
                series: [{
                    name: 'Line 1',
                    type: 'pie',
                    clockWise: true,
                    radius: ['50%', '66%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    hoverAnimation: false,
                    data: [{
                        value: 0,
                        name: '01',
                        itemStyle: {
                            normal: {
                                color: { // 完成的圆环的颜色
                                    colorStops: [{
                                        offset: 0,
                                        color: '#00cefc' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#367fff' // 100% 处的颜色
                                    }]
                                },
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        }
                    }, {
                        name: '02',
                        value: 100
                    }]
                }]
            }


            if( self.options.viewoption.fontcolor!=undefined)
            {
                self.piedefopt.title.textStyle.color=self.options.viewoption.fontcolor;
            }
            if( self.options.viewoption.fontsize!=undefined)
            {
                var fontsize = self.options.viewoption.fontsize;
                fontsize=fontsize.replace("px", "");
                self.piedefopt.title.textStyle.fontSize = fontsize;
            }

            if( self.options.viewoption.colorstart!=undefined)
            {
                self.piedefopt.series[0].data[0].itemStyle.normal.color.colorStops[0].color=self.options.viewoption.colorstart;
            }

            if( self.options.viewoption.colorstop!=undefined)
            {
                self.piedefopt.series[0].data[0].itemStyle.normal.color.colorStops[1].color=self.options.viewoption.colorstop;
            }


            myChart.setOption(self.piedefopt);
            /*var size = width;
            if (size > height)
                size = height;
            // 指定图表的配置项和数据
           var option = self.options.viewoption;
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
               myChart.setOption(option);
            */


            /*
            //初始化进度环
            $("#data-item-percent-pie-"+this.options.itemno ).circleChart({
                size: size,
                value: 1,
                text: 0,
                onDraw: function (el, circle) {
                    circle.text(Math.round(circle.value) + "%");
                }
            });
            */
          
            /* */
            //self.loopFun($('#data-item-percent-pie')[0], 60, '#ccc', '#00A0E9', '#00A0E9', '20px', 20, 60, 1500, 'linear');

            //self.loopFun($('#data-item-percent-pie')[0], 40, '#ccc', '#00A0E9', '#00A0E9', '20px', 20, 60, 1500, 'linear');
          
           
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

            /**/
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
            $(pdiv).children('div.data-item-percent-pie').css({
                width: width,
                height: height
            });


            self.chart.resize();
            
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
        }
        ,
        /*
       * 设置显示选项
       */
        setViewoption: function (viewoption) {
            var self = this;
            self.options.viewoption = $.extend({}, self.options.viewoption, viewoption);

            //console.log('test');
            var pdiv = this.options.item;
            //更改div
            var dataview = $(pdiv).children('div.data-item-percent-pie');


            //
            if (self.options.viewoption.fontcolor != undefined) {
                self.piedefopt.title.textStyle.color = self.options.viewoption.fontcolor;
            }
            if (self.options.viewoption.fontsize != undefined) {
                var fontsize = self.options.viewoption.fontsize;
                fontsize = fontsize.replace("px", "");
                self.piedefopt.title.textStyle.fontSize = fontsize;
            }

            if (self.options.viewoption.colorstart != undefined) {
                self.piedefopt.series[0].data[0].itemStyle.normal.color.colorStops[0].color = self.options.viewoption.colorstart;
            }

            if (self.options.viewoption.colorstop != undefined) {
                self.piedefopt.series[0].data[0].itemStyle.normal.color.colorStops[1].color = self.options.viewoption.colorstop;
            }



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
           
            
        }
        ,
        setData_jsondata: function () {
            var self = this;
            var viewdata = self.options.viewdata;
            //x y s
            var datamapping = viewdata.datamapping;
            //从
            var data = viewdata.datajson;
            //处理数据
            self.DealData(data);
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
                   
                   
                    self.DealData(data);

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
        DealData: function (data) {
            var self = this;
            //x y s
            var datamapping = self.options.viewdata.datamapping;
       
            //data=d;
            var dx = [];
            for (var b = 0; b < data.length; b++) {
                var di = data[b];
                dx.push(di[datamapping.value]);
            }

            if (dx.length <= 0)
                dx.push(0);

            var p = dx[0];

            /*
            var pdiv = self.options.item;
            var width = $(pdiv).width();
            var height = $(pdiv).height();
            var size = width;
            if (size > height)
                size = height;

            $("#data-item-percent-pie-" + self.options.itemno).circleChart({
                size: size,
                value: p
            });

            */
           
            p = p * 1.0;
            p = p.toFixed(1);


            self.piedefopt.title.text = p + "%";

            if (p > 100)
                p = 100;

            var p2 = 100 - p;

           // var op = self.chart.option;


            

            

            self.piedefopt.series[0].data[0].value = p;
            self.piedefopt.series[0].data[1].value = p2;

            self.chart.setOption(self.piedefopt);
        }
    }
    window.VPercentPie = VPercentPie;

})(jQuery);