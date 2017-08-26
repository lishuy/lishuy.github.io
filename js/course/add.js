define([
    'jquery',
    'text!tpls/courseAdd.html'
], function($, courseAddTpl) {
    return function() {
        $('#courseAddModal').remove();
        $('body').append(courseAddTpl);
        $('#courseAddModal').modal();
        $('#courseAddModal').on('submit', 'form', function() {
            console.log('提交了')
            $.ajax({
                url: '/api/course/create',
                type: 'post',
                data: $(this).serialize(),
                success: function(data) {
                    if (data.code == 200) {
                        $('#courseAddModal').modal('hide');
                        $('.left .list-group .course-manager').trigger('click');
                    }
                }
            })
            return false;
        })
    }

});