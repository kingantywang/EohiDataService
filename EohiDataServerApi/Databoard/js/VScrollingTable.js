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
        fontsize: "32px"

    };

    /**
     * 定义类
     */
    var VScrollingTable = function (options) {
        this.options = $.extend({}, defaultOpts, options);

        //记录item值;
        defaultOpts.item = this.options.item;

        div = undefined;
        MyMarhq = undefined;

        tabeldivid = undefined;
        tabelid = undefined;
        showdatatabelid = undefined;

        this.init();
    }

    VScrollingTable.prototype = {
        init: function () {
            var self = this;

            //console.log('test');
            var pdiv = this.options.item;
            var id = this.options.itemno;
            self.tabeldivid = this.NewGuid();
            self.tabelid = this.NewGuid();
            var dataPanel2 = $('<div id="' + self.tabeldivid + '" class="tablebox" ><table id = "' + self.tabelid + '" ></table></div>');
            var width = $(pdiv).width();
            var height = $(pdiv).height();

            self.appendHandler(dataPanel2, pdiv);
            self.div = dataPanel2;

            dataPanel2.css({
                width: width,
                height: height,
            });


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
            $('#' + self.tabeldivid).css(self.options.viewoption.backdivcss);
            $('#' + self.tabelid).css(self.options.viewoption.tablecss);
            $('#' + self.tabelid).find("thead").css(self.options.viewoption.tabletheadcss);
            $('#' + self.tabelid).find("tbody").css(self.options.viewoption.tabletbodycss);
            $('#' + self.tabelid).find("thead tr th").css(self.options.viewoption.tabletheadcss);
            $('#' + self.tabeldivid).css({
                width: width,
                height: height,

            });
            $('#' + self.tabelid).css({
                width: width,
                height: height,
            });
            //初始化表格;        //// 参数1 tableID,参数2 div高度，参数3 速度，参数4 tbody中tr几条以上滚动
            self.createVScrollingTable(self.tabelid, self.options.viewoption.scrollingattr.scrollingspeed);




        }
        ,
        //初始化表格;
        //// 参数1 tableID,参数2 div高度，参数3 速度，参数4 tbody中tr几条以上滚动
        createVScrollingTable: function (tableid, speed) {
            self = this;
            var $tablem = $("#" + tableid);
            if (speed > 0) {
                var scrollTimer;
                $tablem.hover(function () {
                    clearInterval(scrollTimer);
                }, function () {
                    scrollTimer = setInterval(function () {
                        scrollNews($tablem);
                    }, speed);
                }).trigger("mouseleave");

                function scrollNews(obj) {
                    var $selftable = obj.find("tbody");
                    var lineHeight = $selftable.find("tr:first").height();
                    $selftable.animate({
                        "marginTop": -lineHeight + "px"
                    }, 600, function () {
                        $selftable.css({
                            marginTop: 0
                        }).find("tr:first").appendTo($selftable);
                    })
                }

            } else {
                return $tablem;
            }
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
                height: height
            });


            $('#' + self.tabeldivid).css({
                width: width,
                height: height
            });
            $('#' + self.tabelid).css({
                width: width,
                height: height
            });
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
            var dataview = $(pdiv).children('div.data-item-text-number');

            var width = $(pdiv).width();
            var height = $(pdiv).height();
            dataview.css({
                width: width,
                height: height
            })
            //更改文本内容
            //dataview.html(this.options.html);
            $('#' + self.tabeldivid).css({
                width: width,
                height: height
            });
            $('#' + self.tabelid).css({
                width: width,
                height: height
            });
            $('#' + self.tabeldivid).css(self.options.viewoption.backdivcss);
            $('#' + self.tabelid).css(self.options.viewoption.tablecss);
            $('#' + self.tabelid).find("thead").css(self.options.viewoption.tabletheadcss);
            $('#' + self.tabelid).find("tbody").css(self.options.viewoption.tabletbodycss);
            $('#' + self.tabelid).find("thead tr th").css(self.options.viewoption.tabletheadcss);

            //初始化表格;        //// 参数1 tableID,参数2 div高度，参数3 速度，参数4 tbody中tr几条以上滚动
            self.createVScrollingTable(self.tabelid, self.options.viewoption.scrollingattr.scrollingspeed);


        }

        ,

        initTabelData: function (tabelidd, thead, tbody) {
            $('#' + tabelidd).html("");
            if (thead != undefined && thead.length > 0) {
                var theadStr = '<thead><tr>';
                for (var i = 0; i < thead.length; i++) {
                    theadStr += '<th style="width:' + thead[i].width + '">' + thead[i].caption + '</th>';
                }
                theadStr += '</tr></thead>';
                if (tbody != undefined && tbody.length > 0) {
                    theadStr += '<tbody>';
                    for (var k = 0; k < tbody.length; k++) {
                        theadStr += '<tr>';
                        for (var m = 0; m < thead.length; m++) {
                            theadStr += '<td>' + tbody[k][thead[m].field] + '</td>'
                        }
                        theadStr += '</tr>';
                    }
                    theadStr += '</tbody>';
                }
                $('#' + tabelidd).html(theadStr);
            }
        },

        setData_jsondata: function () {
            var self = this;
            var tbodydata = self.options.viewdata.datajson;
            var theaddata = self.options.viewoption.tablethead;
            self.initTabelData(self.tabelid, theaddata, tbodydata);
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
            debugger;
            var viewdata = self.options.viewdata;
            var url = viewdata.dataapi.url;
            var theaddata = self.options.viewoption.tablethead;

            //从api获取数据
            $.ajax({
                url: url,
                type: "post",
                async: true,
                data: {
                },
                success: function (data) {

                    self.initTabelData(self.tabelid, theaddata, data);

                    $('#' + self.tabeldivid).css(self.options.viewoption.backdivcss);
                    $('#' + self.tabelid).css(self.options.viewoption.tablecss);
                    $('#' + self.tabelid).find("thead").css(self.options.viewoption.tabletheadcss);
                    $('#' + self.tabelid).find("tbody").css(self.options.viewoption.tabletbodycss);
                    $('#' + self.tabelid).find("thead tr th").css(self.options.viewoption.tabletheadcss);
                    // self.onclick = data.value;
                    //自动请求状态; intervalloading 
                    //自动请求间隔秒数;  intervalsecond
                    if (viewdata.dataapi.intervalloading && viewdata.dataapi.intervalsecond != undefined) {

                        var times = viewdata.dataapi.intervalsecond * 1000;

                        setTimeout(self.bind(self, self.setData_apidata), times);
                    }
                },
                error: function (e) {
                    // self.onclick = data.value;
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

        S4: function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        },
        NewGuid: function () {
            return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
        },

    }
    window.VScrollingTable = VScrollingTable;

})(jQuery);