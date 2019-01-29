﻿(function ($) {
    /**
     * 轮播列表柱状图
     * 20190110
     * */
    var defaultOpts = {
        item: ''
    };
    var VCastListHistogram = new function (options) {
        this.options = $.extend({}, defaultOpts, options);
        defaultOpts.item = this.options.item;
        div = undefined;
        this.init();
    };
    VCastListHistogram.prototype = {
        init: function () {
            var pdiv = this.options.item;
            var itemno = this.options.itemno;
            var dataPanel2 = $('<div class="data-item-wallantern" id="number-' + itemno + '"></div>');
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
            }
        },
        setData_jsondata: function () {
            var self = this;
            var viewdata = self.options.viewdata;
            var datamapping = viewdata.datamapping;
            var data = viewdata.datajson;




        }



    }
    window.VCastListHistogram = VCastListHistogram;

}(jQuery))
