<template>
  <div class="app-container">
    <div class="filter-container">
      车号：
      <el-input
        v-model="listQuery.title"
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
      操作人：
      <el-select
        v-model="listQuery.operatorId"
        clearable
        filterable
        placeholder="请搜索或者选择"
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in operatorOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @keyup.enter.native="handleFilter"
        />
      </el-select>

      <div class="filter-item">
        <el-date-picker
          v-model="dateValue"
          :clearable="false"
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
      <!--  <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
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
      <el-table-column
        label="生产日志序号"
        prop="id"
        sortable="custom"
        align="center"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.logProdId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="车号"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.cartNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="产品名称"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.product.productName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="工序名称"
        align="center"
      >
        <template slot-scope="{row}">
          <span v-if="row.operation!==null">{{ row.operation.operationName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="人员名称"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.operatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="日志类型"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.logType }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="日志时间"
        width="200px"
        align="center"
      >
        <template slot-scope="{row}">
          <span v-if="row.logDate!==null">{{ row.logDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="开始时间"
        width="200px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.startDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间"
        width="200"
        align="center"
      >
        <template
          v-if="row.endDate !==null"
          slot-scope="{row}"
        >
          <span>{{ row.endDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="执行次数"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.actionCount }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="说明"
        min-width="120px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="进度标志"
        align="center"
      >
        <template slot-scope="{row}">
          <!-- <span>{{ row.itemFlag }}</span> -->
          <el-tag v-if="row.itemFlag===0" effect="dark">未完成</el-tag>
          <el-tag v-else-if="row.itemFlag===1" effect="dark" type="success">完成</el-tag>
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

// import { fetchList, fetchPv, createMachine, updateMachine, updateUseFlag, deleteMachine } from '@/api/machine'
import { fetchProduceList } from '@/api/verifyLog'
import { listOptionProduceLog } from '@/api/querySelectOption'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

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
  name: 'OperationLogTable',
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
      dateValue: '',
      productOption: [],
      operationOption: [],
      operatorOption: [],
      listQuery: {
        page: 1,
        limit: 20,
        productId: '',
        operationId: '',
        operatorId: '',
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
  methods: {
    // 有加载圈的加载数据列表
    getList() {
      this.listLoading = true
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchProduceList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    getSelectOption() {
      listOptionProduceLog().then(response => {
        this.productOption = response.productOption
        this.operatorOption = response.operatorOption
        this.operationOption = response.operationOption
      })
    },
    // 立即刷新数据列表
    refreshList() {
      this.listQuery.page = 1
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchProduceList(this.listQuery).then(response => {
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
        cartNumber: undefined,
        productName: undefined,
        operationName: undefined,
        machineName: undefined,
        workUnitName: undefined,
        sort: '+id'
      }
    },
    handleFilter() {
      this.listQuery.page = 1

      if (this.dateValue !== '') {
        this.listLoading = true
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
        fetchProduceList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 1 * 1000)
        })
      } else {
        this.$message({
          message: '请选择时间',
          type: 'success'
        })
        return false
      }
    },
    handleReset() {
      this.resetListQuery()
      // this.getList()
      this.handleFilter()
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

<style scoped>
.el-dialog .el-form .el-form-item .el-input {
  width: 300px;
}
</style>
