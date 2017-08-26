/**
 * 入口文件

 */
require.config({
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery-2.1.4", //不能添加.js后缀
        bootstrap: "../assets/bootstrap/js/bootstrap",
        //读取html文件的
        text: "lib/text",
        //配置模板文件夹路径-->以后要访问tpls下面的teacherList.html："tpls/teacherList.html"
        tpls: "../tpls",
        //配置了arttemplate模板引擎的路径
        template: "lib/template-web",
        cookie: "lib/jquery.cookie",
        dateTime: '../assets/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker',
        dateTimeLang: '../assets/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN',
        upload: "../assets/uploadify/jquery.uploadify",
        ueConf: "../assets/ueditor/ueditor.config",
        //ueditor主文件
        ueAll: "../assets/ueditor/ueditor.all",
        ZeroClipboard: "../assets/ueditor/third-party/zeroclipboard/ZeroClipboard",
        echarts: 'lib/echarts.min'
    },
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        dateTimeLang: {
            deps: ['dateTime']
        },
        upload: {
            deps: ['jquery']
        },
        ueAll: {
            deps: ['ueConf']
        }
    }

})


require(["jquery", "teacher/list", 'category/list', 'course/list', 'course/add', 'teacher/personCenter', 'teacher/personImg', 'chart/chart', "bootstrap", "cookie"],

    function($, teacherList, categoryList, courseList, courseAdd, personCenter, personImg, chart) {
        //验证用户有没有登录过?
        var userInfoStr = sessionStorage.getItem("userInfo");
        // var userInfoStr = $.cookie("userInfo");

        //alert(userInfoStr);

        if (!userInfoStr) {
            location.href = "login.html";
            return;
        }

        var userInfo = JSON.parse(userInfoStr); //将JSON字符串转换为json对象(对象字面量)



        //设置用户名和头像
        var tc_name = userInfo.tc_name;
        var tc_avatar = userInfo.tc_avatar;

        $(".profile img").attr("src", tc_avatar);
        $(".profile h4").text(tc_name); //$(".profile h4").html(tc_name);


        // $(".left .list-group").on("click", ".list-group-item", function() {
        $(".left .list-group .list-group-item").click(function() {
            $(this).addClass('active').siblings().removeClass('active');
            //已经实现点击不同菜单都会触发该回调函数
            //-->需求：判断到底是什么样的菜单?-->通过判断菜单的类名
            if ($(this).hasClass("teacher-manager")) {
                // alert("讲师管理")

                teacherList();

            } else if ($(this).hasClass("course-manager")) {
                // alert("课程管理")
                courseList();


            } else if ($(this).hasClass("course-category")) {
                // alert("课程分类")
                categoryList();

                // $(".panel-content .panel-body").html("课程分类")

            } else if ($(this).hasClass("chart")) {
                // alert("图表统计");
                chart();
                // $(".panel-content .panel-body").html("图表统计")

            } else if ($(this).hasClass('course-add')) {
                // $(".panel-content .panel-body").html("添加课程")
                courseAdd();
            }
        });

        //个人中心
        $('.right .personCenter').click(function() {
                // alert('点击了个人中心');
                personCenter();
            })
            //希望页面一刷新的时候，就加载出讲师列表？
            //      -->发现当用户点击了讲师管理菜单才会加载出讲师列表
            //          -->解决方案：模拟用户点击讲师管理菜单
        $(".left .list-group .teacher-manager").trigger("click"); //触发讲师管理菜单的click事件

        //更改用户头像
        $('.left .profile').click(function() {
            // alert('点击了');
            personImg();

        })

        //退出登陆
        $('.right .esc').click(function() {
            // alert('退出登陆');
            $.ajax({
                url: '/api/logout',
                type: 'post',
                success: function(res) {
                    if (res.code == 200) {
                        location.href = 'login.html';
                    }
                }
            })
        })
    })