define([
    'jquery',
    'text!tpls/personCenter.html',
    'template',
    'ueAll'
], function($, personCenterTpl, template) {
    return function() {
        // alert('加载了个人中心');
        $.ajax({
            url: '/api/teacher/profile',
            success: function(res) {
                var personCenterStr = template.render(personCenterTpl, res.result);
                $personCenter = $(personCenterStr);
                $('#personCenterModal').remove();
                $personCenter.appendTo('body').modal();
                //日期控件 .personDateTime
                $('.personDateTime').datetimepicker({
                    //参数/选项/配置
                    format: 'yyyy-mm-dd',
                    language: "zh-CN",
                    weekStart: "1", //从周几开始
                    //startDate：可以选择的最早的时间
                    //endDate：可以选择的最晚的时间
                    // daysOfWeekDisabled: [6, 0], //周几不能选中
                    autoclose: true, //选定一个日期之后就自动隐藏日期控件
                    //startView:"year"      //打开日期控件立马就看到的视图，如果是月，看到月拥有多少天，如果是年，看到1年12月
                    minView: "month", //如果是月，最小能够精确到哪一天，如果是天，最小能够精确到哪一个小时
                    todayBtn: true,
                    todayHighlight: true,
                    pickerPosition: "top-right"
                });

                //上传控件

                $("#personUpload").uploadify({

                    auto: true, //选择文件之后是否自动上传        true自动上传

                    //        buttonImage:"../imgs/pic.jpg",

                    //        checkExisting:true,//选择一个文件的时候，检测上传队列中是否有相同的文件,如果相同会有提示

                    fileObjName: "tc_avatar", //：等同于file标签的name值

                    fileTypeExts: "*.jpg; *.png; *.gif",
                    buttonText: "更换头像",

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
                                // $("#personCenterModal .personCenterImg").attr("src", res.result.tc_avatar);
                                $('#personImgModal').modal('hide');
                                location.reload();
                            },
                            error: function(res) {
                                alert('出错了');
                            }
                        })


                    }
                });
                //富文本
                UE.delEditor('personContainer'); //注意 解决 第二次点击时富文本 没有出现的bug
                var ue = UE.getEditor('personContainer'); //"container"也就对应了id为"container"的script标签

                ue.ready(function() {
                    //设置编辑器内容
                    ue.setContent(res.result.tc_introduce);

                })

                //绑定提交事件
                $personCenter.on('submit', 'form', function() {
                    // alert('提交了');
                    $.ajax({
                        url: '/api/teacher/modify',
                        type: 'post',
                        data: $(this).serialize(),
                        success: function(res) {
                            $('#personCenterModal').modal('hide');
                            location.reload();
                        }
                    })
                    return false;
                })
            }
        })
    }

});