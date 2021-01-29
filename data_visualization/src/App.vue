<template>
  <div id="app">
      <dv-full-screen-container>
      <router-view />
      </dv-full-screen-container>
  </div>
</template>
<style lang="scss">
#app{
    width: 100%;
    height: 100%;
    background-size:auto;/*这个用来实现不缩放（默认的）,缩放是cover*/
    position:absolute;/*这一行必须要有，但上一行不是必须的，因为auto是默认值*/
    background-image: url(./assets/pg_03.png);
    background-repeat:repeat;/*这一行也可以没有，因为repeat是默认值*/
    background-attachment: fixed;/*这一行也可以没有，虽然默认值不是fixed，但对效果显示无影响*/
}
</style>
