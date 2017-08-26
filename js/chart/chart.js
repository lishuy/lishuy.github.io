define(['jquery',
    'text!tpls/chart.html',
    'echarts'
], function($, chartTpl, echarts) {
    return function() {
        // alert('加载了图表')
        var count = [
            { name: '男', value: 0 },
            { name: '女', value: 0 }
        ]
        $.ajax({
            url: '/api/teacher',
            success: function(res) {
                //计算男女数量
                res.result.forEach(function(v) {
                    if (v.tc_gender == 0) {
                        count[0].value++;
                    } else {
                        count[1].value++;
                    }
                });

                var $chart = $(chartTpl);
                // $chart.appendTo('body');
                $(".panel-content .panel-body").html($chart);

                // 基于准备好的dom，初始化echarts实例
                var main = document.getElementById('chart');
                var myChart = echarts.init(main);

                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '教师男女比例'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        top: 30,
                        right: 30,
                        orient: 'horizontal', //图例的对齐方式  并排/一排一个
                        data: count.map(function(v) {
                            //v:{name:"",value:""}
                            return v.name;
                        })
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: count,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]


                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        })
    }

});