define([
    'jquery',
    'text!tpls/teacherAdd.html',
    'dateTime',
    'dateTimeLang'
], function($, teacherAddTpL) {

    return function() {
        $('#teacherAddModal').remove();
        $('body').append(teacherAddTpL);
        $('#teacherAddModal').modal();

        //日期控制渲染
        // $('#teacherAddModal').find('.datetimepicker').datetimepicker({
        $('.datetimepicker').datetimepicker({
            //参数/选项/配置
            format: 'yyyy-mm-dd',
            language: "zh-CN",
            weekStart: "1", //从周几开始
            autoclose: true, //选定一个日期之后就自动隐藏日期控件
            minView: "month", //如果是月，最小能够精确到哪一天，如果是天，最小能够精确到哪一个小时
            todayBtn: true,
            todayHighlight: true
        });

        $('#teacherAddModal').on('submit', 'form', function() {
            $.ajax({
                url: '/api/teacher/add',
                type: 'post',
                data: $(this).serialize(),
                success: function(data) {
                    if (data.code != 200) {
                        return console.log(data.msg);
                    }
                    console.log('提交了');
                    $('#teacherAddModal').modal('hide');
                    $(".left .list-group .teacher-manager").trigger("click"); //触发讲师管理菜单的click事件
                }
            })
            return false;
        })


    }

});