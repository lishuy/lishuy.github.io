define([
    'jquery',
    'text!tpls/teacherShow.html',
    'template'
], function($, teacherShowTpl, template) {
    return function(id) {
        $.ajax({
            url: '/api/teacher/view',
            type: 'get',
            data: {
                tc_id: id
            },
            success: function(data) {
                if (data.code == 200) {
                    var teacherShow = template.render(teacherShowTpl, data.result);
                    $('#teacherShowModal').remove();
                    $('body').append(teacherShow);
                    $('#teacherShowModal').modal();
                }
            }

        })
    }

});