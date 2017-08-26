define([
    'jquery',
    'text!tpls/courseImg.html',
    'template',
    'upload'
], function($, courseImgTpl, template) {
    return function(cs_id) {
        // alert('点击了图片');
        $.ajax({
            url: '/api/course/picture',
            data: { cs_id: cs_id },
            success: function(res) {
                var courseImg = template.render(courseImgTpl, res.result);
                var $courseImg = $(courseImg);
                $(".right .panel-content .panel-body").html($courseImg);
                //上传文件插件
                $("#uploadFile").uploadify({

                    auto: true, //选择文件之后是否自动上传        true自动上传

                    //        buttonImage:"../imgs/pic.jpg",

                    //        checkExisting:true,//选择一个文件的时候，检测上传队列中是否有相同的文件,如果相同会有提示

                    fileObjName: "cs_cover_original", //：等同于file标签的name值

                    fileTypeExts: "*.jpg; *.png; *.gif",
                    buttonText: "选择图片",
                    formData: {
                        cs_id: cs_id
                    }, //用于表单提交的额外数据

                    itemTemplate: "<span></span>", //上传模板

                    // height: 198,
                    swf: '../assets/uploadify/uploadify.swf', //swf文件的地址
                    uploader: '/api/uploader/cover', //服务器中处理上传请求的地址
                    // width: 195,
                    onUploadSuccess: function(file, data, response) {
                        console.log(file);
                        console.log(data);
                        console.log(response);

                        $(".left .list-group .course-manager").trigger("click");
                    }
                });
            }
        })
    }

});