<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="test">
      <h1>
        css gradient
      </h1>
      <button class="btn-grad">渐变色按钮</button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class About extends Vue {
    private active: number = 0;
  }
</script>

<style lang="scss" scoped>
  #test{
    h1 {
      font-size: 72px;
      background: -webkit-linear-gradient(right, gray, red);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .btn-grad {
    margin: 10px;
    padding: 15px 45px;
    border: none;
    text-transform: uppercase;
    transition: 1.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    background-image: linear-gradient(to right, #FFEEEE 0%, #DDEFBB  51%, #FFEEEE  100%)
  }

  .btn-grad:active {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }


</style>
