/**
 * 讲师列表模块
 * Author:Wilbert
 *   Date:2017/8/17
 */
define(["jquery", "text!tpls/teacherList.html", "template", "teacher/show", "teacher/add", 'teacher/edit'], function($, teacherListTpl, template, teacherShow, teacherAdd, teacherEdit) {
    //正常情况下，如果能够读取到该模板，那么同样的可以通过依赖注入（形参）获取模板内容：字符串格式

    // var html=template.render("hi,{{value}}",{value:100});
    // console.log(html);//"hi,100"

    return function() {
        //以后博学谷项目除了登录页面的2个接口可以直接访问之外，其他接口都必须要先登录才能访问(服务器端的限制)
        $.ajax({
            url: "/api/teacher",
            type: "get",
            success: function(res) {
                //res.result：返回的讲师的相关数据

                // console.log(res.result);

                //把数据放在表格中-->模板引擎arttemplate
                var teacherList = template.render(teacherListTpl, res);


                var $teacherList = $(teacherList).on("click", ".btn-show", function() {
                    var tc_id = $(this).parent().attr("tc_id");
                    teacherShow(tc_id);
                }).on("click", ".btn-add", function() {
                    teacherAdd();
                }).on('click', '.btn-edit', function() {
                    // console.log('编辑')
                    var tc_id = $(this).parent().attr("tc_id");
                    teacherEdit(tc_id);
                }).on('click', '.btn-status', function() {
                    var $btnStatus = $(this);
                    // console.log('启用或注销');
                    $.ajax({
                        url: '/api/teacher/handle',
                        type: 'post',
                        data: {
                            tc_id: $btnStatus.parent().attr('tc_id'),
                            tc_status: $btnStatus.parent().attr('tc_status')
                        },
                        success: function(data) {
                            // console.log(data);
                            $btnStatus.text(data.result.tc_status == 0 ? '注销' : '启用');
                            $btnStatus.parent().siblings('.status').text(data.result.tc_status == 1 ? '注销' : '启用');
                            $btnStatus.parent().attr('tc_status', data.result.tc_status);
                        }
                    })
                });

                //把存有真实数据的表格放到页面中
                $(".panel-content .panel-body").html($teacherList); // 以上代码等同于：$(".panel-content .panel-body").empty().append($teacherList);
            }
        })


    }
})