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
        fontsize: "20px"
    };

    /**
     * 定义类
     */
    var VMarquee = function (option) {
        this.options = $.extend({}, defaultOpts, option);
        //记录item值;
        defaultOpts.item = this.options.item;
        this.init();
    }

    VMarquee.prototype = {
        init: function () {
            var self = this;
            var pdiv = this.options.item;
            var dataPanel2 = $('<div class="data-item-marquee"></div>');
            var width = $(pdiv).width();
            var height = $(pdiv).height();
            dataPanel2.css({
                width: width,
                height: height,
                top: 0,
                left: 0,
                position: 'absolute',
                color: this.options.color,
                "font-size": this.options.fontsize,
                "line-height": this.options.fontsize
            });
            self.appendHandler(dataPanel2, pdiv);
            //
            dataPanel2.html(this.options.html)

            //初始化
            $(dataPanel2).liMarquee({ drag: false, hoverstop: false });
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
            $(pdiv).children('data-item-marquee').css({
                width: width,
                height: height
            });

            //self.resizeDiv.css({
            //    display: 'none'
            //});

        }
    }
    window.VMarquee = VMarquee;

})(jQuery);