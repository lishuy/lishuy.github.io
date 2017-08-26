define(['jquery', 'text!tpls/courseList.html', 'template', 'course/time', 'course/editBaseInfo', 'course/img'],
    function($, courseListTpl, template, courseTime, courseEditBaseInfo, courseImg) {
        return function() {
            $.ajax({
                url: '/api/course',
                success: function(data) {
                    // console.log(data);
                    var courseListStr = template.render(courseListTpl, data);
                    var $courseListStr = $(courseListStr);

                    //编辑课时 按钮点击事件
                    $courseListStr.on('click', '.btn-time', function() {
                        // $(".panel-content .panel-body").html('编辑课时');
                        var cs_id = $(this).parent().attr('cs_id');
                        courseTime(cs_id);
                    }).on('click', '.btn-baseInfo', function() {
                        // alert('点击了基本信息按钮')
                        var cs_id = $(this).parent().attr('cs_id');
                        courseEditBaseInfo(cs_id);
                    })

                    //绑定课程图片 事件
                    $courseListStr.find('.courseImg').on('click', function() {
                        // alert('点击了图片');
                        var cs_id = $(this).attr('cs_id');
                        courseImg(cs_id);
                    })

                    $(".panel-content .panel-body").html($courseListStr);

                }
            })


        }
    })