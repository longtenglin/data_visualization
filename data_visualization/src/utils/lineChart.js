/**
 * @Declaration:
 * @Author: Mr.Zhaonan
 * @Date: 2020/8/4 15:42
 */

const LineTitleArray = ["历史温度曲线(°)","历史亮度曲线(lm)","历史气压曲线(Pa)"];

/**Line
 * 绘制折线图
 * */
export const generateHistoryLine = (tempLineChart,luxLineChart,pressLineChart,serverData) => {
    tempLineChart.hideLoading();
    luxLineChart.hideLoading();
    pressLineChart.hideLoading();

    rendereHistoryLine(serverData,tempLineChart,0,"温度",LineTitleArray[0]);
    rendereHistoryLine(serverData,luxLineChart,1,"亮度",LineTitleArray[1]);
    rendereHistoryLine(serverData,pressLineChart,2,"大气压",LineTitleArray[2]);
};

const rendereHistoryLine = (serverData,target,type,LineName,title) => {
    // 指定图表的配置项和数据源
    // 温度配置
   let lineOption = {
        title: {
            text: title,
            textStyle: {
                color: "#E0FFFF",
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        //backgroundColor:"#ccc",
        dataset: {
            source: serverData.result.data // 绑定数据
        },
        // X轴
        xAxis: {
            type: 'category',
            axisLabel: {
                color:"#7CFC00",
            },
            axisLine:{
                lineStyle:{
                    color:"#00FFFF",
                    width: 2,
                }
            }
        },
        yAxis: {
            type: 'value',
            scale:true,
            axisLabel: {
                color:"#7CFC00",
            },
            axisLine:{
                lineStyle:{
                    color:"#00FFFF",
                    width: 2,
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#00FFFF'
                }
            },
        },
        series: [
            {
                name: LineName,
                type: 'line',
                encode: {
                    // 将 "cstime" 列映射到 X 轴。
                    x: 'cstime',
                    // 将 "temp" 列映射到 Y 轴。
                    y: type===0?'temp':type===1?"lux":type===2?"press":""
                },
                smooth: true,
                lineStyle :{
                    color:type===0?'#ff9800':type===1?"#7CFC00":type===2?"#E0FFFF":"#000000"
                },
                itemStyle:{
                    color:type===0?'#ff9800':type===1?"#7CFC00":type===2?"#E0FFFF":"#000000",
                    borderWidth:2
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    target.setOption(lineOption, true);
};
export const GetHistory = (context,requestDate) => {
    const tempLineChart = context.root.$echarts.init(document.getElementById("tempLine"));
    const luxLineChart = context.root.$echarts.init(document.getElementById("luxLine"));
    const pressLineChart = context.root.$echarts.init(context.refs.pressLine);
    tempLineChart.showLoading({
        text: '数据正在努力加载...',
        textColor: 'white' ,
        maskColor: 'rgba(0, 0, 102, 0.1)',
        fontSize:  50,
    });
    luxLineChart.showLoading({
        text: '数据正在努力加载...',
        textColor: 'white' ,
        maskColor: 'rgba(0, 0, 102, 0.1)',
        fontSize:  50,
    });
    pressLineChart.showLoading({
        text: '数据正在努力加载...',
        textColor: 'white' ,
        maskColor: 'rgba(0, 0, 102, 0.1)',
        fontSize:  50,
    });
    context.root.$store.dispatch("GET_HISTORY",requestDate).then(responseData => {
        if (responseData.result.data === 0){
            tempLineChart.dispose();
            luxLineChart.dispose();
            pressLineChart.dispose();
            alert("没有历史数据")
        } else{
            generateHistoryLine(tempLineChart,luxLineChart,pressLineChart,responseData);
        }
    }).catch( error => {
        context.root.$message({
            message: error,
            type: 'error'
        });
        //showLoading遮盖层隐藏
        tempLineChart.hideLoading();
        luxLineChart.hideLoading();
        pressLineChart.hideLoading();
        console.error("error",error);
    });
};