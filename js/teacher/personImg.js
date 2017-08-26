define([
    'jquery',
    'text!tpls/personImg.html'
], function($, personImgTpl) {
    return function() {

        var $personImgTpl = $(personImgTpl);
        $('#personImgModal').remove();
        $personImgTpl.appendTo('body').modal();


        $("#uploadPersonImg").uploadify({

            auto: true, //选择文件之后是否自动上传        true自动上传

            //        buttonImage:"../imgs/pic.jpg",

            //        checkExisting:true,//选择一个文件的时候，检测上传队列中是否有相同的文件,如果相同会有提示

            fileObjName: "tc_avatar", //：等同于file标签的name值

            fileTypeExts: "*.jpg; *.png; *.gif",
            buttonText: "选择图片",

            // itemTemplate: "<span></span>", //上传模板

            // height: 198,
            swf: '../assets/uploadify/uploadify.swf', //swf文件的地址
            uploader: '/api/uploader/avatar', //服务器中处理上传请求的地址
            // width: 195,
            onUploadSuccess: function(file, data, response) {
                // console.log(file);
                // console.log(data);
                // console.log(response);

                var userNamePass = sessionStorage.getItem('userNamePass');
                // alert(userNamePass);
                $.ajax({
                    url: '/api/login',
                    tpye: 'post',
                    data: userNamePass,
                    success: function(res) {
                        console.log(res);
                        var userInfoStr = JSON.stringify(res.result); //将一个对象序列化为JSON字符串格式
                        sessionStorage.setItem("userInfo", userInfoStr);
                        $(".left .profile img").attr("src", res.result.tc_avatar);
                        $('#personImgModal').modal('hide');
                        // location.reload();
                    },
                    error: function(res) {
                        alert('出错了');
                    }
                })


            }
        });
    }
});