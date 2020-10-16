<template>
  <div id="home">
    <Swipe ref="swipe" :autoplay="3500" :height="swipeHeight">
      <Swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </Swipe-item>
    </Swipe>
    <div id="test"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import { Swipe, SwipeItem } from 'vant';

@Component({
  components: {
    Swipe,
    SwipeItem
  },
})
export default class Home extends Vue {
  swipeHeight: number = 0;
  @Ref('swipe') swipe!: Swipe;
  images = [
    require('@/assets/banner1.png'),
    require('@/assets/banner2.png'),
    require('@/assets/banner3.png'),
  ];
  mounted() {
    // 设置轮播图高度
    this.swipeHeight = 611/1920 * this.swipe.$el.clientWidth;
  }
}
</script>

<style lang="scss" scoped>
  #home{
    .van-swipe-item >img{
      width: 750px;
    }
  }
</style>
