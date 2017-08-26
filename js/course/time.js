define([
    'jquery',
    'text!tpls/courseTimeList.html',
    'template',
    'course/addTime',
    'course/editTime'
], function($, courseTimeListTpl, template, courseAddTime, courseEditTime) {

    return function time(cs_id) {
        $.ajax({
            url: '/api/course/lesson',
            type: 'get',
            data: { 'cs_id': cs_id },
            success: function(res) {
                var courseTimeListStr = template.render(courseTimeListTpl, res.result);
                var $courseTimeListStr = $(courseTimeListStr);

                //给添加课时按钮绑定事件
                $courseTimeListStr.on('click', '.btn-add', function() {
                    // alert('点击了添加课时按钮');
                    var id = $(this).parent().attr('cs_id');
                    courseAddTime(id, function() {
                        time(cs_id);
                    });
                }).on('click', '.btn-edit', function() {
                    // alert('点击了编辑按键');
                    var id = $(this).parent().attr('ct_id');
                    courseEditTime(id, function() {
                        time(cs_id);
                    });
                })

                $(".panel-content .panel-body").html($courseTimeListStr);


            }
        })


    }
});