/* global $, visoConfig, Mustache, uuid, jsPlumb, graphlib */

(function () {
    var root = {}
    //全局
    flowchart_id = '00000';
    node_attr_data = [];//节点附加信息;

    window.IVR = root;

    root.emit = function (event) {
        console.log(event)
    }

    var flowitemsdata = {};
    var area = 'drop-bg'
    var areaId = '#' + area
    var fixedNodeId = {
        begin: 'begin-node',
        end: 'end-node'
    }

    jsPlumb.ready(main)
    jsPlumb.importDefaults({
        ConnectionsDetachable: false
    })

    // 放入拖动节点
    function dropNode(template, position,label) {
        position.left -= $('#side-buttons').outerWidth();
        position.id = uuid.v1();
        position.generateId = uuid.v1;
        if (label == undefined)
            label = "未命名";
        else
            position.name = label;


        //判断类型;
        //分支节点，默认添加是\否2个分支
        if (template === 'tpl-switch') {
            position.switchitems = [];
            position.switchitems.push({ switchid: NewGuid(), switchname: '是' });
            position.switchitems.push({ switchid: NewGuid(), switchname: '否' });
        }
        var html = renderHtml(template, position)

        $(areaId).append(html);

        initSetNode(template, position.id)


        //为节点添加右键菜单;
        context.attach('#' + position.id, test_menu);

        
       
    }

    // 初始化节点设置
    function initSetNode(template, id) {
        //允许拖动
        addDraggable(id)
        if (template === 'tpl-start') {
            initBeginNode(id);


            initNodeAttrData_bengend(id,'开始');

        }
        if (template === 'tpl-end') {
            initEndNode(id);

            initNodeAttrData_bengend(id,'结束');
        }

        if (template === 'tpl-approve') {
            setEnterPoint(id);
            setExitPoint(id);

            //节点添加默认附加数据项;
            initNodeAttrData_apporve(id);
        }
        else if (template === 'tpl-process') {
            setEnterPoint(id)
            setExitPoint(id)

            //
            initNodeAttrData_bengend(id,'流程处理');
        }
        else if (template === 'tpl-switch') {
            //setEnterPoint(id + '-heading');
            setEnterPoint(id )
            setExitMenuItem(id);
            //节点添加默认附加数据项;
            initNodeAttrData_switch(id);
        }

    }

    //节点添加默认附加数据项;
    function initNodeAttrData_bengend(nodeid,defnodename) {
        var data = node_attr_data[nodeid];
        if (data == undefined) {
            data = {};
            data.nodeid = nodeid;
        }
        data.nodeid = nodeid;
        data.label = defnodename;//"开始";
        data.remark = "";

        //默认的审批项;
        data.approveitems = [];
        //默认的审批人;
        data.operatorscript = "";
        //路由项
        data.switchitems = [];
        //路由计算规则;
        data.switchscript = "";

        //启动条件
        data.flowscript = "";

        //流程角本
        data.processscript = "";

        data.approvalnotescript = "";

        node_attr_data[nodeid] = data;

    }

    //设置节点默认附加数据
    function initNodeAttrData_apporve(nodeid) {
        var data = node_attr_data[nodeid];
        if (data == undefined) {
            data = {};
            data.nodeid = nodeid;
        }
        data.nodeid = nodeid;
        data.label = "审批";
        data.remark = "";

        //默认的审批项;
        data.approveitems = [];
        data.approveitems.push({ approveid: NewGuid(), approvename: '同意', approvetype: "下一步", approvenote: "", approvescript: "" });
        data.approveitems.push({ approveid: NewGuid(), approvename: '不同意', approvetype: "终止", approvenote: "", approvescript: "" });
        data.approveitems.push({ approveid: NewGuid(), approvename: '驳回上级', approvetype: "返回上一级", approvenote: "", approvescript: "" });
        data.approveitems.push({ approveid: NewGuid(), approvename: '驳回至发起人', approvetype: "返回起点", approvenote: "", approvescript: "" });

        //默认的审批人;
        //data.operatortype = "";//提交人定义;
        data.operatorscript = "";
        //路由项
        data.switchitems = [];
        //路由计算规则;
        data.switchscript = "";
        //启动条件 
        data.flowscript = "";
        //
        data.processscript = "";

        data.approvalnotescript = "";

        node_attr_data[nodeid] = data;

    }

    //设置节点默认附加数据
    function initNodeAttrData_switch(nodeid) {
        var data = node_attr_data[nodeid];
        if (data == undefined) {
            data = {};
            data.nodeid = nodeid;
        }
        data.nodeid = nodeid;
        data.label = "分支节点";
        data.remark = "";

        //默认的审批项;
        data.approveitems = [];
        //默认的审批人;
        data.operatorscript = "";

        //路由项
        data.switchitems = [];
        data.switchitems.push({ switchid: NewGuid(), switchname: '是', switchnote: "" });
        data.switchitems.push({ switchid: NewGuid(), switchname: '否', switchnote: "" });
        //路由计算规则;
        data.switchscript = "";

        //启动条件 
        data.flowscript = "";
        //
        data.processscript = "";

        data.approvalnotescript = "";

        node_attr_data[nodeid] = data;
    }


    // 设置入口点
    function setEnterPoint(id) {
        var config = getBaseNodeConfig()

        config.isSource = false
        config.maxConnections = -1

        jsPlumb.addEndpoint(id, {
            anchors: 'Top',
            uuid: id + '-in'
        }, config)
    }

    // 设置出口点
    function setExitPoint(id, position) {
        var config = getBaseNodeConfig()

        config.isTarget = false
        config.maxConnections = 1

        jsPlumb.addEndpoint(id, {
            anchors: position || 'Bottom',
            uuid: id + '-out'
        }, config)
    }

    function setExitMenuItem(id) {
        //设置逐项出口;
        $('#' + id).find('li').each(function (key, value) {
            setExitPoint(value.id, 'Right')
        })
    }

    // 删除一个节点以及
    function emptyNode(id) {
        jsPlumb.remove(id)
    }

    // 让元素可拖动
    function addDraggable(id) {
        jsPlumb.draggable(id, {
            containment: 'parent'
        })
    }

    // 渲染html
    function renderHtml(type, position) {
        return Mustache.render($('#' + type).html(), position)
    }

    function eventHandler(data) {
        if (data.type === 'deleteNode') {
            emptyNode(data.id)
        }
    }

    // 主要入口
    function main() {
        jsPlumb.setContainer('diagramContainer')

        $('.btn-controler').draggable({
            helper: 'clone',
            scope: 'ss'
        })

        $(areaId).droppable({
            scope: 'ss',
            drop: function (event, ui) {
                dropNode(ui.draggable[0].dataset.template, ui.position, ui.draggable[0].dataset.defualtlable)
            }
        })

        //div app click;
        $('#app').on('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            eventHandler(event.target.dataset);
        })

        // 单点击了连接线上的X号
        jsPlumb.bind('dblclick', function (conn, originalEvent) {
            DataDraw.deleteLine(conn)
        })

        // 当链接建立
        jsPlumb.bind('beforeDrop', function (info) {
            return connectionBeforeDropCheck(info)
        })

        // 让退出节点可拖动
        // addDraggable(fixedNodeId.end)
        // initBeginNode()
        // initEndNode()

        //----------------------------------------------
        //获取数据;
        //var flowchart_id = "00000";
        //获取nodeid 对应的数据信息;
        flowchart_id = GetRequest()["flowchart_id"];
        if (flowchart_id == undefined) {
            //创建 flowchart_id
            flowchart_id = NewGuid();
        }
        
        //获取所有连线
        $.ajax({
            type: 'POST',
            async:false,
            url: "/WF/Data/getLines?flowchart_id="+flowchart_id,
            success: function (result) {
               
                flowitemsdata.lines = result.data;
            },
            error: function (d) {
            }
        });
        //获取所有节点/
        $.ajax({
            type: 'POST',
            async:false,
            url: "/WF/Data/getNodes?flowchart_id=" + flowchart_id,
            success: function (result) {
                debugger;
                flowitemsdata.nodes = result.data;
            },
            error: function (d) {
            }
        });

        //获取所有节点-审批项
        $.ajax({
            type: 'POST',
            async: false,
            url: "/WF/Data/getNodesApprove?flowchart_id=" + flowchart_id,
            success: function (result) {
                flowitemsdata.nodesapprove = result.data;
            },
            error: function (d) {
            }
        });


        //获取所有节点-分支项
        $.ajax({
            type: 'POST',
            async: false,
            url: "/WF/Data/getNodesSwitch?flowchart_id=" + flowchart_id,
            success: function (result) {
                flowitemsdata.nodesswitch = result.data;
            },
            error: function (d) {
            }
        });


        //组装流程数据;
        for (var a = 0; a < flowitemsdata.nodes.length; a++) {

            var data = {};
            data.nodeid = flowitemsdata.nodes[a].node_id;
            data.remark = flowitemsdata.nodes[a].remark;
            data.label = flowitemsdata.nodes[a].label;


            //默认的审批项;
            data.approveitems = [];
            //默认的审批人;
            data.operatorscript = flowitemsdata.nodes[a].operatorscript;
            //路由项
            data.switchitems = [];
            //路由计算规则;
            data.switchscript = flowitemsdata.nodes[a].switchscript;
            //启动条件
            data.flowscript = flowitemsdata.nodes[a].flowscript;
            //流程角本
            data.processscript = flowitemsdata.nodes[a].processscript;

            data.approvalnotescript = flowitemsdata.nodes[a].approvalnotescript;
            //组装审批项；
            for (var b = 0; b < flowitemsdata.nodesapprove.length; b++) {
                if (flowitemsdata.nodesapprove[b].node_id == data.nodeid) {
                    data.approveitems.push(
                        {
                            approveid: flowitemsdata.nodesapprove[b].approveid,
                            approvename: flowitemsdata.nodesapprove[b].approvename,
                            approvetype: flowitemsdata.nodesapprove[b].approvetype,
                            approvenote: flowitemsdata.nodesapprove[b].approvenote,
                            approvescript: flowitemsdata.nodesapprove[b].approvescript
                        });
                }
            }


            //组装分支项；
            for (var b = 0; b < flowitemsdata.nodesswitch.length; b++) {
                if (flowitemsdata.nodesswitch[b].node_id == data.nodeid) {
                    data.switchitems.push(
                        {
                            switchid: flowitemsdata.nodesswitch[b].switchid,
                            switchname: flowitemsdata.nodesswitch[b].switchname,
                            switchnote: flowitemsdata.nodesswitch[b].switchnote
                        });
                }
            }

            node_attr_data[data.nodeid] = data;
        }



        // DataProcess.inputData(data.nodeList)
        debugger;
        if (flowitemsdata != undefined) {
            DataDraw.draw(flowitemsdata);
        }
    }


    
    
    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串   
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    function NewGuid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    // 链接建立后的检查
    // 当出现自连接的情况后，要将链接断开
    function connectionBeforeDropCheck(info) {
        if (!info.connection.source.dataset.pid) {
            return true
        }
        return info.connection.source.dataset.pid !== info.connection.target.dataset.id
    }

    // 获取基本配置
    function getBaseNodeConfig() {
        return Object.assign({}, visoConfig.baseStyle)
    }


    DataSave = function () {
        debugger;
        var connects = [];//存储连线的数组
        var nodes = [];//存储元素的数组
        $.each(jsPlumb.getAllConnections(), function (idx, connection) {
            //debugger;
            /*
            connects.push({
                ConnectionId: connection.id,
                start: $(connection.source).attr("data-index"),
                end: $(connection.target).attr("data-index"),
                originSign: $(connection.source).attr("data-sign"),
                destinationSign: $(connection.target).attr("data-sign"),
            });
            */
            var line = {};
            line.flowchart_id = flowchart_id;
            line.line_id = connection.id;


            line.node_id = connection.sourceId;//出发节点
            //判断类型;
            //对switch节点做特殊处理，node_id向上查找至根节点
            var itemtype = $(connection.source).attr("data-type");
            if (itemtype != undefined && itemtype == "switch-item") {
                line.node_id = $(connection.source).attr("data-pid");//出发节点
            }


            line.next_node_id = connection.targetId;//目标节点
            line.sourcepoint = connection.endpoints[0].getUuid();//连接点1的uuid
            line.targetpoint = connection.endpoints[1].getUuid();//连接点2的uuid
            line.label = "";
            connects.push(line);
        });

        //找到所有节点;
        $("#drop-bg .pa").each(function (idx,item) {
            /*
            mainArr.push({
                offset: $(this).position(),
                text: $(this).text(),
                index: $(this).attr("data-index"),
                sign: $(this).attr("data-sign"),
            });
            */
            var node_id = $(item).attr("id");
            //jsPlumb.getEndpoints(node_id)[0].getUuid()
            //jsPlumb.getEndpoints("Announce")[0].isSource
            //jsPlumb.getEndpoints("Announce")[0].isTarget
            //获取元素关联的连接点
            var points = jsPlumb.getEndpoints(node_id);
            //判断节点类型;
            var nodetype = $(item).attr("data-type");

            //
            var sourcepoints = "";//节点的出点，用逗号分隔
            var targetpoints = "";//节点的入点，用逗号分隔
            
            
            if (nodetype == "start") {
                //jsPlumb.getEndpoint(node_id + "-out");
                //sourcepoints.push({});
                sourcepoints = node_id + "-out";
            }
            else if (nodetype == "end") {
                //jsPlumb.getEndpoint(node_id + "-in");
                //sourcepoints.push({});
                targetpoints = node_id + "-in";
            }
            else if (nodetype == "approve") {

                sourcepoints = node_id + "-out";
                targetpoints = node_id + "-in";
            }
            else if (nodetype == "process") {
                sourcepoints = node_id + "-out";
                targetpoints = node_id + "-in";
            }
            else if (nodetype == "switch") {
                //targetpoints = node_id + "-heading-in";
                targetpoints = node_id + "-in";
                sourcepoints="";
                //获取子元素;
                $("#" + node_id + " li").each(function (liindex, liitem) {
                    if (sourcepoints.length > 0)
                        sourcepoints += ";";

                    sourcepoints += $(liitem).attr("id") + "-out";
                });

            }
            else {
                //
            }
            var node = {};
            node.flowchart_id = flowchart_id;
            node.node_id = $(this).attr("id");
            node.nodetype = nodetype;
            node.remark = "";
            if (node_attr_data && node_attr_data[node.node_id])
                node.remark = node_attr_data[node.node_id].remark;
            node.sourcepoints = sourcepoints;//节点的出点，用逗号分隔
            node.targetpoints = targetpoints;//节点的入点，用逗号分隔
            node.label = $(this).attr("data-label");
            node.style ="";//节点的入点，用逗号分隔'
            node.x =parseInt( $(item).position().left);
            node.y =parseInt( $(item).position().top);
            node.operatorscript = node_attr_data[node.node_id].operatorscript;
            node.switchscript = node_attr_data[node.node_id].switchscript;
            node.flowscript = node_attr_data[node.node_id].flowscript;
            node.approvalnotescript = node_attr_data[node.node_id].approvalnotescript;
            nodes.push(node);

        });
        //console.log(connects);
        //console.log(nodes);

        //return;
        //sessionStorage.setItem("flowsheet", JSON.stringify({ "connects": connects, "mainArr": mainArr }));

        //保存数据;
        //弹出等待提示框;

       
        //$.iMessager.progress();
        //清除现有数据;
        $.ajax({
            type: 'POST',
            async: false,
            url: "/WF/Data/clearChart",
            data: {
                "flowchart_id": flowchart_id,
            },
            success: function (data) {
                if ( data.access) {
                } else {
                }
            },
            error: function (data) {
            }
        });

        for (var a = 0; a < connects.length; a++) {
            //提交;
            $.ajax({
                type: 'POST',
                async: false,
                url: "/WF/Data/saveLine",
                data: {
                    "flowchart_id": connects[a].flowchart_id,
                    "line_id": connects[a].line_id,
                    "node_id": connects[a].node_id,
                    "next_node_id": connects[a].next_node_id,
                    "sourcepoint": connects[a].sourcepoint,//连接点1的uuid
                    "targetpoint": connects[a].targetpoint,//连接点2的uuid
                    "label": connects[a].label,
                    "style": connects[a].source
                },
                success: function (data) {
                    
                    if (data.access) {

                    } else {
                    }
                },
                error: function (data) {
                }
            });
        }
      
        for (var a = 0; a < nodes.length; a++) {
            //提交;
            $.ajax({
                type: 'POST',
                async: false,
                url: "/WF/Data/saveNode",
                data: {
                    "flowchart_id": nodes[a].flowchart_id,
                    "node_id": nodes[a].node_id,
                    "nodetype": nodes[a].nodetype,
                    "remark": "",
                    "sourcepoints": nodes[a].sourcepoints,//节点的出点，用逗号分隔
                    "targetpoints": nodes[a].targetpoints,//节点的入点，用逗号分隔
                    "label": nodes[a].label,
                    "style": nodes[a].style,
                    "x": nodes[a].x,
                    "y": nodes[a].y,
                    "operatorscript": nodes[a].operatorscript,
                    "switchscript": nodes[a].switchscript,
                    "flowscript": nodes[a].flowscript,
                    "approvalnotescript": nodes[a].approvalnotescript
                },
                success: function (data) {
                    if (data.access) {
                        //保存审批项;
                        saveNodeApproveItem(nodes[a].node_id);
                        //保存分支项
                        saveNodeSwitchItem(nodes[a].node_id);
                    } else {

                    }
                }
                ,
                error: function (data) {
                }
            });
        }
       
    }
    function saveNodeApproveItem(node_id) {
        if (node_attr_data == undefined || node_attr_data[node_id] == undefined)
            return;
        if (node_attr_data[node_id].approveitems.length <= 0)
            return;

        for (var a = 0 ; a< node_attr_data[node_id].approveitems.length; a++) {
            var approveitem = node_attr_data[node_id].approveitems[a];
            //保存
            $.ajax({
                type: 'POST',
                async: false,
                url: "/WF/Data/saveNodeApproveItem",
                data: {
                    "flowchart_id": flowchart_id,
                    "node_id": node_id,
                    "approveid": approveitem.approveid,
                    "approvename": approveitem.approvename,
                    "approvetype": approveitem.approvetype,
                    "approvenote": approveitem.approvenote,
                    "approvescript": approveitem.approvescript
                },
                success: function (data) {
                    if ('true' == data.access) {
                       
                    } else {

                    }
                }
                ,
                error: function (data) {
                }
            });
        }
        
    }
    function saveNodeSwitchItem(node_id) {
        if (node_attr_data == undefined || node_attr_data[node_id] == undefined)
            return;
        if (node_attr_data[node_id].switchitems.length <= 0)
            return;

        for (var a = 0 ; a < node_attr_data[node_id].switchitems.length; a++) {
            var switchitem= node_attr_data[node_id].switchitems[a];
            //保存
            $.ajax({
                type: 'POST',
                async: false,
                url: "/WF/Data/saveNodeSwitchItem",
                data: {
                    "flowchart_id": flowchart_id,
                    "node_id": node_id,
                    "switchid": switchitem.switchid,
                    "switchname": switchitem.switchname,
                    "switchnote": switchitem.switchnote
                },
                success: function (data) {
                    if ('true' == data.access) {


                        //保存审批项;
                        saveNodeApproveItem(nodes[a].node_id);
                        //保存分支项
                        saveNodeSwitchItem(nodes[a].node_id);
                    } else {

                    }
                }
              ,
                error: function (data) {
                }
            });
        }
    }

    // 删除一个节点
    DeleteNode = function (id) {
        jsPlumb.remove(id);
    }
    /* */

    // 初始化开始节点属性
    function initBeginNode(id) {
        var config = getBaseNodeConfig()

        config.isTarget = false
        config.maxConnections = 1

        jsPlumb.addEndpoint(id, {
            anchors: 'Bottom',
            uuid: id + '-out'
        }, config)
    }

    // 初始化结束节点属性
    function initEndNode(id) {
        var config = getBaseNodeConfig()

        config.isSource = false

        jsPlumb.addEndpoint(id, {
            anchors: 'Top',
            uuid: id + '-in'
        }, config)
    }

    var DataProcess = {
        inputData: function (nodes) {
            var ids = this.getNodeIds(nodes)
            var g = new graphlib.Graph()

            ids.forEach(function (id) {
                g.setNode(id)
            })

            var me = this

            nodes.forEach(function (item) {
                if (me['dealNode' + item.type]) {
                    me['dealNode' + item.type](g, item)
                } else {
                    console.error('have no deal node of ' + item.type)
                }
            })

            //console.log(g.nodes())
            var distance = graphlib.alg.dijkstra(g, 'Start')

            return this.generateDepth(distance)
        },
        setNodesPosition: function (nodes) {
            var me = this
            nodes.forEach(function (item) {
                me.getNodePosition(item)
            })
        },
        getNodePosition: function (node) {
            var $node = document.getElementById(node.id)
            node.top = parseInt($node.style.top)
            node.left = parseInt($node.style.left)
        },
        generateDepth: function (deep) {
            var depth = []

            Object.keys(deep).forEach(function (key) {
                var distance = deep[key].distance

                if (!depth[distance]) {
                    depth[distance] = []
                }

                depth[distance].push(key)
            })

            return depth
        },
        getNodeIds: function (nodes) {
            return nodes.map(function (item) {
                return item.id
            })
        },
        dealNodestart: function (g, node) {
            this.setEdge(g, node.id, node.data.nextNode)
        },
        dealNodeend: function (g, node) {
            this.setEdge(g, node.id, node.data.nextNode)
        },
        dealNodeapprove: function (g, node) {
            this.setEdge(g, node.id, node.data.nextNode)
        },
        dealNodeprocess: function (g, node) {
            this.setEdge(g, node.id, node.data.nextNode)
        },
        dealNodeswitch: function (g, node) {
            this.setEdge(g, node.id, node.data.nextNode)
        },

        dealNodeRoot: function (g, node) {
            this.setEdge(g, node.id, node.data.nextNode)
        },
        dealNodeAnnounce: function (g, node) {
            this.setEdge(g, node.id, node.data.nextNode)
        },
        dealNodeExit: function (g, node) {

        },
        dealNodeWorkTime: function (g, node) {
            this.setEdge(g, node.id, node.data.onWorkNode)
            this.setEdge(g, node.id, node.data.offWorkNode)
        },
        dealNodeMenu: function (g, node) {
            this.setEdge(g, node.id, node.data.nextNode)
        },
        setEdge: function name(g, from, to) {
            console.log(from + ' ---> ' + to)
            g.setEdge(from, to)
        }
    }

    var DataDraw = {
        deleteLine: function (conn) {
            if (confirm('确定删除所点击的链接吗？')) {
                jsPlumb.detach(conn)
            }
        },
        draw: function (cdata) {
            var nodes = cdata.nodes;

            // 将Exit节点排到最后
            nodes.sort(function (a, b) {
                if (a.type === 'end') return 1
                if (b.type === 'end') return -1
                return 0
            })
            console.log("draw")

            //???
            //this.computeXY(nodes)

            // var template = $('#tpl-demo').html()
            var $container = $(areaId)
            var me = this

            nodes.forEach(function (item, key) {
                console.log(item)
                //console.log(typeof key)

                //
                item.id = item.node_id;
                item.type = item.nodetype;
                item.top = item.y;
                item.left = item.x;
               


                var data = {
                    id: item.id,
                    name: item.label,
                    top: item.top,
                    left: item.left,
                    switchitems: []
                    //choices: item.data.choices || []
                }
                //判断，如果是分支节点;
                if (item.type == "switch") {
                    //
                    if (node_attr_data[item.id] != undefined && node_attr_data[item.id].switchitems.length > 0) {
                        for (var mm = 0; mm < node_attr_data[item.id].switchitems.length; mm++) {
                            var switchitem = node_attr_data[item.id].switchitems[mm];
                            
                            data.switchitems.push({ switchid: switchitem.switchid, switchname: switchitem.switchname });
                        }
                    }

                    item.switchitems = data.switchitems;
                }


                //console.log(data)
                var template = me.getTemplate(item)
                //console.log(template)

                $container.append(Mustache.render(template, data))

                //右键菜单;
                context.attach('#' + data.id, test_menu);
                debugger;
                if (me['addEndpointOf' + item.type]) {
                    me['addEndpointOf' + item.type](item)
                }
            })

            //连接线;
            this.mainConnect(cdata.lines)
        },
        connectEndpoint: function (from, to) {
            jsPlumb.connect({ uuids: [from, to] })
        },
        mainConnect: function (lines) {
           
            var me = this;
            lines.forEach(function (item) {
               
                me.connectEndpoint(item.sourcepoint, item.targetpoint);
            })

        },
        getTemplate: function (node) {
            return $('#tpl-' + node.type).html() || $('#tpl-demo').html()
        },
        computeXY: function (nodes) {
            var matrix = DataProcess.inputData(nodes)

            var base = {
                topBase: 50,
                topStep: 150,
                leftBase: 150,
                leftStep: 200
            }

            for (var i = 0; i < matrix.length; i++) {
                for (var j = 0; j < matrix[i].length; j++) {
                    var key = matrix[i][j]

                    var dest = nodes.find(function (item) {
                        return item.id === key
                    })

                    dest.top = dest.top || base.topBase + i * base.topStep
                    dest.left = dest.left || base.leftBase + j * base.leftStep
                }
            }
        },
        addEndpointOfRoot: function (node) {
            addDraggable(node.id)
            initBeginNode(node.id)
        },
        addEndpointOfstart: function (node) {
            addDraggable(node.id)
            initBeginNode(node.id)
        },
        connectEndpointOfRoot: function (node) {
            this.connectEndpoint(node.id + '-out', node.data.nextNode + '-in')
        },
        addEndpointOfend: function (node) {
            addDraggable(node.id)
            initEndNode(node.id)
        },
        addEndpointOfExit: function (node) {
            addDraggable(node.id)
            initEndNode(node.id)
        },
        addEndpointOfAnnounce: function (node) {
            addDraggable(node.id)
            setEnterPoint(node.id)
            setExitPoint(node.id)
        },
        addEndpointOfapprove: function (node) {
            addDraggable(node.id)
            setEnterPoint(node.id)
            setExitPoint(node.id)
        },
        addEndpointOfprocess: function (node) {
            addDraggable(node.id)
            setEnterPoint(node.id)
            setExitPoint(node.id)
        },
        addEndpointOfWorkTime: function (node) {
            addDraggable(node.id)
            setEnterPoint(node.id)

            var ids = ['onWorkTime', 'offWorkTime']

            ids.forEach(function (key) {
                setExitPoint(node.id + '-' + key, 'Right')
            })
        },
        connectEndpointOfWorkTime: function (node) {
            this.connectEndpoint(node.id + '-onWorkTime-out', node.data.onWorkNode + '-in')
            this.connectEndpoint(node.id + '-offWorkTime-out', node.data.offWorkNode + '-in')
        },
        addEndpointOfMenu: function (node) {
            addDraggable(node.id)
            setEnterPoint(node.id)

            var ids = ['noinput', 'nomatch']

            node.data.choices.forEach(function (item) {
                ids.push('key-' + item.key)
            })

            ids.forEach(function (key) {
                setExitPoint(node.id + '-' + key, 'Right')
            })
        },
        addEndpointOfswitch: function (node) {
            
            addDraggable(node.id)
            setEnterPoint(node.id)
            var ids = []
            node.switchitems.forEach(function (item) {
                ids.push(item.switchid)
            })

            ids.forEach(function (key) {
                setExitPoint( key, 'Right')
            })
        },
        connectEndpointOfMenu: function (node) {
            this.connectEndpoint(node.id + '-noinput-out', node.data.noinput.nextNode + '-in')
            this.connectEndpoint(node.id + '-nomatch-out', node.data.nomatch.nextNode + '-in')

            var me = this

            node.data.choices.forEach(function (item) {
                me.connectEndpoint(node.id + '-key-' + item.key + '-out', item.nextNode + '-in')
            })
        }
    }

    root.DataProcess = DataProcess;
    root.DataDraw = DataDraw;
    root.DataSave = DataSave;
    root.DeleteNode = DeleteNode;
})()
