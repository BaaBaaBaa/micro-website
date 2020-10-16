<template>
  <p>Solution works!</p>
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
