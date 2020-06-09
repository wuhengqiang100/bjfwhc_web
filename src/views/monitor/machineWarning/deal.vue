<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" clearable placeholder="请输入报警名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      设备：
      <el-select v-model="listQuery.machineId" clearable filterable placeholder="请搜索或者选择" class="filter-item" style="width: 130px">
        <el-option v-for="item in machineOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="handleFilter" />
      </el-select>
      人员：
      <el-select v-model="listQuery.operatorId" clearable filterable placeholder="请搜索或者选择" class="filter-item" style="width: 130px">
        <el-option v-for="item in operatorOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="handleFilter" />
      </el-select>
      状态
      <el-select v-model="listQuery.logState" clearable filterable placeholder="状态" class="filter-item" style="width: 130px">
        <el-option v-for="item in useFlagOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh" @click="handleReset">
        重置
      </el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button> -->
      <!--     <el-button class="filter-item" style="margin-left: 10px;" type="warning" icon="el-icon-download" @click="handleCreate">
        导入
      </el-button> -->
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
      <el-table-column label="报警序号" prop="id" sortable="custom" align="center" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.logId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备" align="center">
        <template slot-scope="{row}">
          <span v-if="row.machine!=null">{{ row.machine.machineName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报警信息" min-width="130px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日志级别" width="80px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.logType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报警时间" min-width="130" align="center">
        <template v-if="row.logDate !== null" slot-scope="{row}">
          <span>{{ row.logDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理状态" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.logState" type="success">
            已处理
          </el-tag>
          <el-tag v-else type="danger">
            未处理
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="处理人员" align="center">
        <template slot-scope="{row}">
          <span v-if="row.operator!=null">{{ row.operator.operatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理时间" width="112" align="center">
        <template v-if="row.dealDate !==null" slot-scope="{row}">
          <span>{{ row.dealDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" min-width="218px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <!-- <el-button type="primary" size="mini" @click="handleUpdate(row)">修改</el-button> -->
          <!-- <el-button v-if="row.logState" size="mini" type="warning" @click="handleDealWarning(row,false)">已处理</el-button>
          <el-button v-else size="mini" type="success" @click="handleDealWarning(row,true)">未处理</el-button> -->
          <el-button v-if="row.logState===0" size="mini" type="success" @click="handleDealWarning(row,true)">处理</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button> -->

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="35%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" size="mini" label-width="125px" style="width: 600px; margin-left:50px;">

        <el-form-item label="报警编号" prop="operationCode">
          <el-input v-model="temp.operationCode" clearable type="text" placeholder="请输入报警编号" />
        </el-form-item>
        <el-form-item label="报警名称" prop="operationName">
          <el-input v-model="temp.operationName" clearable type="text" placeholder="请输入报警名称" />
        </el-form-item>
        <el-form-item label="报警种类" prop="operationTypeId">
          <el-select v-model="temp.operationTypeId" clearable filterable placeholder="请搜索或者选择">
            <el-option v-for="item in operationTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!--         <el-form-item label="报警类别" prop="operationType">
          <el-input clearable v-model="temp.operationTypeId" type="text" placeholder="请输入报警类别" />
        </el-form-item> -->
        <el-form-item label="启用状态" prop="useFlag">
          <el-switch v-model="temp.useFlag" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
        <!--     <el-form-item label="启用时间" prop="startDate">
          <el-date-picker v-model="temp.startDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择一个开始时间" />
        </el-form-item>
        <el-form-item label="停用时间" prop="endDate">
          <el-date-picker v-model="temp.endDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择一个结束时间" />

        </el-form-item> -->

        <el-form-item label="备注">
          <el-input v-model="temp.note" clearable style="width:220px;" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入备注" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          返回
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { fetchList, dealMachineWarning } from '@/api/machineWarning'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { listOptionMachineWarningDeal } from '@/api/querySelectOption'

// const operationTypeOptions = []

const useFlagOptions = [
  { key: '0', display_name: '未处理' },
  { key: '1', display_name: '已处理' }
]

// arr to obj, such as { CN : "China", US : "USA" }
// const calendarTypeKeyValue = operationTypeOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

export default {
  name: 'OpatTable',
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
      // return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        logState: '0',
        machineId: undefined,
        operatorId: undefined,
        sort: '+id'
      },
      machineOption: [],
      operatorOption: [],
      importanceOptions: [1, 2, 3],
      useFlagOptions, // 处理状态
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        operationId: undefined,
        operationCode: '',
        operationName: '',
        operationTypeId: '',
        useFlag: true,
        startDate: new Date(),
        endDate: '',
        note: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改报警',
        create: '添加报警'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // operationCode: [{ required: true, message: '请填写报警编号', trigger: 'blur' }],
        // operationName: [{ required: true, message: '请填写报警名称', trigger: 'blur' }],
        // startDate: [{ type: 'date', required: true, message: '请填写开始时间', trigger: 'change' }]
        // endDate: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]

      },
      downloadLoading: false
    }
  },
  // 初始化获取数据列表
  created() {
    this.getOptions()
    this.getList()
  },
  methods: {
    // 有加载圈的加载数据列表
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    // 立即刷新数据列表
    refreshList() {
      this.listQuery.page = 1
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    // 获取查询条件的option
    getOptions() {
      listOptionMachineWarningDeal().then(response => {
        this.machineOption = response.machineOption
        this.operatorOption = response.operatorOption
      })
    },
    // 处理报警信息
    handleDealWarning(row, logState) {
      dealMachineWarning(row.logId).then(response => {
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
        operationId: undefined,
        operationCode: '',
        operationName: '',
        operationTypeId: '',
        useFlag: true,
        startDate: new Date(),
        endDate: '',
        note: ''
      }
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        limit: 20,
        logState: '0',
        machineId: undefined,
        operatorId: undefined,
        sort: '+id'
      }
    },
    handleReset() {
      this.resetListQuery()
      this.getList()
    },

    // 监听修改 update dialog事件
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.getOperationTypes()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 修改操作
    updateData() {
      // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
      dealMachineWarning(this.temp).then(() => {
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
        dealMachineWarning(row.operationId).then(() => {
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

<style lang="sass">
  // .el-dialog .el-form .el-form-item .el-input {
  //   width: 220px;
  // }
</style>>

