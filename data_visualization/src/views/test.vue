<template>
    <div class="test-wrap">
        <div ref="testCharts" style="width:1000px; height: 600px"></div>
    </div>
</template>

<script>
    import { ref, reactive, onMounted } from "@vue/composition-api";
    export default {
        name: "test",
        setup(props,context){
            const realTimeCount = ref(0);
            const timer = ref(null);
            let dataArray = reactive([]);
            const option = reactive({
                title: {
                    text: "目标实时动态图",
                    textStyle:{
                        color: "black",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        fontSize: 50,
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
                    nameTextStyle:{
                        color: "red",
                    },
                    axisLine: {
                        lineStyle: {
                          color: "#DAA520",
                          width: 2,
                        },
                    },
                    axisLabel:{
                        showMinLabel: false,
                    }
                },
                yAxis:{
                    type: "value",
                    name: "温度",
                    scale: true,
                    nameTextStyle:{
                        color: "red",
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#DAA520",
                            width: 2,
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
                            // x: "num", // tooltip框内出现多个点测试
                            y: "temp",
                        },
                        smooth: true,
                    }
                ]
            });
            const GetLatestData = (shift) => {
                context.root.$store.dispatch("GET_LATEST").then(responseData => {
                    let data = responseData.result.data;
                    data.num = realTimeCount.value;
                    dataArray.push(data);
                    if (shift && realTimeCount.value > 720){
                        console.log(dataArray.length);
                        dataArray.shift();
                    }
                    realTimeCount.value++;
                }).catch(error => {
                })
            };
            const drewLine = (testChartsLine1)=>{
                const testChartsLine = context.root.$echarts.init(context.refs.testCharts);
                testChartsLine.setOption(option, true);
            };
            const countDown = (number,testChartsLine) => {
                let time = number;
                timer.value = setInterval(() => {
                    time--;
                    if(time === 0){
                        GetLatestData(true);
                        drewLine(testChartsLine);
                        time=5;
                    }
                },1000);
            };
            onMounted(() => {
                const testChartsLine = context.root.$echarts.init(context.refs.testCharts);
                GetLatestData(false);
                drewLine(testChartsLine);
                countDown(5,testChartsLine);
            });
        }
    }
</script>

<style lang="scss" scoped>
.test-wrap{
    background-color: white;
}
</style>