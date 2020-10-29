<template>
  <div>
    <p><img class="icon icon-productActive" alt=""></p>
    <p><img src="../assets/icon/productActive.png" alt=""></p>
    <img src="../assets/images/sprite.png" alt="">
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class Solution extends Vue {
    private active: number = 0;
  }
</script>

<style lang="scss" scoped>

</style>
