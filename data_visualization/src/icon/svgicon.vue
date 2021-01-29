<template>
    <svg :class="this.icon_class" aria-hidden="true">
        <use :xlink:href="this.icon_name"></use>
    </svg>
</template>

<script>
    import { computed } from "@vue/composition-api"
    export default {
        name: "svgicon",
        props:{
            iconClass:{
                type: String,
                default: ""
            },
            iconName:{
                type: String,
                default: ""
            }
        },
        setup(props){
            const icon_name = computed(() => `#icon-${props.iconName}`);
            const icon_class = computed(()=>{
                if(props.iconClass){
                    return `svg-icon ${props.iconClass}`;
                }else {
                    return `svg-icon`
                }
            });
            return{
                icon_class,
                icon_name
            }
        }
    }
</script>

<style lang="scss" scoped>
    .svg-icon{
        width: 1.2em;
        height: 1.2em;
    }
</style>