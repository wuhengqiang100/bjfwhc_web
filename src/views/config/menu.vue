/* eslint-disable vue/no-unused-components */
<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="网站菜单" class="tab-pane">
        <BMenu />
      </el-tab-pane>
      <el-tab-pane label="操作权限" class="tab-pane">
        <CMenu />
      </el-tab-pane>
      <el-tab-pane label="系统配置" class="tab-pane">
        <system />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>

import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import BMenu from '@/views/config/menu/bMenu'
import CMenu from '@/views/config/menu/cMenu'
import system from '@/views/config/menu/system'

export default {
  name: 'MenuTable',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination, BMenu, CMenu, system },
  directives: { waves },
  filters: {

  },
  data() {
    return {
    }
  },
  // 初始化获取数据列表
  created() {

  },
  methods: {
  }
}
</script>

<style scoped>
  .el-dialog .el-form .el-form-item .el-input {
    width: 300px;
  }
  .tab-pane {
    width:100%;
    min-height:900px;
  }
</style>
