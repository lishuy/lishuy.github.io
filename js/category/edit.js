define([
    'jquery',
    'text!tpls/categoryEdit.html',
    'template'
], function($, categoryEditTpl, template) {
    return function(id) {
        $.ajax({
            url: '/api/category/edit',
            data: { cg_id: id },
            success: function(data) {
                if (data.code == 200) {
                    var categoryEditStr = template.render(categoryEditTpl, data.result)
                    $('#categoryEditModal').remove(); //删除之前的模态框
                    var $categoryEditStr = $(categoryEditStr)
                    $('body').append($categoryEditStr);
                    $('#categoryEditModal').modal();

                    //编辑分类提交
                    $categoryEditStr.on('submit', 'form', function() {
                        $.ajax({
                            url: '/api/category/modify',
                            type: 'post',
                            data: $(this).serialize(),
                            success: function(data) {
                                if (data.code == 200) {
                                    console.log('点击了提交按钮');
                                    $('.left .list-group .course-category').trigger('click');
                                    $('#categoryEditModal').modal('hide');
                                }
                            }
                        })
                        return false;
                    })
                }
            }


        })



    }

});