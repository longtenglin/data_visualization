<template>
    <div :class="this.navStatus ? 'open' : 'close'">
        <layoutNev v-if="this.navStatus"/>
<!--        <layoutNev/>-->
        <layoutMain  v-if="!this.navStatus" class="layout-main"/>
    </div>
</template>

<script>
    import { computed } from "@vue/composition-api";
    import layoutNev from "../components/nev";
    import layoutMain from "../components/Main";
    export default {
        name: "layout",
        components: {
            layoutNev,
            layoutMain
        },
        setup(props,context){
            const navStatus = computed(()=>context.root.$store.state.navStatus);
            return {
                navStatus
            }
        }
    }
</script>

<style lang="scss" scoped>
    .open{
        width: 100vw;
        height: 100vh;
    }
    .close{
        width: 100vw;
        height: 100vh;
    }
</style>