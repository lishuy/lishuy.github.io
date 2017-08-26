// 课程分类列表
define([
    'jquery',
    'text!tpls/categoryList.html',
    'template',
    'category/add',
    'category/edit'
], function($, categoryListTpl, template, categoryAdd, categoryEdit) {
    return function() {
        $.ajax({
            url: '/api/category',
            type: 'get',
            success: function(data) {

                if (data.code != 200) { return console.log(data.msg) }
                var categoryListStr = template.render(categoryListTpl, data)
                    // console.log(data);
                $(".panel-content .panel-body").html(categoryListStr)
                    //绑定添加分类
                $('.categoryList .row .btn-add').click(function() {
                        // alert('添加分类');
                        categoryAdd();
                    })
                    //编辑分类
                $('.categoryList table .btn-edit').click(function() {
                    // alert('编辑分类');
                    var cg_id = $(this).parent().attr('cg_id');
                    console.log(cg_id);
                    categoryEdit(cg_id);

                })

            }
        })
    }

});