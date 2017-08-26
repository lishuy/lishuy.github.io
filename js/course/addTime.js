define([
    'jquery',
    'text!tpls/courseAddTime.html',
    'template'
], function($, courseAddTimeTpl, template) {
    return function(id, callback) {
        // alert('加载了添加课时模块')
        $('#courseAddTimeModal').remove();
        var $courseAddTimeTpl = $(courseAddTimeTpl)
        $('body').append($courseAddTimeTpl);
        $('#courseAddTimeModal').modal();

        //提交按钮绑定事件
        $courseAddTimeTpl.on('submit', 'form', function(e) {
            e.preventDefault();
            // alert('提交了');
            var formData = $(this).serialize();
            formData += '&ct_cs_id=' + id;
            // alert(formData);
            $.ajax({
                url: '/api/course/chapter/add',
                type: 'post',
                data: formData,
                success: function(res) {
                    console.log(res);
                    if (res.code == 200) {
                        callback();
                        $('#courseAddTimeModal').modal('hide');
                    }
                }
            })
        })

    }

});