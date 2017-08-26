define([
    'jquery',
    'text!tpls/teacherEdit.html',
    'template',
    'dateTime',
    'dateTimeLang'
], function($, teacherEditTpl, template) {
    return function(id) {
        $.ajax({
            url: '/api/teacher/edit',
            type: 'get',
            data: { tc_id: id },
            success: function(data) {
                if (data.code != 200) { return console.log(data.msg) }
                // console.log('编辑讲师')
                var teacherEditStr = template.render(teacherEditTpl, data.result);
                // console.log(typeof(teacherEditStr));  string
                $('#teacherEditModal').remove();
                var $teacherEditStr = $(teacherEditStr).appendTo('body').on('submit', 'form', function() {
                    console.log('提交了')
                    $.ajax({
                        url: '/api/teacher/update',
                        type: 'post',
                        data: $(this).serialize(),
                        success: function(data) {
                            console.log(data)
                            $teacherEditStr.modal('hide');
                            $(".left .list-group .teacher-manager").trigger("click");
                        }

                    })
                    return false;
                }).modal();

                //加载时间控件
                // $('#teacherEditModal').find('.joinDate').datetimepicker({
                $('.joinDate').datetimepicker({
                    //参数/选项/配置
                    format: 'yyyy-mm-dd',
                    language: "zh-CN",
                    weekStart: "1", //从周几开始
                    autoclose: true, //选定一个日期之后就自动隐藏日期控件
                    minView: "month", //如果是月，最小能够精确到哪一天，如果是天，最小能够精确到哪一个小时
                    todayBtn: true,
                    todayHighlight: true
                });
            }
        })


    }
});