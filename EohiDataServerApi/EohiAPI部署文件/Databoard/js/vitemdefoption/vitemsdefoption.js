﻿/*
* 
*  
*
*
*/


/*
* 可用显示类型
*/
var vitemstype = [
    {
        vtype: "chart.line",
        defoption: {
            top: 10,
            left: 10,
            width: 400,
            height: 400,
            viewtype: "chart",//使用viewtype创建对象;
            viewname: "基础折线图",
            viewoption: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                legend: {
                    data: ['类型1']
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        show: true,
                        interval: 0,
                        rotate: 40,
                        textStyle: {
                            color: "#fff",//x轴文字颜色
                            fontSize: 18, //x轴文字大小
                            fontFamily: "Microsoft YaHei" //x轴文字字体
                        }
                    },
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff', //y轴文字颜色
                            fontSize: 18,  //y轴文字大小
                            fontFamily: "Microsoft YaHei"  //y轴文字字体
                        }
                    }
                },
                series: [{
                    attrfiltervalue: "",
                    name: '类型1',
                    data: [],
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    },
                    //下阴影区域设置
                    areaStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(93,245,244,0.3)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(93,245,244,0.01)' // 100% 处的颜色
                            }],
                            globalCoord: false //缺省为 false
                        }
                    },
                    type: 'line',
                    smooth: true,
                    //区域
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                textStyle: {
                                    color: "rgba(221,219,33,1)",
                                    fontSize: 14,
                                    fontFamily: "Microsoft YaHei"
                                }
                            },
                            color: "#2ec7c9",
                            lineStyle: {
                                color: "rgba(93,245,244,1)"
                            }
                        }
                    }
                }]
            },
            viewdata: {
                datafor: "chart.line",
                datatype: "json",
                datamappingitem: ["x", "y", "s"],
                //dataoptin:{x:"xAxis.data",y:""}
                datamapping: { x: 'x', y: "y", s: '' },
                datamappingtxt: { x: "类目", y: '值', s: '系列,可选' },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "x": "上海",
                        "y": 23
                    },
                    {
                        "x": "深圳",
                        "y": 13
                    },
                    {
                        "x": "杭州",
                        "y": 14
                    },
                    {
                        "x": "北京",
                        "y": 24
                    }
                ]
            }
        }
    },



    /*
     *多拆线
     */
    {
        vtype: "chartlines",
        defoption: {
            top: 10,
            left: 10,
            width: 400,
            height: 400,
            viewtype: "chartlines",//使用viewtype创建对象;
            viewname: "基础折线图(多)",
            viewoption: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: [],
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 10,
                    textStyle: {
                        fontSize: 12,
                        color: '#F1F1F3'
                    }

                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        show: true,
                        interval: 0,
                        rotate: 40,
                        textStyle: {
                            color: "#fff",//x轴文字颜色
                            fontSize: 18, //x轴文字大小
                            fontFamily: "Microsoft YaHei" //x轴文字字体
                        }
                    },
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff', //y轴文字颜色
                            fontSize: 18,  //y轴文字大小
                            fontFamily: "Microsoft YaHei"  //y轴文字字体
                        }
                    }
                },
                series: []
            },
            viewdata: {
                datafor: "chartlines",
                datatype: "json",
                datamappingitem: ["x", "y", "s", "t"],
                //dataoptin:{x:"xAxis.data",y:""}
                datamapping: { x: 'x', y: "y", s: '', t: '' },
                datamappingtxt: { x: "类目", y: '值', s: '系列,可选', t: "chart类型" },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "x": "上海",
                        "y": 23,
                        "s": "系列1",
                        "t": "bar"
                    },
                    {
                        "x": "深圳",
                        "y": 13,
                        "s": "系列2",
                        "t": "bar"
                    },
                    {
                        "x": "杭州",
                        "y": 14,
                        "s": "系列1",
                        "t": "bar"
                    },
                    {
                        "x": "上海",
                        "y": 24,
                        "s": "系列2",
                        "t": "bar"
                    }
                    ,
                    {
                        "x": "深圳",
                        "y": 4,
                        "s": "系列1",
                        "t": "bar"
                    },
                    {
                        "x": "杭州",
                        "y": 35,
                        "s": "系列2",
                        "t": "bar"
                    }
                ]
            }
        }
    },





    /*
     *指数图
     */
    {
        vtype: "VIndexdiagram",
        defoption: {
            top: 10,
            left: 10,
            width: 400,
            height: 400,
            viewtype: "VIndexdiagram",//使用viewtype创建对象;
            viewname: "指数图",
            viewoption: {
                title: {
                    text: ""
                },
                tooltip: {
                    trigger: "axis"
                },
                xAxis: {
                    data: [
                        "2018-09-0",
                        "2018-09-1",
                        "2018-09-2",
                        "2018-09-3",
                        "2018-09-4",
                        "2018-09-5",
                        "2018-09-6",
                        "2018-09-7",
                        "2018-09-8",
                        "2018-09-9",
                        "2018-09-10",
                        "2018-09-11",
                        "2018-09-12",
                        "2018-09-13",
                        "2018-09-14",
                        "2018-09-15",
                        "2018-09-16",
                        "2018-09-17",
                        "2018-09-18",
                        "2018-09-19",
                        "2018-09-20",
                        "2018-09-21",
                        "2018-09-22",
                        "2018-09-23",
                        "2018-09-24",
                        "2018-09-25",
                        "2018-09-26",
                        "2018-09-27",
                        "2018-09-28",
                        "2018-09-29",
                        "2018-09-30",
                        "2018-09-31",
                        "2018-09-32",
                        "2018-09-33",
                        "2018-09-34",
                        "2018-09-35",
                        "2018-09-36",
                        "2018-09-37",
                        "2018-09-38",
                        "2018-09-39",
                        "2018-09-40",
                        "2018-09-41",
                        "2018-09-42",
                        "2018-09-43",
                        "2018-09-44",
                        "2018-09-45",
                        "2018-09-46",
                        "2018-09-47",
                        "2018-09-48",
                        "2018-09-49",
                        "2018-09-50",
                        "2018-09-51",
                        "2018-09-52",
                        "2018-09-53",
                        "2018-09-54",
                        "2018-09-55",
                        "2018-09-56",
                        "2018-09-57",
                        "2018-09-58",
                        "2018-09-59",
                        "2018-09-60",
                        "2018-09-61",
                        "2018-09-62",
                        "2018-09-63",
                        "2018-09-64",
                        "2018-09-65",
                        "2018-09-66",
                        "2018-09-67",
                        "2018-09-68",
                        "2018-09-69",
                        "2018-09-70",
                        "2018-09-71",
                        "2018-09-72",
                        "2018-09-73",
                        "2018-09-74",
                        "2018-09-75",
                        "2018-09-76",
                        "2018-09-77",
                        "2018-09-78",
                        "2018-09-79",
                        "2018-09-80",
                        "2018-09-81",
                        "2018-09-82",
                        "2018-09-83",
                        "2018-09-84",
                        "2018-09-85",
                        "2018-09-86",
                        "2018-09-87",
                        "2018-09-88",
                        "2018-09-89",
                        "2018-09-90",
                        "2018-09-91",
                        "2018-09-92",
                        "2018-09-93",
                        "2018-09-94",
                        "2018-09-95",
                        "2018-09-96",
                        "2018-09-97",
                        "2018-09-98",
                        "2018-09-99"]
                },
                yAxis: {
                    splitLine: {
                        show: false
                    },
                    minInterval: 1,
                    boundaryGap: [0, 1]//柱线图最大值范围
                },
                toolbox: {
                    left: "center",
                    feature: {
                        dataZoom: {
                            yAxisIndex: "none"
                        },
                        restore: {
                        },
                        saveAsImage: {
                        }
                    }
                },
                dataZoom: [
                    {
                        startValue: "2014-06-01"
                    },
                    {
                        type: "inside"
                    }],
                visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [
                        {
                            gt: 0,
                            lte: 100,
                            color: "#ffde33"
                        },
                        {
                            gt: 100,
                            lte: 200,
                            color: "#ff9933"
                        },
                        {
                            gt: 200,
                            lte: 300,
                            color: "#660099"
                        },
                        {
                            gt: 300,
                            color: "#7e0023"
                        }],
                    outOfRange: {
                        color: "#999"
                    }
                },
                series: [
                    {
                        name: "Beijing AQI",
                        type: "line",
                        data: [
                            181,
                            163,
                            159,
                            371,
                            464,
                            5,
                            285,
                            202,
                            415,
                            388,
                            430,
                            296,
                            38,
                            484,
                            293,
                            475,
                            461,
                            389,
                            107,
                            105,
                            127,
                            108,
                            225,
                            367,
                            38,
                            386,
                            221,
                            303,
                            4,
                            474,
                            53,
                            440,
                            263,
                            115,
                            266,
                            488,
                            231,
                            112,
                            175,
                            108,
                            233,
                            327,
                            43,
                            124,
                            28,
                            258,
                            468,
                            317,
                            81,
                            424,
                            187,
                            347,
                            461,
                            458,
                            408,
                            73,
                            438,
                            291,
                            332,
                            78,
                            283,
                            481,
                            198,
                            441,
                            335,
                            490,
                            33,
                            422,
                            217,
                            305,
                            244,
                            348,
                            213,
                            499,
                            372,
                            299,
                            65,
                            100,
                            338,
                            280,
                            417,
                            404,
                            221,
                            79,
                            287,
                            205,
                            479,
                            304,
                            207,
                            193,
                            49,
                            439,
                            280,
                            97,
                            324,
                            251,
                            129,
                            102,
                            289,
                            38],
                        markLine: {
                            silent: true,
                            data: [
                                //{
                                //    yAxis: 300
                                //},
                                //{
                                //    yAxis: 200
                                //},
                                //{
                                //    yAxis: 100
                                //}
                            ]
                        }
                    }]


            },
            viewdata: {
                datafor: "VIndexdiagram",
                datatype: "json",
                datamappingitem: ["x", "y", "s", "max", "min", "ave"],
                //dataoptin:{x:"xAxis.data",y:""}
                datamapping: { x: 'x', y: "y", s: '', max: '', min: '', ave: '' },
                datamappingtxt: { x: "类目", y: '值', s: '系列,可选', max: "最大值", min: "最小值", ave: "平均值" },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [{ "x": "2018-09-0", "y": 181, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-1", "y": 163, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-2", "y": 159, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-3", "y": 371, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-4", "y": 464, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-5", "y": 5, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-6", "y": 285, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-7", "y": 202, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-8", "y": 415, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-9", "y": 388, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-10", "y": 430, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-11", "y": 296, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-12", "y": 38, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-13", "y": 484, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-14", "y": 293, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-15", "y": 475, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-16", "y": 461, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-17", "y": 389, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-18", "y": 107, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-19", "y": 105, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-20", "y": 127, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-21", "y": 108, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-22", "y": 225, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-23", "y": 367, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-24", "y": 38, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-25", "y": 386, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-26", "y": 221, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-27", "y": 303, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-28", "y": 4, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-29", "y": 474, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-30", "y": 53, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-31", "y": 440, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-32", "y": 263, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-33", "y": 115, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-34", "y": 266, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-35", "y": 488, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-36", "y": 231, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-37", "y": 112, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-38", "y": 175, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-39", "y": 108, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-40", "y": 233, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-41", "y": 327, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-42", "y": 43, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-43", "y": 124, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-44", "y": 28, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-45", "y": 258, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-46", "y": 468, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-47", "y": 317, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-48", "y": 81, "max": 100, "min": 10, "ave": 50 },
                { "x": "2018-09-49", "y": 424, "max": 100, "min": 10, "ave": 50 }]
            }
        }
    },

    /**
     * 柱状图
     * */
    {
        vtype: "chart.bar",
        defoption: {
            top: 10,
            left: 10,
            width: 400,
            height: 400,
            viewtype: "chart",//使用viewtype创建对象;
            viewname: "柱状图",
            viewoption: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#fff",
                            fontSize: 18,
                            fontFamily: "Microsoft YaHei"
                        }
                    },
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize: 18,
                            fontFamily: "Microsoft YaHei"
                        }
                    }

                },
                series: [{
                    data: [],
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true
                            },
                            barBorderRadius: 0,
                            color: '#027eff'
                        }
                    }
                }]
            },
            viewdata: {
                datafor: "chart.bar",
                datatype: "json",
                datamappingitem: ["x", "y", "s"],
                //dataoptin:{x:"xAxis.data",y:""}
                datamapping: { x: 'x', y: "y", s: '' },
                datamappingtxt: { x: "类目", y: '值', s: '系列,可选' },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "x": "星期一",
                        "y": 23
                    },
                    {
                        "x": "星期二",
                        "y": 13
                    },
                    {
                        "x": "星期三",
                        "y": 14
                    },
                    {
                        "x": "星期四",
                        "y": 24
                    }
                ]
            }
        }
    },

    /**
 * 仪表盘
 * */
    {
        vtype: "chart.ybp.hgl",
        defoption: {
            top: 10,
            left: 10,
            width: 400,
            height: 400,
            viewtype: "chart",//使用viewtype创建对象;
            viewname: "仪表盘",
            viewoption:
            {
                color: ["#37A2DA", "#32C5E9", "#67E0E3"],
                series: [{
                    name: '业务指标',
                    type: 'gauge',
                    detail: {
                        formatter: '{value}%'
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            width: 30,
                            shadowBlur: 0,
                            color: [
                                [0.3, '#67e0e3'],
                                [0.7, '#37a2da'],
                                [1, '#fd666d']
                            ]
                        }
                    },
                    data: [{
                        value: 50,
                        name: '合格率',
                    }]

                }]
            },
            viewdata: {
                datafor: "chart.ybp.hgl",
                datatype: "json",
                datamappingitem: ["name", "value"],
                datamapping: { name: 'name', value: "value" },
                datamappingtxt: { name: "名称", value: '值' },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "name": "合格率",
                        "value": 23
                    }
                ]
            }
        }
    },


    /**
* 基础雷达图
* */
    {
        vtype: "chart.radar",
        defoption: {
            top: 10,
            left: 10,
            width: 400,
            height: 400,
            viewtype: "chart",//使用viewtype创建对象;
            viewname: "基础雷达图",
            viewoption: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                title: {
                    text: '基础雷达图'
                },
                tooltip: {},
                legend: {
                    data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [
                        { name: '销售（sales）', max: 6500 },
                        { name: '管理（Administration）', max: 16000 },
                        { name: '信息技术（Information Techology）', max: 30000 },
                        { name: '客服（Customer Support）', max: 38000 },
                        { name: '研发（Development）', max: 52000 },
                        { name: '市场（Marketing）', max: 25000 }
                    ]
                },
                series: [{
                    name: '预算 vs 开销（Budget vs spending）',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data: [
                        {
                            value: [4300, 10000, 28000, 35000, 50000, 19000],
                            name: '预算分配（Allocated Budget）'
                        },
                        {
                            value: [5000, 14000, 28000, 31000, 42000, 21000],
                            name: '实际开销（Actual Spending）'
                        }
                    ]
                }]
            }
        }
    },
    //vtype chart 饼图
    {
        vtype: "chart.pie",
        defoption: {
            top: 10,
            left: 10,
            width: 400,
            height: 400,
            viewtype: "chart",//使用viewtype创建对象;
            viewname: "基础饼图",
            viewoption: {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    "x": "center",
                    "y": "bottom",
                    data: []
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center',
                                "formatter": "{d}%\n{b}"
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            //{value:10,name:"分类"}
                        ]
                    }
                ]
            },
            viewdata: {
                datafor: "chart.pie",
                datatype: "json",
                datamappingitem: ["x", "y"],
                datamapping: { x: 'x', y: "y" },
                datamappingtxt: { x: "类目", y: '值' },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "x": "分类1",
                        "y": 23
                    },
                    {
                        "x": "分类2",
                        "y": 13
                    },
                    {
                        "x": "分类3",
                        "y": 14
                    }
                ]
            }
        }
    },
    //vtype chart 水滴图
    {
        vtype: "chart.liquidfill",
        defoption: {
            top: 100,
            left: 100,
            width: 400,
            height: 400,
            viewtype: "chart",
            viewname: "水滴图",
            viewoption: {
                backgroundColor: 'rgba(0, 0, 0, 0)', //rgba璁剧疆閫忔槑搴?.1
                series: [{
                    type: 'liquidFill',
                    data: [0.8, 0.5, 0.4, 0.3],
                    label: {
                        fontSize: 32,
                        color: '#D94854'
                    }
                }]
            },
            viewdata: {
                datafor: "chart.liquidfill",
                datatype: "json",
                datamappingitem: ["x", "y", "z", "v"],
                datamapping: { x: 'x', y: "y", z: "z", v: "v" },
                datamappingtxt: { x: "百分比及最里层浪高度", y: '里向外第二层浪高', z: "里向外第三层浪高", v: "最外层浪高" },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [{
                    "x": 0.8,
                    "y": 0.5,
                    "z": 0.4,
                    "v": 0.2
                }]

            }
        }
    },
    //vtype 文本
    {
        vtype: "text",
        defoption: {
            top: 100,
            left: 100,
            width: 200,
            height: 36,
            viewtype: "text",
            viewname: "文本框",
            viewoption: {
                html: '文本框',
                color: '#FFFFFF',
                fontsize: "32px"
            }
            ,
            viewdata: {
                datafor: "text",
                datatype: "json",
                datamappingitem: ["value"],
                datamapping: { value: 'value' },
                datamappingtxt: { value: "值" },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "value": "文本",
                    }
                ]
            }
        }
    },

    //vtype 文本扩展
    {
        vtype: "textextend",
        defoption: {
            top: 100,
            left: 100,
            width: 200,
            height: 36,
            viewtype: "textextend",
            viewname: "文本框",
            viewoption: {
                html: '文本框',
                color: '#FFFFFF',
                "font-size": "32px",
                "text-align": "center"
            }
            ,
            viewdata: {
                datafor: "textextend",
                datatype: "json",
                datamappingitem: ["value"],
                datamapping: { value: 'value' },
                datamappingtxt: { value: "值" },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson:
                {
                    value: "文本",
                    color: '#FFFFFF',
                    "font-size": "32px",
                    background: "#415287"
                }

            }
        }
    },

    //vtype 图片
    {
        vtype: "image", defoption: {
            top: 100,
            left: 100,
            width: 200,
            height: 200,
            viewtype: "image",
            viewname: "单张图片",
            viewoption: {
                image: '../../databoard/image/titleioc.png',
                // ftp格式  [{"value":"/FTP/Image/View?username=eosftp&pwd=123456&filepath=ftp://192.168.3.115/k.png"}]
            }
            ,
            viewdata: {
                datafor: "image",
                datatype: "json",
                datamappingitem: ["value"],
                datamapping: { value: 'value' },
                datamappingtxt: { value: "值" },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "value": "../../databoard/image/titleioc.png",
                    }
                ]
            }
        }
    },
    //vtype 图片边框
    {
        vtype: "imageborder", defoption: {
            top: 100,
            left: 100,
            width: 400,
            height: 400,
            viewtype: "imageborder",
            viewname: "边框图",
            viewoption: {
                backgroundColor: "none",   //div背景色
                borderStyle: "solid",
                borderWidth: "14px",
                image: '../../databoard/image/border2.png',
            }
        }
    },
    //vtype 时间
    {
        vtype: "clock", defoption: {
            top: 100,
            left: 100,
            width: 200,
            height: 36,
            viewtype: "clock",
            viewname: "时间",
            viewoption: {
                color: '#FFFFFF',
                format: "yyyy-MM-dd HH:mm:ss",
                fontsize: "32px"
            }
        }
    },



    //vtype 滚动文本修改20180921 走马灯
    {
        vtype: "marqueed", defoption: {
            top: 10,
            left: 10,
            width: 200,
            height: 100,
            viewtype: "marqueed",
            viewname: "滚动文字",
            viewoption: {

                marquee: {
                    direction: "left",//“滚动方向取值”：up、down、left  和  right，其中向左滚动  left  的效果和默认效果相同。
                    behavior: "scroll",//scroll循环滚动，默认效果, slide只滚动一次就停止,  alternate来回交替进行滚动
                    scrollamount: "100", //在该语法中，滚动文字的速度实际上是设置滚动文字每次移动的长度，以像素为单位。
                    scrolldelay: "800",//时间间隔单位是毫秒（千分之一秒）
                    loop: "12",//循环次数
                    bgcolor: "transparent", //背景色
                    hspace: "200",//滚动空间属性——水平范围  //https://blog.csdn.net/jianggujin/article/details/70832469
                    vspace: "200"  //滚动空间属性——垂直范围
                },
                span: {
                    html: "滚动文字",
                    color: "transparent",
                    "font-weight": "bolder",
                    "font-size": "40px",
                },
            }
            ,
            viewdata: {
                datafor: "marqueed",
                datatype: "json",
                datamappingitem: ["value"],
                datamapping: { value: 'value' },
                datamappingtxt: { value: "值" },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "value": "滚动文字",
                    }
                ]
            }
        }
    },
    //vtype 轮播列表柱状图20190108  多行走马灯
    {
        vtype: "rowscrolltext", defoption: {
            top: 10,
            left: 10,
            width: 400,
            height: 400,
            viewtype: "rowscrolltext",
            viewname: "轮播列表柱状图",
            viewoption: {
                rollingspeed: 30, //横向滚动速度
                rotesecond: 5, //每行翻转停留时间
                pagerowcount: -1, //每页条数，-1表示不分页
                sleepspace: 2,//停止间隔时间2s
                pagesecond: 20,//每页显示停留时间
                alldivcss: {   //整体设置样式
                    height: "50px",
                    "line-height":"50px"
                },
                keycss: {  //对第一列No.设置样式
                    color: "white",
                    "font-size": 24,
                    "font-weight": "bold"
                },
                valuecss: {   //对滚动内容设置样式
                    color: "white",
                    "font-size": 24,
                    "border-bottom": "2px dashed #F00"  //div的下边线
                }
            }
            ,
            viewdata: {
                datafor: "rowscrolltext",
                datatype: "json",
                datamappingitem: ["x", "y"],
                datamapping: { x: 'x', y: "y" },
                datamappingtxt: { x: "值", y: '内容' },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "x": "星期一",
                        "y": "AAAAA647f65sd4f6sa54df6sad4f6as4df6as54dfasd4fas"
                    },
                    {
                        "x": "星期二",
                        "y": "BBBBB647f65sd4f6sa54df6sad4f6as4df6as54dfasd4fas"
                    },
                    {
                        "x": "星期三",
                        "y": "CCCCCC647f65sd4f6sa54df6sad4f6as4df6as54dfasd4fas"
                    },
                    {
                        "x": "星期四",
                        "y": "DDDDDDD647f65sd4f6sa54df6sad4f6as4df6as54dfasd4fas"
                    }
                ]
            }
        }
    },
    //vtype 翻牌数字框
    {
        vtype: "textnumber",
        defoption: {
            top: 100,
            left: 100,
            width: 200,
            height: 36,
            viewtype: "textnumber",
            viewname: "翻牌数字框",
            viewoption: {
                backdivcss: {
                    background: "transparent"  //div背景色
                },
                rollnumbackcss: {
                    width: "50px",
                    height: "100px",
                    background: "#poed89"  //div背景色
                },
                rollnumcss: {
                    color: "white",
                    "font-size": "30px",
                    "font-weight": "bold",
                    "line-height": "100px"
                }
            }
            ,
            viewdata: {
                datafor: "textnumber",
                datatype: "json",
                datamappingitem: ["value"],
                datamapping: { value: 'value' },
                datamappingtxt: { value: "值" },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "value": "91234567890",
                    }
                ]
            }
        }
    },

    //vtype 滚动数字20180927
    {
        vtype: "flopnum",
        defoption: {
            top: 100,
            left: 100,
            width: 300,
            height: 200,
            viewtype: "flopnum",
            viewname: "翻牌数字框",
            viewoption: {
                backdivcss: {
                    display: "inline-block",
                    position: "relative",
                    background: "#999999"
                },
                numcss: {
                    padding: "0 5px",
                    "font-size": "32px",
                    "font-weight": 600,
                    color: "gold"
                },
                titlecss: {
                    margin: 0,
                    "margin-bottom": "5px",
                    "font-size": "16px",
                    color: "#fff"
                },
                prefixcss: {
                    "font-size": "16px",
                    color: "gold"
                },
                suffixcss: {
                    "font-size": "14px",
                    color: "gold"
                },
                datadisplay: {
                    title: '这是一个标题',
                    prefix: '￥',
                    suffix: '元'
                }
            }
            ,
            viewdata: {
                datafor: "flopnum",
                datatype: "json",
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "value": 123456789
                    }
                ]
            }
        }
    },
    //vtype 进度环
    {
        vtype: "percentpie", defoption: {
            top: 10,
            left: 10,
            width: 200,
            height: 200,
            viewtype: "percentpie",
            viewname: "进度环",
            viewoption: {
                fontcolor: '#FFFFFF',
                fontsize: "32px",
                colorstart: '#00cefc', // 0% 处的颜色
                colorstop: '#367bec' // 100% 处的颜色

            }
            ,
            viewdata: {
                datafor: "percentpie",
                datatype: "json",
                datamappingitem: ["value"],
                datamapping: { value: 'value' },
                datamappingtxt: { value: "值" },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "value": "80",
                    }
                ]
            }
        }
    },//vtype 进度条
    {
        vtype: "percentbar", defoption: {
            top: 10,
            left: 10,
            width: 200,
            height: 100,
            viewtype: "percentbar",
            viewname: "进度条",
            viewoption: {
                color: '#FFFFFF',
                fontsize: "32px",
                parentHeight: "60",
                bargradientbeforecolorandmark: "#009cff 0%",
                bargradientendcolorandmark: "#fffc00 100%"
            }
            ,
            viewdata: {
                datafor: "percentbar",
                datatype: "json",
                datamappingitem: ["value"],
                datamapping: { value: 'value' },
                datamappingtxt: { value: "值" },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "value": "35",
                    }
                ]
            }
        }
    },
    //vtype 表格
    {
        vtype: "table", defoption: {
            top: 10,
            left: 10,
            width: 200,
            height: 200,
            viewtype: "table",
            viewname: "滚动表格",
            viewoption: {
                tabletheadcss: {
                    "font-size": "24px",
                    "text-align": "center",
                    "line-height": "36px",
                    "background-color": "#973c3f",
                    "color": "#a1afc9"
                },
                tabletbodycss: {
                    "background-color": "#000000",
                    "font-size": "18px",
                    "line-height": "36px",
                    "color": "#a1afc9"
                },

                columns: [
                    { caption: "标题1", field: "field1", width: 80 },
                    { caption: "标题2", field: "field2", width: 80 }
                ]
            }
            ,
            viewdata: {
                datafor: "table",
                datatype: "json",
                datamappingitem: [],
                datamapping: {},
                datamappingtxt: {},
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "field1": "杭州", "field2": "35"
                    },
                    {
                        "field1": "上海", "field2": "55"
                    }

                ]
            }
        }
    },
    //VScrollingTable 滚动表格修改20180921
    {
        vtype: "VScrollingTable", defoption: {
            top: 10,
            left: 10,
            width: 400,
            height: 400,
            viewtype: "VScrollingTable",
            viewname: "滚动表格",
            viewoption: {
                scrollingattr: {
                    scrollingspeed: 1000,//滚动速度 
                },
                backdivcss: {
                    "background-color": "transparent"
                },
                tablecss: {
                    "margin": "auto"
                },
                tabletheadcss: {
                    "font-size": "24px",
                    "text-align": "center",
                    "line-height": "36px",
                    "background-color": "transparent",
                    "color": "#a1afc9"
                },
                tabletbodycss: {
                    "background-color": "transparent",
                    "font-size": "18px",
                    "line-height": "36px",
                    "color": "#a1afc9",
                    "text-align": "center",
                },
                tablethead: [
                    { caption: "地址", field: "field1", width: "30%" },
                    { caption: "数值1", field: "field2", width: "30%" },
                    { caption: "数值2", field: "field3", width: "40%" }
                ]
            }
            ,
            viewdata: {
                datafor: "VScrollingTable",
                datatype: "json",
                datamappingitem: [],
                datamapping: {},
                datamappingtxt: {},
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "field1": "杭州", "field2": "22", "field3": "59"
                    },
                    {
                        "field1": "背景", "field2": "82", "field3": "49"
                    }

                ]
            }
        }
    },

    {
        vtype: "key_value_tabel", defoption: {
            top: 10,
            left: 10,
            width: 400,
            height: 400,
            viewtype: "key_value_tabel",
            viewname: "键值表格",
            viewoption: {
                color: '#FFFFFF',
                fontsize: "16px",
                borderStyle: "solid",           //边线样式 none 没有，solid 线条
                borderWidth: "1px",
                borderColor: "#fff",        //边线颜色  
                textalign: "right",//右对齐 left 左,center 中
                padding_right_left: "0px",         //左右间距 内容和边框的间距
                padding_top_buttom: "0px",    //上下间距 内容和边框的间距
                backgroundColor: "none",   //div背景色
                backgroundtabelColor: "none", //表格背景色
                keycolumn: { width: 80, caption: "名称" },
                valuecolumn: { width: 80, caption: "值" }
            }
            ,
            viewdata: {
                datafor: "percentpie",
                datatype: "json",
                datamappingitem: [],
                datamapping: {},
                datamappingtxt: {},
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "地址": "杭州:", "值": "35", "热度": "35"
                    }
                ]
            }
        }
    }
    ,


    //散列图
    {
        vtype: "hashdiagram",
        defoption: {
            top: 10,
            left: 10,
            width: 400,
            height: 400,
            viewtype: "hashdiagram",//使用viewtype创建对象;
            viewname: "散列图",
            viewoption: {
                xAxis: {
                    "splitLine": {
                        "lineStyle": {
                            "type": "dashed"
                        }
                    }
                },
                yAxis: {
                    "splitLine": {
                        "lineStyle": {
                            "type": "dashed"
                        }
                    },
                    "scale": true
                },
                series: []
            },
            viewdata: {
                datafor: "hashdiagram",
                datatype: "json",
                //datamappingitem: ["x", "y", "s"],
                ////dataoptin:{x:"xAxis.data",y:""}
                //datamapping: { x: 'x', y: "y", s: '' },
                //datamappingtxt: { x: "类目", y: '值', s: '系列,可选' },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [{
                    name: 'A',
                    symbolSize: 20,
                    type: 'scatter',
                    data:
                        [[10.0, 8.04],
                        [8.0, 6.95],
                        [13.0, 7.58],
                        [9.0, 8.81],
                        [11.0, 8.33],
                        [14.0, 9.96],
                        [6.0, 7.24],
                        [4.0, 4.26],
                        [12.0, 10.84],
                        [7.0, 4.82],
                        [5.0, 5.68]]
                }, {
                    name: 'B',
                    symbolSize: 20,
                    type: 'scatter',
                    data:
                        [[12, 8.04],
                        [80, 16.95],
                        [13.0, 14.58],
                        [9.0, 15.81],
                        [11.0, 22.33],
                        [12, 9],
                        [6.0, 10],
                        [4.0, 40],
                        [12.0, 1.84],
                        [7.0, 10.82],
                        [5.0, 10.68]]
                }

                ]
            }
        }
    },


    //button

    {
        vtype: "VButton", defoption: {
            top: 10,
            left: 10,
            width: 100,
            height: 36,
            viewtype: "VButton",
            viewname: "按键",
            viewoption: {
                "color": '#FF1715',
                "font-size": "32px",
                fonttext: "按键",
                "font-family": "Arial",            		//设置按钮是否是圆角
                margin: "0 auto",
                border: "1px solid #6D4094",              //边线样式 none 没有，solid 线条     
                "text-align": "center",//右对齐 left 左,center 中        
                "line-height": "100px",//div高度， div内容上下居中，0px占位符，内部已做处理，在此配置项目中无效，动态获取div调试
                background: "#076DCF",   //div背景色   
                "background-image": "url(/Databoard/image/itempreviewimg/butbackimg.png)",
                "background-size": "cover"  //自适应div大小
            },
            viewdata: {
                datafor: "VButton",
                datatype: "json",
                datamappingitem: ["value"],
                datamapping: { value: 'value' },
                datamappingtxt: { value: "function(obj){}" },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "value": "function() { }"
                    }
                ]
            }
        }
    },
    //VUrl   按键超链接
    {
        vtype: "VUrl", defoption: {
            top: 10,
            left: 10,
            width: 100,
            height: 36,
            viewtype: "VUrl",
            viewname: "按键",
            viewoption: {
                display: "inline-block",
                "color": '#FFFFFF',
                "font-size": "32px",
                fonttext: "按键",
                "font-family": "Arial",            		//设置按钮是否是圆角
                margin: "0 auto",
                border: "1px solid #6D4094",              //边线样式 none 没有，solid 线条     
                "text-align": "center",//右对齐 left 左,center 中        
                "line-height": "100px",//div高度， div内容上下居中，0px占位符，内部已做处理，在此配置项目中无效，动态获取div调试
                background: "#3498db",   //div背景色   
                /*设置按钮背景渐变色*/
                "background-image": "-webkit-linear-gradient(top, #3498db, #2980b9)",
                "background-image": "-moz-linear-gradient(top, #3498db, #2980b9)",
                "background-image": "-ms-linear-gradient(top, #3498db, #2980b9)",
                "background-image": "-o-linear-gradient(top, #3498db, #2980b9)",
                "background-image": "linear-gradient(to bottom, #3498db, #2980b9)",
                //"background-image": "url(/Databoard/image/itempreviewimg/butbackimg.png)",         //背景图
                "background-size": "cover"  //自适应div大小
            },
            viewdata: {
                datafor: "VUrl",
                datatype: "json",
                datamappingitem: ["value"],
                datamapping: { value: 'value' },
                datamappingtxt: { value: "value" },
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    {
                        "value": "https://www.baidu.com/"
                    }
                ]
            }
        }
    },


    //全国数据分布图
    {
        vtype: "percentchinamapfornum", defoption: {
            top: 10,
            left: 10,
            width: 1000,
            height: 800,
            viewtype: "percentchinamapfornum",//使用viewtype创建对象;
            viewname: "全国数据分布图",
            viewoption: {

                tooltip: {},
                visualMap: {
                    min: 0,
                    max: 1500,
                    left: 'left',
                    top: 'bottom',
                    text: ['High', 'Low'],
                    seriesIndex: [1],
                    inRange: {
                        color: ['#e0ffff', '#006edd']
                    },
                    calculable: true
                },
                geo: {
                    map: 'china',
                    roam: true,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: 'rgba(0,0,0,0.4)'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(0, 0, 0, 0.2)'
                        },
                        emphasis: {
                            areaColor: null,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 20,
                            borderWidth: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
                series: [
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: [],
                        symbolSize: 50,
                        //标记样式
                        // symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
                        symbolRotate: 35,
                        label: {
                            normal: {
                                formatter: function (data) {              //显示标记的值
                                    var result = "";
                                    result += data.name + ":" + data.value[3];
                                    return result;
                                },     //显示数据
                                position: 'top',        //标记的位置
                                show: true     //显示 标记
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#dd0054'
                            }
                        }
                    },
                    {
                        name: 'categoryA',
                        type: 'map',
                        geoIndex: 0,
                        // tooltip: { show: true },
                        data: [],
                    }
                ]
            },
            viewdata: {
                datafor: "percentchinamapfornum",
                datatype: "json",
                datamappingitem: [],
                datamapping: {},
                datamappingtxt: {},
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                data: [
                    { name: '海门', value: 9 },                   //标记数据
                    { name: '鄂尔多斯', value: 12 },
                    { name: '招远', value: 12 },
                    { name: '舟山', value: 12 },
                    { name: '齐齐哈尔', value: 14 },
                    { name: '盐城', value: 15 },
                ],
                adData: [             //地图要显示的地名，如不显示可去除此条数据，value 值可随意给   >0
                    { name: '北京', value: Math.round(Math.random() * 1000) },
                    { name: '天津', value: Math.round(Math.random() * 1000) },
                    { name: '上海', value: Math.round(Math.random() * 1000) },
                    { name: '重庆', value: Math.round(Math.random() * 1000) },
                    { name: '河北', value: Math.round(Math.random() * 1000) },
                    { name: '河南', value: Math.round(Math.random() * 1000) },
                    { name: '云南', value: Math.round(Math.random() * 1000) },
                    { name: '辽宁', value: Math.round(Math.random() * 1000) },
                    { name: '黑龙江', value: Math.round(Math.random() * 1000) },
                    { name: '湖南', value: Math.round(Math.random() * 1000) },
                    { name: '安徽', value: Math.round(Math.random() * 1000) },
                    { name: '山东', value: Math.round(Math.random() * 1000) },
                    { name: '新疆', value: Math.round(Math.random() * 1000) },
                    { name: '江苏', value: Math.round(Math.random() * 1000) },
                    { name: '浙江', value: Math.round(Math.random() * 1000) },
                    { name: '江西', value: Math.round(Math.random() * 1000) },
                    { name: '湖北', value: Math.round(Math.random() * 1000) },
                    { name: '广西', value: Math.round(Math.random() * 1000) },
                    { name: '甘肃', value: Math.round(Math.random() * 1000) },
                    { name: '山西', value: Math.round(Math.random() * 1000) },
                    { name: '内蒙古', value: Math.round(Math.random() * 1000) },
                    { name: '陕西', value: Math.round(Math.random() * 1000) },
                    { name: '吉林', value: Math.round(Math.random() * 1000) },
                    { name: '福建', value: Math.round(Math.random() * 1000) },
                    { name: '贵州', value: Math.round(Math.random() * 1000) },
                    { name: '广东', value: Math.round(Math.random() * 1000) },
                    { name: '青海', value: Math.round(Math.random() * 1000) },
                    { name: '西藏', value: Math.round(Math.random() * 1000) },
                    { name: '四川', value: Math.round(Math.random() * 1000) },
                    { name: '宁夏', value: Math.round(Math.random() * 1000) },
                    { name: '海南', value: Math.round(Math.random() * 1000) },
                    { name: '台湾', value: Math.round(Math.random() * 1000) },
                    { name: '香港', value: Math.round(Math.random() * 1000) },
                    { name: '澳门', value: Math.round(Math.random() * 1000) }
                ],
                geoCoordMap: {                                                   //位置数据 ，默认不建议修改
                    '海门': [121.15, 31.89],
                    '鄂尔多斯': [109.781327, 39.608266],
                    '招远': [120.38, 37.35],
                    '舟山': [122.207216, 29.985295],
                    '齐齐哈尔': [123.97, 47.33],
                    '盐城': [120.13, 33.38],
                    '赤峰': [118.87, 42.28],
                    '青岛': [120.33, 36.07],
                    '乳山': [121.52, 36.89],
                    '金昌': [102.188043, 38.520089],
                    '泉州': [118.58, 24.93],
                    '莱西': [120.53, 36.86],
                    '日照': [119.46, 35.42],
                    '胶南': [119.97, 35.88],
                    '南通': [121.05, 32.08],
                    '拉萨': [91.11, 29.97],
                    '云浮': [112.02, 22.93],
                    '梅州': [116.1, 24.55],
                    '文登': [122.05, 37.2],
                    '上海': [121.48, 31.22],
                    '攀枝花': [101.718637, 26.582347],
                    '威海': [122.1, 37.5],
                    '承德': [117.93, 40.97],
                    '厦门': [118.1, 24.46],
                    '汕尾': [115.375279, 22.786211],
                    '潮州': [116.63, 23.68],
                    '丹东': [124.37, 40.13],
                    '太仓': [121.1, 31.45],
                    '曲靖': [103.79, 25.51],
                    '烟台': [121.39, 37.52],
                    '福州': [119.3, 26.08],
                    '瓦房店': [121.979603, 39.627114],
                    '即墨': [120.45, 36.38],
                    '抚顺': [123.97, 41.97],
                    '玉溪': [102.52, 24.35],
                    '张家口': [114.87, 40.82],
                    '阳泉': [113.57, 37.85],
                    '莱州': [119.942327, 37.177017],
                    '湖州': [120.1, 30.86],
                    '汕头': [116.69, 23.39],
                    '昆山': [120.95, 31.39],
                    '宁波': [121.56, 29.86],
                    '湛江': [110.359377, 21.270708],
                    '揭阳': [116.35, 23.55],
                    '荣成': [122.41, 37.16],
                    '连云港': [119.16, 34.59],
                    '葫芦岛': [120.836932, 40.711052],
                    '常熟': [120.74, 31.64],
                    '东莞': [113.75, 23.04],
                    '河源': [114.68, 23.73],
                    '淮安': [119.15, 33.5],
                    '泰州': [119.9, 32.49],
                    '南宁': [108.33, 22.84],
                    '营口': [122.18, 40.65],
                    '惠州': [114.4, 23.09],
                    '江阴': [120.26, 31.91],
                    '蓬莱': [120.75, 37.8],
                    '韶关': [113.62, 24.84],
                    '嘉峪关': [98.289152, 39.77313],
                    '广州': [113.23, 23.16],
                    '延安': [109.47, 36.6],
                    '太原': [112.53, 37.87],
                    '清远': [113.01, 23.7],
                    '中山': [113.38, 22.52],
                    '昆明': [102.73, 25.04],
                    '寿光': [118.73, 36.86],
                    '盘锦': [122.070714, 41.119997],
                    '长治': [113.08, 36.18],
                    '深圳': [114.07, 22.62],
                    '珠海': [113.52, 22.3],
                    '宿迁': [118.3, 33.96],
                    '咸阳': [108.72, 34.36],
                    '铜川': [109.11, 35.09],
                    '平度': [119.97, 36.77],
                    '佛山': [113.11, 23.05],
                    '海口': [110.35, 20.02],
                    '江门': [113.06, 22.61],
                    '章丘': [117.53, 36.72],
                    '肇庆': [112.44, 23.05],
                    '大连': [121.62, 38.92],
                    '临汾': [111.5, 36.08],
                    '吴江': [120.63, 31.16],
                    '石嘴山': [106.39, 39.04],
                    '沈阳': [123.38, 41.8],
                    '苏州': [120.62, 31.32],
                    '茂名': [110.88, 21.68],
                    '嘉兴': [120.76, 30.77],
                    '长春': [125.35, 43.88],
                    '胶州': [120.03336, 36.264622],
                    '银川': [106.27, 38.47],
                    '张家港': [120.555821, 31.875428],
                    '三门峡': [111.19, 34.76],
                    '锦州': [121.15, 41.13],
                    '南昌': [115.89, 28.68],
                    '柳州': [109.4, 24.33],
                    '三亚': [109.511909, 18.252847],
                    '自贡': [104.778442, 29.33903],
                    '吉林': [126.57, 43.87],
                    '阳江': [111.95, 21.85],
                    '泸州': [105.39, 28.91],
                    '西宁': [101.74, 36.56],
                    '宜宾': [104.56, 29.77],
                    '呼和浩特': [111.65, 40.82],
                    '成都': [104.06, 30.67],
                    '大同': [113.3, 40.12],
                    '镇江': [119.44, 32.2],
                    '桂林': [110.28, 25.29],
                    '张家界': [110.479191, 29.117096],
                    '宜兴': [119.82, 31.36],
                    '北海': [109.12, 21.49],
                    '西安': [108.95, 34.27],
                    '金坛': [119.56, 31.74],
                    '东营': [118.49, 37.46],
                    '牡丹江': [129.58, 44.6],
                    '遵义': [106.9, 27.7],
                    '绍兴': [120.58, 30.01],
                    '扬州': [119.42, 32.39],
                    '常州': [119.95, 31.79],
                    '潍坊': [119.1, 36.62],
                    '重庆': [106.54, 29.59],
                    '台州': [121.420757, 28.656386],
                    '南京': [118.78, 32.04],
                    '滨州': [118.03, 37.36],
                    '贵阳': [106.71, 26.57],
                    '无锡': [120.29, 31.59],
                    '本溪': [123.73, 41.3],
                    '克拉玛依': [84.77, 45.59],
                    '渭南': [109.5, 34.52],
                    '马鞍山': [118.48, 31.56],
                    '宝鸡': [107.15, 34.38],
                    '焦作': [113.21, 35.24],
                    '句容': [119.16, 31.95],
                    '北京': [116.46, 39.92],
                    '徐州': [117.2, 34.26],
                    '衡水': [115.72, 37.72],
                    '包头': [110, 40.58],
                    '绵阳': [104.73, 31.48],
                    '乌鲁木齐': [87.68, 43.77],
                    '枣庄': [117.57, 34.86],
                    '杭州': [120.19, 30.26],
                    '淄博': [118.05, 36.78],
                    '鞍山': [122.85, 41.12],
                    '溧阳': [119.48, 31.43],
                    '库尔勒': [86.06, 41.68],
                    '安阳': [114.35, 36.1],
                    '开封': [114.35, 34.79],
                    '济南': [117, 36.65],
                    '德阳': [104.37, 31.13],
                    '温州': [120.65, 28.01],
                    '九江': [115.97, 29.71],
                    '邯郸': [114.47, 36.6],
                    '临安': [119.72, 30.23],
                    '兰州': [103.73, 36.03],
                    '沧州': [116.83, 38.33],
                    '临沂': [118.35, 35.05],
                    '南充': [106.110698, 30.837793],
                    '天津': [117.2, 39.13],
                    '富阳': [119.95, 30.07],
                    '泰安': [117.13, 36.18],
                    '诸暨': [120.23, 29.71],
                    '郑州': [113.65, 34.76],
                    '哈尔滨': [126.63, 45.75],
                    '聊城': [115.97, 36.45],
                    '芜湖': [118.38, 31.33],
                    '唐山': [118.02, 39.63],
                    '平顶山': [113.29, 33.75],
                    '邢台': [114.48, 37.05],
                    '德州': [116.29, 37.45],
                    '济宁': [116.59, 35.38],
                    '荆州': [112.239741, 30.335165],
                    '宜昌': [111.3, 30.7],
                    '义乌': [120.06, 29.32],
                    '丽水': [119.92, 28.45],
                    '洛阳': [112.44, 34.7],
                    '秦皇岛': [119.57, 39.95],
                    '株洲': [113.16, 27.83],
                    '石家庄': [114.48, 38.03],
                    '莱芜': [117.67, 36.19],
                    '常德': [111.69, 29.05],
                    '保定': [115.48, 38.85],
                    '湘潭': [112.91, 27.87],
                    '金华': [119.64, 29.12],
                    '岳阳': [113.09, 29.37],
                    '长沙': [113, 28.21],
                    '衢州': [118.88, 28.97],
                    '廊坊': [116.7, 39.53],
                    '菏泽': [115.480656, 35.23375],
                    '合肥': [117.27, 31.86],
                    '武汉': [114.31, 30.52],
                    '大庆': [125.03, 46.58]
                }
            },



        }
    },
    //全国面积分布图
    {
        vtype: "percentchinamapforarea", defoption: {
            top: 10,
            left: 10,
            width: 1000,
            height: 800,
            viewtype: "percentchinamapforarea",//使用viewtype创建对象;
            viewname: "全国面积分布图",
            viewoption: {
                title: {
                    //text: '订单量',
                    //subtext: '纯属虚构',
                    //x: 'center'
                },
                tooltip: {//提示框组件。
                    trigger: 'item',//数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
                    show: true
                },
                legend: {
                    show: true,
                    orient: 'vertical',   //图例的排列方向  vertical   [建]竖杆; 垂直位置;        horizontal             水平位置; 水平的物体;
                    x: 'left',//图例的位置
                    data: ['订单量']     //位置标签名称
                },

                visualMap: {                 //连接式
                    type: 'continuous',
                    min: 0,
                    max: 5000,
                    text: ['High', 'Low'],
                    realtime: false,
                    calculable: true,
                    color: ['orangered', 'yellow', 'lightskyblue']
                },

                //visualMap: {//颜色的设置  dataRange                   分断式
                //    x: 'left',
                //    y: 'center',
                //    splitList: [
                //        { start: 1500 },
                //        { start: 900, end: 1500 },
                //        { start: 310, end: 1000 },
                //        { start: 200, end: 300 },
                //        { start: 10, end: 200, label: '10 到 200（自定义label）' },
                //        { start: 5, end: 5, label: '5（自定义特殊颜色）', color: 'black' },
                //        { end: 10 }
                //    ],
                //    //            min: 0,
                //    //            max: 2500,
                //    //            calculable : true,//颜色呈条状
                //    text: ['高', '低'],// 文本，默认为数值文本
                //    color: ['#E0022B', '#E09107', '#A3E00B']
                //},
                toolbox: {//工具栏
                    show: true,
                    orient: 'vertical',//工具栏 icon 的布局朝向
                    x: 'right',
                    y: 'center',
                    feature: {//各工具配置项。
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },//数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
                        restore: { show: true },//配置项还原。
                        saveAsImage: { show: true }//保存为图片。
                    }
                },
                roamController: {//控制地图的上下左右放大缩小 图上没有显示
                    show: true,
                    x: 'right',
                    mapTypeControl: {
                        'china': true
                    }
                },
                markPoint: {
                    symbol: 'pin',         // 标注类型
                    symbolSize: 10,        // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                    //symbolRotate : null, // 标注旋转控制
                    itemStyle: {
                        normal: {
                            // color: 各异，
                            // borderColor: 各异,     // 标注边线颜色，优先于color 
                            borderWidth: 2,            // 标注边线线宽，单位px，默认为1
                            label: {
                                show: true,
                                position: 'inside' // 可选为'left'|'right'|'top'|'bottom'
                                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                            }
                        },
                        emphasis: {
                            // color: 各异
                            label: {
                                show: true
                                // position: 'inside'  // 'left'|'right'|'top'|'bottom'
                                // textStyle: null     // 默认使用全局文本样式，详见TEXTSTYLE
                            }
                        }
                    }
                },

                series: [
                    {
                        name: '订单量',
                        type: 'map',
                        mapType: 'china',
                        roam: false,//是否开启鼠标缩放和平移漫游
                        itemStyle: {//地图区域的多边形 图形样式
                            normal: {//是图形在默认状态下的样式
                                label: {
                                    show: true,//是否显示标签
                                    textStyle: {
                                        color: "rgb(249, 249, 249)"
                                    }
                                }
                            },
                            emphasis: {//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                                label: { show: true }

                            }
                        },

                        data: [
                            { name: '北京', value: Math.round(Math.random() * 2000) },
                            { name: '西安', value: Math.round(Math.random() * 2000) },
                            { name: '浙江', value: Math.round(Math.random() * 2000) },
                            { name: '重庆', value: Math.round(Math.random() * 2000) },
                            { name: '河南', value: 0 },

                        ],

                    }
                ]
            },
            viewdata: {
                datafor: "percentchinamapforarea",
                datatype: "json",
                datamappingitem: [],
                datamapping: {},
                datamappingtxt: {},
                datarefresh: {},
                dataapi: { url: '', intervalloading: false, intervalsecond: 1 },
                datajson: [
                    { name: '上海', value: Math.round(Math.random() * 2000) },
                    { name: '北京', value: Math.round(Math.random() * 2000) },
                    { name: '河南', value: Math.round(Math.random() * 2000) },
                    { name: '安徽', value: Math.round(Math.random() * 2000) },
                    { name: '杭州', value: Math.round(Math.random() * 2000) },
                    { name: '西安', value: Math.round(Math.random() * 2000) },
                    { name: '重庆', value: Math.round(Math.random() * 2000) },
                    { name: '江西', value: Math.round(Math.random() * 2000) },
                    { name: '江苏', value: Math.round(Math.random() * 2000) },
                ]
            },

        }
    }
];
