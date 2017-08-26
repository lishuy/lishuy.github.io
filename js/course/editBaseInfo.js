define([
    'jquery',
    'text!tpls/courseEditBaseInfo.html',
    'template'
], function($, courseEditBaseInfoTpl, template) {
    return function(id) {
        // alert('加载了基本信息');
        $.ajax({
            url: '/api/course/basic',
            data: { cs_id: id },
            success: function(res) {
                var courseEditBaseInfoStr = template.render(courseEditBaseInfoTpl, res.result);
                $courseEditBaseInfoStr = $(courseEditBaseInfoStr);
                $(".panel-content .panel-body").html($courseEditBaseInfoStr);


                $courseEditBaseInfoStr.on('submit', 'form', function() {
                    // alert('提交了')
                    $.ajax({
                        url: '/api/course/update/basic',
                        type: "post",
                        data: $(this).serialize(),
                        success: function(res) {
                            if (res.code == 200) {
                                // alert('提交成功了')
                                $('.left .list-group .course-manager').trigger('click');
                            }
                        }
                    })
                    return false;
                }).on('change', '.top', function() {

                    var cg_id = $(this).val();
                    // alert(cg_id);

                    $.ajax({
                        url: '/api/category/child',
                        data: { cg_id: cg_id },
                        success: function(res) {
                            console.log(res.result);
                            console.log(res.result.length);
                            var str = '';
                            for (var i = 0; i < res.result.length; i++) {
                                //  <option {{v.cg_id==v.cg_pid?'selected="selected"':''}} value="{{v.cg_id}}">{{v.cg_name}}</option>
                                str += '<option  value="' + res.result[i].cg_id + '">' + res.result[i].cg_name + '</option>'
                            }
                            console.log(str);
                            $courseEditBaseInfoStr.find('.chird').html(str);
                        }
                    })
                })
            }
        })

    }
});