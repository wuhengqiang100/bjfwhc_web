<template>
  <div>
    <svg-icon
      icon-class="international"
      @click="click"
    />
    <!-- <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" /> -->
  </div>
</template>

<script>
// import bigScreen from 'bigScreen'

export default {
  name: 'BigScreen',
  data() {
    return {
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    click() {
      /*       const { fullPath } = this.$route
            this.$router.replace({
              path: '/bigScreen' + fullPath
            }) */
      this.$router.replace({
        path: '/bigScreen'
      })
    }

  }
}
</script>

<style scoped>
</style>
