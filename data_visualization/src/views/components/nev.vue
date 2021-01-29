<template>
    <div id="nav-wrap">
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
                <div class="con_top">
                    <div class="con_top_left div-margin-horizon-1 div-left">
                        <dv-border-box-7 :color="['#00FFFF','#00FFFF']">
                            <div class="div-margin-top-1 div-margin-horizon-1 div-left">
                                <div id="dyLuxLine" class="div-margin-horizon-1"></div>
                            </div>
                        </dv-border-box-7>
                    </div>

                    <div class="con_top_left div-margin-horizon-1 div-right">
                        <dv-border-box-7 :color="['#00FFFF','#00FFFF']">
                            <div class="div-margin-top-1 div-margin-horizon-1 div-left">
                                <div id="dyPressLine" ref="dyPressLine" class="div-margin-horizon-1"></div>
                            </div>
                        </dv-border-box-7>
                    </div>
                </div>
                <div class="left" v-on:click="this.closeNav" v-if="this.navStatus === true">
                    <dv-border-box-12 :color="['#63B8FF','#63B8FF']">
                        <svg-icon icon-class="nav_close" icon-name="nav_close"/>
                    </dv-border-box-12>
                </div>
                <div class="con_foot">
                    <div class="con_foot_left div-margin-horizon-1 div-left">
                        <dv-border-box-7 :color="['#00FFFF','#00FFFF']">
                            <div class="div-margin-top-1 div-margin-horizon-1 div-left">
                                <div id="dyTempLine" class="div-margin-horizon-1"></div>
                            </div>
                        </dv-border-box-7>
                    </div>

                    <div class="con_foot_right div-margin-horizon-1 div-left">
                        <dv-border-box-7 :color="['#00FFFF','#00FFFF']">
                        </dv-border-box-7>
                    </div>

                </div>
            </dv-border-box-1>
        </div>
    </div>
</template>

<script>
    import {onMounted, reactive, ref, computed} from "@vue/composition-api"
    import {GetDynamicLine} from "../../utils/dynamicLineCharts";
    import {getMac} from "../../utils/app";
    export default {
        name: "Nev",
        setup(props, context) {
            const realTimeCount = ref(0);
            const timer = ref(null);
            let dataArray = reactive([]);
            const navStatus = computed(() => context.root.$store.state.navStatus);
            const closeNav = () => {
                context.root.$store.commit("SET_NAVSTATUS");
            };
            const countDown = (number, dyTempLineChart, dyPressLineChart, dyLuxLineChart) => {
                let time = number;
                timer.value = setInterval(() => {
                    time--;
                    if(time === 0){
                        GetDynamicLine(true, context, dataArray, realTimeCount, dyTempLineChart, dyPressLineChart, dyLuxLineChart, getMac());
                        time=5;
                    }
                },1000);
            };
            onMounted(() => {
                const dyTempLineChart = context.root.$echarts.init(document.getElementById("dyTempLine"));
                const dyLuxLineChart = context.root.$echarts.init(document.getElementById("dyLuxLine"));
                const dyPressLineChart = context.root.$echarts.init(document.getElementById("dyPressLine"));
                GetDynamicLine(false, context, dataArray, realTimeCount, dyTempLineChart, dyPressLineChart, dyLuxLineChart, getMac());
                countDown(5, dyTempLineChart, dyPressLineChart, dyLuxLineChart);

            });
            return {
                navStatus,
                closeNav
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/config";

    .open {
        #nav-wrap {
            width: 100vw;
            height: 100vh;
            animation: blackToTransparent 5s;
            /*-moz-animation:action1 5s; !* Firefox *!*/
            -webkit-animation:blackToTransparent 5s; /* Safari and Chrome */
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

            .con_top {
                width: 96vw;
                height: 42.5vh;
                padding-top: 2.5vh;
                margin-left: 2vw;
                margin-right: 2vw;

                .con_top_left {
                    width: 46vw;
                    height: 40vh;
                    background-color: rgba(0, 0, 102, 0.5);
                }

                .con_top_right {
                    width: 46vw;
                    height: 40vh;
                    background-color: rgba(0, 0, 102, 0.5);
                }
            }

            .left{
                width: 2vw;
                height: 26vh;
                margin-top: -21vh;
                cursor: pointer;
                float: right;

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
                width: 96vw;
                height: 45vh;
                padding-top: 1vh;
                margin-left: 2vw;
                margin-right: 2vw;

                .con_foot_left {
                    width: 62vw;
                    height: 40vh;
                    background-color: rgba(0, 0, 102, 0.5);
                }

                .con_foot_right {
                    width: 30vw;
                    height: 40vh;
                    background-color: rgba(0, 0, 102, 0.5);
                }
            }
        }

        #dyTempLine{
            width: 59vw;
            height: 40vh;
        }
        #dyPressLine{
            width: 43vw;
            height: 40vh;
        }
        #dyLuxLine{
            width: 43vw;
            height: 40vh;
        }
    }

</style>