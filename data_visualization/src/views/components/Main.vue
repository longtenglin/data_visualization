<template>
    <div id="main-wrap">
        <div class="header">
            <div class="h_left">
                <dv-decoration-8 class="dv_dec_8" :color="['#00FFFF','#00FFFF']"/>
            </div>
            <div class="h_main">
                <div class="h_main_top"><span>智能环境监测</span></div>
                <div class="h_main_bottom">
                    <dv-decoration-5 class="dv_dec_5" :color="['#00FFFF','#00FFFF']"/>
                </div>
            </div>
            <div class="h_right">
                <dv-decoration-8 class="dv_dec_8" :reverse="true" :color="['#00FFFF','#00FFFF']"/>
            </div>
        </div>
        <div class="container">
            <dv-border-box-1>
                <div class="con_head">
                    <div class="con_head_3">
                        <dv-border-box-7 :color="['#00FFFF','#00FFFF']">
                            <div class="div-left div-margin-horizon-1 div-margin-top-1">
                                <dv-decoration-9 style="width:8vw;height:14vh;" :dur="9">
                                    <span class="font-size-25 font-color-auto">{{this.lux}}</span>
                                </dv-decoration-9>
                                <div class="div-margin-top-1">
                                    <dv-decoration-7 style="width:8vw;height:3vh;"><span
                                            class="font-auto font-color-auto">_亮度_</span>
                                    </dv-decoration-7>
                                </div>
                            </div>
                            <div class="font-color-white font-size-15 div-padding-top-2">
                                <div class="div-margin-top-1 div-padding-top-1">
                                    <span>长时间的过度暴露在日光下被认为与多种皮肤癌有关，
                                        而他们是由日光或日光灯中的过度紫外所线引起的。
                                        为防止从轻度的晒伤到严重的灼伤的不良影响，
                                        应该适当使用防晒霜或其他防晒药剂。</span>
                                </div>
                            </div>
                        </dv-border-box-7>
                    </div>
                    <div class="con_head_3">
                        <dv-border-box-7 :color="['#00FFFF','#00FFFF']">
                            <div class="div-left div-margin-horizon-1 div-margin-top-1 font-size-2 font-color-auto">
                                <div class="div-padding-top-1">
                                    <dv-decoration-11 style="width:9vw;height:16vh;">监测设备</dv-decoration-11>
                                </div>
                            </div>
                            <div class="div-padding-top-2 div-margin-horizon-1 div-left font-color-auto">
                                <div style="margin-top:4vh; text-align: center; font-size: 4vh;"><span>{{this.selectMenu.length}}&nbsp;</span><span
                                        class="font-size-2">个</span></div>
                                <div style="margin-top: 4vh;">
                                    <dv-decoration-6 style="width:16vw;height:3vh;"/>
                                </div>
                            </div>
                        </dv-border-box-7>
                    </div>
                    <div class="con_head_3">
                        <dv-border-box-7 :color="['#00FFFF','#00FFFF']">
                            <div class="div-margin-top-1"
                                 style="float: right; width: 18vw;height: 6vh; font-size: 2vh; text-align: center; color: white">
                                <span>选择查询设备与日期</span>
                                <dv-decoration-3 style="width:16vw;height:3vh;" dur="6"/>
                            </div>
                            <div class="div-margin-top-1" style="float: right; width: 18vw;height: 5vh; padding-right: 1vw;">
                                <el-select v-model="value" :placeholder="this.selectMenu[0].value" @change="getSelectValue"
                                           style="float: right;">
                                    <el-option
                                            v-for="item in selectMenu"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="div-margin-top-1" style="float: right; padding-right: 1vw">
                                <el-date-picker
                                        v-model="dateDefault"
                                        value-format="yyyy-MM-ddTHH:mm:ss"
                                        format="yyyy-MM-dd HH:mm:ss"
                                        type="datetimerange"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :default-time="localTime"
                                        @change="getSelectDate">
                                </el-date-picker>
                            </div>
                        </dv-border-box-7>
                    </div>
                </div>
                <div class="con_main">
                    <div class="con_main_3">
                        <dv-border-box-7 :color="['#00FFFF','#00FFFF']">
                            <div class="div-margin-horizon-1 div-left div-margin-top-1">
                                <dv-decoration-9 style="width:8vw;height:14vh;" :dur="6">
                                    <span class="font-auto font-color-auto">{{this.press}}</span>
                                </dv-decoration-9>
                                <div class="div-margin-top-1">
                                    <dv-decoration-7 style="width:8vw;height:3vh;"><span
                                            class="font-auto font-color-auto">大气压</span>
                                    </dv-decoration-7>
                                </div>
                            </div>
                            <div class="font-color-white font-size-15 div-padding-top-1">
                                <div class="div-margin-top-1">
                                    <span style="font-size: 2vh">大气压小科普:</span><br>
                                </div>
                                <div class="div-margin-top-1">
                                    <span>炎热天气，空气中水分含量少，属于“干空气”，密度大，所以大气压比较高。</span><br>
                                </div>
                                <div class="div-margin-top-1">
                                    <span>空气干燥请多喝水，保持身体健康</span>
                                </div>
                            </div>
                        </dv-border-box-7>
                    </div>
                    <div class="con_main_3">
                        <dv-border-box-7 :color="['#00FFFF','#00FFFF']">
                            <div class="div-center">
                                <div class="div-left div-margin-horizon-1 div-margin-top-1">
                                    <dv-decoration-9 style="width:8vw;height:14vh;" :dur="6">
                                        <span class="font-size-25 font-color-auto">{{this.temp}}</span>
                                    </dv-decoration-9>
                                    <div class="div-margin-top-1">
                                        <dv-decoration-7 style="width:8vw;height:3vh;">
                                            <span class="font-auto font-color-auto">_温度_</span></dv-decoration-7>
                                    </div>
                                </div>
                                <div>
                                    <div class="font-color-white font-size-15 div-padding-top-1">
                                        <div class="div-margin-top-1">
                                            <span style="font-size: 2vh">温馨提示:</span><br>
                                        </div>
                                        <div class="div-margin-top-1">
                                            <span v-if="this.temp >= 30">室内气温酷热，请保持舒适温度，不要让工作成为烦恼。</span>
                                            <span v-if="this.temp < 30 && this.temp >= 24">室内气温高于舒适温度，部分社员可能会有闷热感觉。</span>
                                            <span v-if="this.temp < 24 && this.temp > 17">室内气温舒适。</span>
                                            <span v-if="this.temp <= 17 && this.temp > 10">室内气温稍低于舒适温度，部分社员会有凉、冷的感觉。</span>
                                            <span v-if="this.temp <= 10 && this.temp > 0">室内气温低，请注意工作保暖</span>
                                            <span v-if="this.temp <= 0">室内酷寒，请保持舒适温度，不要让工作成为烦恼。</span><br>
                                        </div>
                                        <div class="div-margin-top-1">
                                            <span>祝您工作生活愉快</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </dv-border-box-7>
                    </div>
                    <div class="con_right">
                        <dv-border-box-7 :color="['#00FFFF','#00FFFF']">
                            <div class="line">
                                <div id="luxLine" ref="luxLine" class="div-margin-horizon-1"></div>
                                <div id="pressLine" ref="pressLine" class="div-margin-horizon-1"></div>
                            </div>
                        </dv-border-box-7>
                    </div>
                </div>
                <div class="left" v-on:click="this.openNav" v-if="!this.navStatus">
                    <dv-border-box-12 :color="['#63B8FF','#63B8FF']">
                        <svg-icon icon-class="nav_open" icon-name="nav_open"/>
                    </dv-border-box-12>
                </div>
                <div class="con_foot div-margin-horizon-1 div-left">
                    <dv-border-box-7 :color="['#00FFFF','#00FFFF']">
                        <div class="div-margin-top-1 div-margin-horizon-1 div-left">
                            <div id="tempLine" class="div-margin-horizon-1"></div>
                        </div>
                    </dv-border-box-7>
                </div>
            </dv-border-box-1>
        </div>
    </div>
