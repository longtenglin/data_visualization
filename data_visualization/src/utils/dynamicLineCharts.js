/**
 * @Declaration:
 * @Author: Mr.Zhaonan
 * @Date: 2020/8/31 16:36
 */
const dyLineTitleArray = ["实时温度曲线", "实时大气压曲线", "实时亮度曲线"];

const generateDynamicLineChart = (dataArray, dyTempLineChart, dyPressLineChart, dyLuxLineChart) => {
    // dyLuxLineChart.hideLoading();
    // dyPressLineChart.hideLoading();
    // dyTempLineChart.hideLoading();

    setDataSource(dataArray,dyLuxLineChart,2,"亮度", dyLineTitleArray[2]);
    setDataSource(dataArray,dyPressLineChart,1,"大气压", dyLineTitleArray[1]);
    setDataSource(dataArray,dyTempLineChart,0,"温度", dyLineTitleArray[0]);
};

const setDataSource = (dataArray, target, type, lineName, title)=>{
    //指定图的数据源与配置项
    let dynamicOptions = {
            title: {
                text: title,
                textStyle:{
                    color: "#E0FFFF",
                }
            },
            tooltip:{
                trigger:"axis",
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: "time",
                name: "时间",
                axisLine: {
                    lineStyle: {
                        color: "#00FFFF",//"#DAA520",
                        width: 2,
                    },
                },
                axisLabel:{
                    color:"#7CFC00",
                    showMinLabel: false,
                }
            },
            yAxis:{
                type: "value",
                name: "温度",
                scale: true,
                axisLine: {
                    lineStyle: {
                        color: "#00FFFF",//"#DAA520",
                        width: 2,
                    }
                },
                axisLabel: {
                    color:"#7CFC00",
                },
                splitLine: {
                    lineStyle: {
                        color: '#00FFFF'
                    }
                },
            },
            dataset:{
                source: dataArray,
            },
            series: [
                {
                    type: "line",
                    encode: {
                        y: type===0?'temp':type===1?"press":type===2?"lux":""
                    },
                    smooth: true,
                }
            ],
    };
    target.setOption(dynamicOptions, true);
};

export const GetDynamicLine = (shift, context, dataArray, realTimeCount, dyTempLineChart, dyPressLineChart, dyLuxLineChart, macAddress) => {
    // const dyTempLineChart = context.root.$echarts.init(document.getElementById("dyTempLine"));
    // const dyLuxLineChart = context.root.$echarts.init(document.getElementById("dyLuxLine"));
    // const dyPressLineChart = context.root.$echarts.init(document.getElementById("dyPressLine"));
    // dyTempLineChart.showLoading({
    //     text: '数据正在努力加载...',
    //     textColor: 'white' ,
    //     maskColor: 'rgba(0, 0, 102, 0.1)',
    //     fontSize:  50,
    // });
    // dyLuxLineChart.showLoading({
    //     text: '数据正在努力加载...',
    //     textColor: 'white' ,
    //     maskColor: 'rgba(0, 0, 102, 0.1)',
    //     fontSize:  50,
    // });
    // dyPressLineChart.showLoading({
    //     text: '数据正在努力加载...',
    //     textColor: 'white' ,
    //     maskColor: 'rgba(0, 0, 102, 0.1)',
    //     fontSize:  50,
    // });
    context.root.$store.dispatch("GET_LATEST",macAddress).then(responseData => {
        let data = responseData.result.data;
        if (data === null){
            dyTempLineChart.dispose();
            dyLuxLineChart.dispose();
            dyPressLineChart.dispose();
            context.root.$message({
                message: "获取实时数据失败",
                type: 'error'
            });
        } else {
            dataArray.push(data);
            if (shift && realTimeCount.value > 720){
                console.log(dataArray.length);
                dataArray.shift();
            }
            generateDynamicLineChart(dataArray,dyTempLineChart ,dyPressLineChart, dyLuxLineChart)
        }
        realTimeCount.value++;
    }).catch(error => {
        console.log(error);
        context.root.$message({
            message: error,
            type: 'error'
        });
        //showLoading遮盖层隐藏
        // dyTempLineChart.hideLoading();
        // dyLuxLineChart.hideLoading();
        // dyPressLineChart.hideLoading();
    })
};