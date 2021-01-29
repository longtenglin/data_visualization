/**
 * @Declaration:
 * @Author: Mr.Zhaonan
 * @Date: 2020/8/6 15:51
 */
import Vue from "vue";
import con_icons from "./conicons"
import svgicon from "./svgicon";

Vue.component("svg-icon",svgicon);
Vue.component("con-icons",con_icons);
/**
 * @Declaration: require.context: 读取指定目录的所有文件
 *      require.context("./svg", false, /\.svg$/);
 *      @param: No.1 目录
 *      @param: No.2 是否遍历子级目录
 *      @param: No.3 定义遍历文件规则  正则里面表示结尾，读取结尾为.svg的文件
 * @Author: Mr.zhao_nan
 */
const rep = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) => {
    // console.log(requireContext.keys().map(requireContext));
    // console.log(requireContext.keys());
    return requireContext.keys().map(requireContext);
}; // es6 写法
// const requireAll = function (requireContext) {
//     return requireContext.keys().map(requireContext);
// }; // es5 写法
requireAll(rep);