</template>
<script>
    import {ref, computed, onMounted, reactive, onBeforeMount,} from "@vue/composition-api"
    import {GetHistory} from "../../utils/lineChart";
    import { getMac, setMac } from "../../utils/app";

    export default {
        name: "Main",
        setup(props, context) {;
            const localTime = reactive([
                context.root.$moment(new Date()).format("HH:mm:ss"),
                context.root.$moment(new Date()).format("HH:mm:ss")
            ]);
            let requestDateTime = reactive({
                endts: context.root.$moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
                startts: context.root.$moment(new Date()).add(-12, "hours").format("YYYY-MM-DDTHH:mm:ss"),
                macts: "240AC406AA8C",
            });
            let lux = ref();
            let temp = ref();
            let press = ref();
            let selectMenu = reactive([
                { label:"无设备", value:"无设备" }
            ]);

            let mac = ref("240AC406AA8C");
            const navStatus = computed(() => context.root.$store.state.navStatus);
            const openNav = () => {
                context.root.$store.commit("SET_NAVSTATUS");
            };
            let dateDefault = reactive([
                new Date(), new Date()
            ]);
            const getSelectDate = (val) => {
                requestDateTime.startts = val[0];
                requestDateTime.endts = val[1];
                requestDateTime.macts = getMac();
                GetSensors();
                GetLatest(getMac());
                GetHistory(context, requestDateTime);
            };
            const getSelectValue =  (val) => {
                setMac(val);
            };
            const GetLatest = (macAddress) => {
                context.root.$store.dispatch("GET_LATEST",macAddress).then(responseData => {
                    let resultData = responseData.result.data;
                    if (resultData === null) {
                        alert("该设备现在没有数据")
                    } else {
                        lux.value = resultData.lux;
                        temp.value = resultData.temp;
                        press.value = resultData.press;
                    }
                }).catch(error => {
                    context.root.$message({
                        message: error,
                        type: 'error'
                    });
                    console.error("error", error);
                });
            };
            const GetSensors = () => {
                context.root.$store.dispatch("GET_SENSORS").then(responseData => {
                    if (responseData.result.data === 0) {
                        alert("没有设备");
                    } else {
                        responseData.result.data.forEach((item, index) => {
                            let menu = {};
                            menu.label = item;
                            menu.value = item;
                            selectMenu[index] = menu;
                        });
                        setMac(selectMenu[0].value);
                    }
                }).catch(error => {
                    context.root.$message({
                        message: error,
                        type: 'error'
                    });
                    console.error("error", error);
                });
            };
            const timer = ref(null);
            const countDown = (number) => {
                let time = number;
                // let count = 1;
                timer.value = setInterval(() => {
                    time--;
                    if ((time % 600) === 0 && time !== 0) {
                        GetLatest(getMac());
                        // console.log(`第${count}次获取数据`);
                        // console.log(`温度:${temp.value},亮度:${lux.value}大气压:${press.value}`);
                        // count++;
                    } else if (time === 0) {
                        requestDateTime.endts = context.root.$moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");
                        requestDateTime.startts = context.root.$moment(new Date()).add(-12, "hours").format("YYYY-MM-DDTHH:mm:ss");
                        requestDateTime.macts = getMac();
                        GetHistory(context, requestDateTime);
                        GetLatest(getMac());
                        // console.log(`第${count}次获取数据,历史数据被更新`);
                        // console.log(`温度:${temp.value},亮度:${lux.value}大气压:${press.value}`);
                        // count++;
                        time = 3600;
                    }
                }, 1000)
            };
            onMounted(() => {
                GetSensors();
                GetLatest(mac.value);
                GetHistory(context, requestDateTime);
                countDown(3600);
            });
            return {
                value: "",
                lux,
                temp,
                press,
                selectMenu,
                openNav,
                navStatus,
                localTime,
                dateDefault,
                getSelectDate,
                getSelectValue
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/config";


    .close {
        #main-wrap {
            width: 100vw;
            height: 100vh;
            animation: blackToTransparent 10s;
            /*-moz-animation:action1 5s; !* Firefox *!*/
            -webkit-animation:blackToTransparent 10s; /* Safari and Chrome */
            /*-o-animation:action1 5s; !* Opera *!*/
        }

        .header {
            display: block;
            height: 10vh;
            padding-top: 1vh;

            .h_left {
                float: left;
            }

            .h_main {
                float: left;

                .h_main_top {
                    width: 34vw;
                    height: 4vh;
                    font-size: 4vh;
                    color: #40E0D0;
                    text-align: center;
                }

                .h_main_bottom {
                    height: 5vh;
                }
            }

            .h_right {
                float: left;
            }

            .dv_dec_8 {
                width: 33vw;
                height: 7vh;
            }

            .dv_dec_5 {
                width: 34vw;
                height: 6vh;
            }
        }

        .container {
            width: 100vw;
            height: 89vh;

            .con_head {
                width: 96vw;
                height: 22vh;
                padding-top: 2vh;
                margin-left: 2vw;
                margin-right: 2vw;

                .con_head_3 {
                    width: 30vw;
                    height: 20vh;
                    margin-left: 1vw;
                    margin-right: 1vw;
                    float: left;
                    background-color: rgba(104, 34, 139, 0.2);
                }

            }

            .con_main {
                width: 96vw;
                height: 22vh;
                padding-top: 1vh;
                margin-right: 2vw;
                float: right;

                .con_main_3 {
                    width: 30vw;
                    height: 20vh;
                    margin-left: 1vw;
                    margin-right: 1vw;
                    float: left;
                    background-color: rgba(0, 0, 102, 0.5);
                    /*background-color: rgba(104, 34, 139, 0.2);*/
                }
            }

            .left {
                width: 2vw;
                height: 26vh;
                cursor: pointer;
                float: left;

                svg {
                    margin-top: 10vh;
                    width: 2vw;
                    height: 4vh;
                    fill: currentColor;
                    color: #63B8FF;
                    cursor: pointer;
                }
            }

            .con_foot {
                width: 62vw;
                height: 40vh;
                background-color: rgba(0, 0, 102, 0.5);
            }

            .con_right {
                width: 30vw;
                height: 62vh;
                margin-left: 1vw;
                margin-right: 1vw;
                float: left;
                background-color: rgba(0, 0, 102, 0.5);
            }
        }
    }

    .line {
    }

    #tempLine {
        width: 60vw;
        height: 36vh;
    }

    #luxLine {
        width: 28vw;
        height: 30vh;
    }

    #pressLine {
        width: 28vw;
        height: 30vh;
    }
</style>