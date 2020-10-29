<template>
  <div id="app">
    <router-view/>
    <tabbar v-model="active" route safe-area-inset-bottom>
      <tabbar-item replace to="/home" icon="home-o">主页</tabbar-item>
      <tabbar-item replace to="/solution" icon="search">解决方案</tabbar-item>
      <tabbar-item replace to="/about" icon="friends-o">关于我们</tabbar-item>
    </tabbar>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Tabbar, TabbarItem } from 'vant';

  @Component({
    components: {
      Tabbar,
      TabbarItem
    },
  })
  export default class App extends Vue {
    private active: number = 0;
  }
</script>

<style lang="scss">
  @import './assets/css/sprite.scss';
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow-x: hidden;

    .van-tabbar{
      height: 100px;
      .van-tabbar-item__icon{
        font-size: 40px;
      }
    }
  }
</style>
