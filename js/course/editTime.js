define([
        'jquery',
        'text!tpls/courseEditTime.html',
        'template'
    ],
    function($, courseEditTimeTpl, template) {
        return function(id, callback) {
            // alert('点击了编辑按钮');
            $.ajax({
                url: "/api/course/chapter/edit",
                data: { ct_id: id },
                success: function(res) {
                    var courseEditTimeStr = template.render(courseEditTimeTpl, res.result);
                    $courseEditTimeStr = $(courseEditTimeStr);
                    $('#courseEditTimeStr').remove();
                    $('body').append($courseEditTimeStr);
                    $('#courseEditTimeModal').modal();

                    //绑定提交事件
                    $courseEditTimeStr.on('submit', 'form', function(e) {
                        // alert('绑定了')
                        e.preventDefault();
                        $.ajax({
                            url: '/api/course/chapter/modify',
                            type: 'post',
                            data: $(this).serialize(),
                            success: function(res) {
                                if (res.code == 200) {
                                    callback();
                                    $('#courseEditTimeModal').modal('hide');
                                }
                            }
                        })
                    })

                }
            })
        }

    });