<template>
  <div class="app-container">
    <div class="filter-container">
      生产序号：
      <el-input
        v-model="listQuery.jobId"
        clearable
        placeholder="请输入生产序号"
        style="width: 120px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      大张号：
      <el-input
        v-model="listQuery.sheetNum"
        clearable
        placeholder="请输入大张号"
        style="width: 120px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      印码号：
      <el-input
        v-model="listQuery.codeNum"
        clearable
        placeholder="请输入印码"
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
      >
        <el-option
          v-for="item in productOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @keyup.enter.native="handleFilter"
        />
      </el-select>

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

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column label="生产序号" prop="id" sortable="custom" align="center" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.jobId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工序" align="center">
        <template slot-scope="{row}">
          <span>{{ row.operationName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品" align="center">
        <template slot-scope="{row}">
          <span>{{ row.productName }}</span>
        </template>
      </el-table-column>

      <!--    <el-table-column label="未检id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.nckId }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="大张号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sheetNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="印码号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.codeNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="千位" align="center">
        <template slot-scope="{row}">
          <span>{{ row.thousandIndex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="百位" align="center">
        <template slot-scope="{row}">
          <span>{{ row.hundredIndex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="未检原因" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.errFlag===1" effect="dark">普通未检</el-tag>
          <el-tag v-else-if="row.errFlag===2" effect="dark" type="success">机检大张废</el-tag>
          <el-tag v-else-if="row.errFlag===9" effect="dark" type="info">判费大张废</el-tag>
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

import { fetchReportNckList } from '@/api/queryReport'

import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { listOptionReportNck } from '@/api/querySelectOption'

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
  name: 'ReportNckable',
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
      productOption: [],
      operationOption: [],
      dateValue: '',
      listQuery: {
        page: 1,
        limit: 20,
        // useFlag: undefined,
        // importance: undefined,
        jobId: undefined,
        sheetNum: undefined,
        codeNum: undefined,
        productId: undefined,
        operationId: undefined,
        startDate: Date,
        endDate: Date,
        sort: '+id'
      },
      useFlagOptions, // 启用状态
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
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
      fetchReportNckList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        limit: 20,
        // useFlag: undefined,
        // importance: undefined,
        jobId: undefined,
        sheetNum: undefined,
        codeNum: undefined,
        productId: undefined,
        operationId: undefined,
        startDate: Date,
        endDate: Date,
        sort: '+id'
      }
      this.dateValue = ''
    },
    getSelectOption() {
      listOptionReportNck().then(response => {
        this.productOption = response.productOption
        this.operationOption = response.operationOption
      })
    },
    // 立即刷新数据列表
    refreshList() {
      this.listQuery.page = 1
      fetchReportNckList(this.listQuery).then(response => {
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

    handleFilter() {
      this.listQuery.page = 1
      this.listLoading = true
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchReportNckList(this.listQuery).then(response => {
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
      this.refreshList()
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
<style lang="less">

</style>
