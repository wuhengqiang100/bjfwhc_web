<template>
  <div class="app-container">
    <div class="filter-container">
      车号：
      <el-input
        v-model="listQuery.cartNumber"
        clearable
        placeholder="请输入车号"
        style="width: 120px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      工序：
      <el-select
        v-model="listQuery.operationId"
        clearable
        filterable
        placeholder="请搜索或者选择"
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in operationOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          class="filter-item"
          style="width: 130px"
          @keyup.enter.native="handleFilter"
        />
      </el-select>
      产品：
      <el-select
        v-model="listQuery.productId"
        clearable
        filterable
        placeholder="请搜索或者选择"
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in productOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @keyup.enter.native="handleFilter"
        />
      </el-select>

      设备：
      <el-select
        v-model="listQuery.machineId"
        clearable
        filterable
        placeholder="请搜索或者选择"
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in machineOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @keyup.enter.native="handleFilter"
        />
      </el-select>

      机台：
      <el-select
        v-model="listQuery.workUnitId"
        clearable
        filterable
        placeholder="请搜索或者选择"
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in dicWorkUnitOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @keyup.enter.native="handleFilter"
        />
      </el-select>

      <div class="filter-item">
        <el-date-picker
          v-model="dateValue"
          type="datetimerange"
          align="right"
          :clearable="false"
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
        label="生产日志序号"
        prop="id"
        sortable="custom"
        align="center"
        :class-name="getSortClass('id')"
        width="110"
      >
        <template slot-scope="{row}">
          <span>{{ row.logId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="生产车号"
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.cartNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="工序名称"
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.operationName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="产品名称"
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.productName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="设备名称"
        align="center"
        width="125"
      >
        <template slot-scope="{row}">
          <span>{{ row.machineName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="机台名称"
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.workUnitName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总数" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.infoNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="检测报错条数"
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.machineWasterNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="未检条数"
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.nocheckNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="判费数量"
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.judgeWasterNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="人员名称"
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          <span>{{ row.operatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="说明"
        align="center"
        width="100"
      >
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
      <!-- //自动审核标志: 0 未设定 1 自动审核 2 人工审核 -->
      <el-table-column label="审核标志" min-width="100">
        <template slot-scope="{row}">
          <el-tag v-if="row.autoCheckFlag===0" effect="dark" type="success">未设定</el-tag>
          <el-tag v-else-if="row.autoCheckFlag===1" effect="dark" type="info">自动审核</el-tag>
          <el-tag v-else-if="row.autoCheckFlag===2" effect="dark" type="warning">人工审核</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="审核时间"
        align="center"
        min-width="130"
      >
        <template
          v-if="row.checkDate !==null"
          slot-scope="{row}"
        >
          <span>{{ row.checkDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="开始时间"
        align="center"
        min-width="130"
      >
        <template
          v-if="row.startDate !==null"
          slot-scope="{row}"
        >
          <span>{{ row.startDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间"
        align="center"
        min-width="130"
      >
        <template
          v-if="row.endDate !==null"
          slot-scope="{row}"
        >
          <span>{{ row.endDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <!--       <el-table-column label="操作" fixed="right" align="center" min-width="218px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-if="row.useFlag" size="mini" type="warning" @click="handleModifyUseFlag(row,false)">禁用</el-button>
          <el-button v-else size="mini" type="success" @click="handleModifyUseFlag(row,true)">启用</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>

        </template>
      </el-table-column> -->
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

// import { fetchList, fetchPv, createMachine, updateMachine, updateUseFlag, deleteMachine } from '@/api/machine'
import { fetchCheckQueryList } from '@/api/verifyLog'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { listOptionMachineQuery } from '@/api/querySelectOption'

const machineTypeOptions = []

const useFlagOptions = [
  { key: '0', display_name: '禁用' },
  { key: '1', display_name: '启用' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = machineTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ProduceLogTable',
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
      listLoading: false,
      operationOption: [],
      productOption: [],
      machineOption: [],
      dicWorkUnitOption: [],
      dateValue: '',
      listQuery: {
        page: 1,
        limit: 20,
        // useFlag: undefined,
        // importance: undefined,
        cartNumber: undefined,
        productId: undefined,
        operationId: undefined,
        machineId: undefined,
        workUnitId: undefined,
        startDate: Date,
        endDate: Date,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      useFlagOptions, // 启用状态
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        logId: Number, // 生产日志id
        itemFlag: Number, // 操作标志
        qainfonum: Number, // 信息数量
        qawasternum: Number, // 报错数量
        sminfonum: Number, // 识码数量
        jobId: Number, // 基础生产信息主键id
        cartNumber: '', // 生产车号（大万编号）
        startDate: new Date(),
        endDate: new Date(),
        productId: Number, // 产品id
        productName: '', // 产品名称
        operationId: Number, // 工序id
        operationName: '', // 工序名称
        operatorId: Number, // 人员序号
        operatorName: '', // 人员名称
        machineId: Number, // 设备主键id
        machineName: '', // 设备名称
        workUnitId: Number, // 机台主键
        workUnitName: '', // 机台名称
        inspectmId: Number, // 主键
        machineWasterNumber: Number, // 整万错误数量
        infoNumber: Number// 整万信息数量

      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改生产日志',
        create: '添加生产日志'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        machineCode: [{ required: true, message: '请填写生产日志code', trigger: 'blur' }],
        machineName: [{ required: true, message: '请填写生产日志name', trigger: 'blur' }],
        startDate: [{ type: 'date', required: true, message: '请填写开始时间', trigger: 'change' }]
        // endDate: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]

      },
      downloadLoading: false
    }
  },
  // 初始化获取数据列表
  created() {
    this.getSelectOption()// 获取查询的条件options
    // this.getList()
  },
  mounted: function() {
    var myDate = new Date()
    myDate.setDate(myDate.getDate() - 2)
    this.dateValue = [myDate, new Date()]
    // this.timeNow = myDate.toLocaleDateString()
  },
  methods: {
    // 有加载圈的加载数据列表
    getList() {
      this.listLoading = true
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchCheckQueryList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    getSelectOption() {
      listOptionMachineQuery().then(response => {
        this.productOption = response.productOption
        this.machineOption = response.machineOption
        this.operationOption = response.operationOption
        this.dicWorkUnitOption = response.dicWorkUnitOption
      })
    },
    // 立即刷新数据列表
    refreshList() {
      this.listQuery.page = 1
      fetchCheckQueryList(this.listQuery).then(response => {
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
        cartNumber: undefined,
        productId: undefined,
        operationId: undefined,
        machineId: undefined,
        workUnitId: undefined,
        // startDate: Date,
        // endDate: Date,
        sort: '+id'
      }
      this.dateValue = ''
    },
    handleFilter() {
      this.listQuery.page = 1
      this.listLoading = true
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchCheckQueryList(this.listQuery).then(response => {
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
    // 生产日志禁用启用操作
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
