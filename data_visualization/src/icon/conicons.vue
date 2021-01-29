<template>
    <div>{{msg}}</div>
</template>

<script>
    import {ref} from "@vue/composition-api";

    export default {
        name: "con-icons",
        setup(props,context){
            const msg = ref("全局组件")
            return {
                msg
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>