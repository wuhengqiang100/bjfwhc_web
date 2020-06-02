<template>
  <div id="top-header">
    <dv-decoration-8 class="header-left-decoration" />
    <!-- <span class="header-left-decoration">{{nowDate| parseTime('{y}-{m}-{d} {h}:{i}')  }}</span> -->
    <dv-decoration-5 class="header-center-decoration" />

    <dv-decoration-8
      class="header-right-decoration"
      :reverse="true"
    />

    <div class="center-title">北京安全线机检数据监控
      <screenfull
        id="screenfull"
        class="right-menu-item hover-effect"
      />
    </div>
  </div>
</template>

<script>

// import { parseTime } from '@/utils'
import Screenfull from '@/components/Screenfull'
export default {
  name: 'TopHeader',
  components: {
    Screenfull
  },
  data() {
    return {
      nowDate: new Date()
    }
  },
  methods: {}
}
</script>

<style lang="less">
.right-menu-item {
  display: inline-block;
  padding: 0;
  height: 100%;
  font-size: 12px;
  color: #5a5e66;
  vertical-align: text-bottom;

  &.hover-effect {
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
#top-header {
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;

  .header-center-decoration {
    width: 40%;
    height: 60px;
    margin-top: 30px;
  }

  .header-left-decoration,
  .header-right-decoration {
    width: 25%;
    height: 60px;
  }

  .center-title {
    position: absolute;
    font-size: 30px;
    font-weight: bold;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
  }
}
</style>
