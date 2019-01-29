﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Dropzone.aspx.cs" Inherits="EohiDataServerApi.Dropzone" %>

<!DOCTYPE html>


<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>文件上传</title>

    <meta name="description" content="invoice page" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <!--Basic Styles-->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/font-awesome.min.css" rel="stylesheet" />
    <link href="assets/css/weather-icons.min.css" rel="stylesheet" />
    <link href="Scripts/Dropzone/dropzone.css" rel="stylesheet" />


    <!--Beyond styles-->
    <link id="beyond-link" href="/assets/css/beyond.min.css" rel="stylesheet" />
    <link href="assets/css/demo.min.css" rel="stylesheet" />
    <link href="assets/css/typicons.min.css" rel="stylesheet" />
    <link href="assets/css/animate.min.css" rel="stylesheet" />

    <script src="assets/js/jquery-2.0.3.min.js"></script>
    <script src="Scripts/Dropzone/dropzone.min.js"></script>
    <script type="text/javascript">
        var myDropzone = null;
        jQuery(function ($) {
            //init dropzone
            try {
                $(".dropzone").dropzone({
                    url: "FileUpLoad.ashx",
                    paramName: "file", // The name that will be used to transfer the file
                    maxFilesize: 2.0, // MB
                    addRemoveLinks: true,
                    uploadMultiple: true,    //允许上传多个照片
                    autoProcessQueue: false,
                    parallelUploads: 100,
                    dictDefaultMessage:
                            '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> 拖入文件</span> 上传 \
                            <span class="smaller-80 grey">(或 点击)</span> <br /> \
                            <i class="upload-icon icon-cloud-upload blue icon-3x"></i>'
                    ,
                    dictResponseError: '文件上传失败!',
                    //change the previewTemplate to use Bootstrap progress bars
                    previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>"
                    , init: function () {
                        var submitButton = document.querySelector("#submit-all")
                        myDropzone = this; // closure
                        //为上传按钮添加点击事件
                        submitButton.addEventListener("click", function () {
                            //手动上传所有图片
                            myDropzone.processQueue();
                        });
                        //当添加图片后的事件，上传按钮恢复可用
                        this.on("addedfile", function () {
                            $("#submit-all").removeAttr("disabled");
                        });
                        //当上传完成后的事件，接受的数据为JSON格式
                        this.on("complete", function (data) {
                            //debugger;

                            if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                                var res = [];// eval('(' + data.xhr.responseText + ')');
                                var reg = new RegExp('\\\n', 'g');
                                var text = data.xhr.responseText.replace(reg, '');
                                res = eval('[' + text + ']')[0];

                                var msg;
                                if (res.Result) {
                                    msg = "恭喜，已成功上传" + res.Count + "个文件！";

                                    //回写;
                                    fileuploadcallback(res);
                                }
                                else {
                                    msg = "上传失败，失败的原因是：" + res.Message;
                                }
                                //$("#message").text(msg);
                                //$("#dialog").dialog("open");
                            }
                        });

                        //删除图片的事件，当上传的图片为空时，使上传按钮不可用状态
                        this.on("removedfile", function () {
                            if (this.getAcceptedFiles().length === 0) {
                                $("#submit-all").attr("disabled", true);
                            }
                        });
                    }
                });
            } catch (e) {
                alert('Dropzone.js does not support older browsers!');
            }
            //get area


            //回写文件路径;
            function fileuploadcallback(data) {
                doCallback(data);
            }

            function doCallback(data) {
                try {


                    var url = window.location.href;
                    //GetUrlPara("callback")
                    //fileuploadcallback
                    var callbackname = url.split("?")[1].split("&")[0].replace("callback=", "");
                    callback = eval("window.parent." + callbackname);
                    if (callback) {
                        callback(data);
                    }
                    //window.parent.document.getElementById(v).value = name;
                    //window.parent.document.getElementById(t).value = id;
                } catch (e) {
                    alert(e.message)
                }
            }

            function deleteFile(obj) {
                var rootnode = obj.parentNode.parentNode;
                if (rootnode)
                    rootnode.removeChild(obj.parentNode);
            }
        });

        function clearfiles() {
            //清空；
            if (myDropzone) {
                myDropzone.removeAllFiles();
            }
        }
        function closefiles() {
            var modalid = GetUrlPara("modalid");
            window.parent.$('#modalid').modal('hide');
        }

        function GetUrlPara(parname) {
         
            var url = document.location.toString();
            var arrUrl = url.split("?");
            var para = arrUrl[parname];
            return para;
        }

    </script>

</head>
<body>
    <!-- 包含头部内容-->
    <div class="modal-footer" style="height: 40px;">
        <!--上传按钮，提供多张图片一次性上传的功能-->
        <a href="#" onclick="clearfiles();return false;" class="btn btn-xs btn-primary">清空</a>
        <button class="btn btn-xs btn-primary" type="submit" id="submit-all" disabled="disabled">开始上传</button>
        <button type="button" class="btn btn-xs  btn-default" data-dismiss="modal" onclick="closefiles();">关闭</button>
    </div>
    <div class="modal-body">
        <div id="dropzone">
            <form action="/DropzoneFileUpload" class="dropzone" enctype="multipart/form-data" id="my-dropzone" method="post">
                <div class="fallback">
                    <input name="file" type="file" multiple="" />
                </div>
            </form>
        </div>
    </div>
    <!-- PAGE CONTENT ENDS -->

</body>

</html>