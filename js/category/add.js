define([
    'jquery',
    'text!tpls/categoryAdd.html',
    'template'
], function($, categoryAddTpl, template) {
    return function() {
        // alert('加载了添加分类');
        $.ajax({
            url: '/api/category/top',
            type: 'get',
            success: function(data) {
                var categoryAddStr = template.render(categoryAddTpl, data);
                $('#categoryAddModal').remove();
                $('body').append(categoryAddStr);
                $('#categoryAddModal').modal();

                //提交分类数据到服务器
                $('#categoryAddModal').on('submit', 'form', function() {
                    $.ajax({
                        url: '/api/category/add',
                        type: 'post',
                        data: $(this).serialize(),
                        success: function(data) {
                            if (data.code == 200) {
                                $('#categoryAddModal').modal('hide');
                                $('.left .list-group .course-category').trigger('click');
                            }
                        }
                    })

                    return false;
                })
            }
        })
    }

});