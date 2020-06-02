/* eslint-disable vue/no-unused-components */
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input clearable v-model="listQuery.title" placeholder="请输入上传日志名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      <div class="filter-item">
        <el-date-picker
          v-model="dateValue"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:01', '23:59:59']"
          value-format="yyyy-MM-dd HH:mm:ss"
          @keyup.enter.native="handleFilter"
        />
      </div>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-refresh"
        @click="handleReset"
      >
        重置
      </el-button>

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="上传日志id"
        prop="id"
        sortable="custom"
        align="center"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.dataupSetId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上传人员名称"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.operatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="说明"
        align="center"
        min-width="200px"
      >
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上传时间"
        min-width="200px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.dateupSetDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>

import { fetchDataUpList } from '@/api/verifyLog'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const machineTypeOptions = []

const useFlagOptions = [
  { key: '0', display_name: '禁用' },
  { key: '1', display_name: '启用' }
]

const calendarTypeKeyValue = machineTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'DataupLogTable',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      dateValue: '',

      listQuery: {
        page: 1,
        limit: 20,
        // useFlag: undefined,
        // importance: undefined,
        title: undefined,
        sort: '+id',
        startDate: Date,
        endDate: Date
      },
      importanceOptions: [1, 2, 3],
      useFlagOptions, // 启用状态
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        machineId: undefined,
        machineCode: '',
        machineName: '',
        useFlag: true,
        startDate: new Date(),
        endDate: '',
        note: '',
        imageModelNum: '',
        imageModelPath: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改上传日志',
        create: '添加上传日志'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        machineCode: [{ required: true, message: '请填写上传日志code', trigger: 'blur' }],
        machineName: [{ required: true, message: '请填写上传日志name', trigger: 'blur' }],
        startDate: [{ type: 'date', required: true, message: '请填写开始时间', trigger: 'change' }]
        // endDate: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]

      },
      downloadLoading: false
    }
  },
  // 初始化获取数据列表
  created() {
    this.getList()
  },
  methods: {
    // 有加载圈的加载数据列表
    getList() {
      this.listLoading = true
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchDataUpList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    /*     getMachineTypes() {
      fetchMachineTypeList().then(response => {
        console.log('tag', response.data)
        this.machineTypeOptions = response.data
        console.log('tag', this.machineTypeOptions)
      })
    }, */
    // 立即刷新数据列表
    refreshList() {
      this.listQuery.page = 1
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchDataUpList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    // id排序操作
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    // 重置temp实体类变量属性
    resetTemp() {
      this.temp = {
        machineId: undefined,
        machineCode: '',
        machineName: '',
        useFlag: true,
        startDate: new Date(),
        endDate: '',
        note: '',
        imageModelNum: '',
        imageModelPath: ''
      }
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        limit: 20,
        // useFlag: undefined,
        // importance: undefined,
        title: undefined,
        sort: '+id',
        startDate: Date,
        endDate: Date
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.listLoading = true
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchDataUpList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    handleReset() {
      this.resetListQuery()
      this.getList()
    },
    // 上传日志禁用启用操作
    /*    handleModifyUseFlag(row, useFlag) {
      updateUseFlag(row.machineId).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.refreshList()
      })

      row.status = status
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },

    handleReset() {
      this.resetListQuery()
      this.getList()
    },
    // 监听create dialog事件
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 添加操作
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        // date格式化
        this.temp.startDate = parseTime(this.temp.startDate)
        if (this.temp.endDate !== '') {
          this.temp.endDate = parseTime(this.temp.endDate)
        }

        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createMachine(this.temp).then(() => {
            this.refreshList()
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 监听修改 update dialog事件
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 修改操作
    updateData() {
      // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
      updateMachine(this.temp).then(() => {
        this.refreshList()
        // this.list.unshift(this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 监听删除dialog事件
    handleDelete(row) {
      this.$confirm('您确定要删除该数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMachine(row.machineId).then(() => {
          this.refreshList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    }, */
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}
</script>

<style scoped>
.el-dialog .el-form .el-form-item .el-input {
  width: 300px;
}
</style>
