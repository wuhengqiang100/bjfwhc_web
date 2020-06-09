<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input clearable v-model="listQuery.title" placeholder="请输入审核参数名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->

      工序：
      <el-select v-model="listQuery.operationId" clearable filterable placeholder="请搜索或者选择" class="filter-item" style="width: 130px">
        <el-option v-for="item in operationOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="handleFilter" />
      </el-select>
      产品：
      <el-select v-model="listQuery.productId" clearable filterable placeholder="请搜索或者选择" class="filter-item" style="width: 130px">
        <el-option v-for="item in productOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="handleFilter" />
      </el-select>
      设备：
      <el-select v-model="listQuery.machineId" clearable filterable placeholder="请搜索或者选择" class="filter-item" style="width: 130px">
        <el-option v-for="item in machineOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="handleFilter" />
      </el-select>
      参数类别：
      <el-select v-model="listQuery.judgeCheckTypeId" clearable filterable placeholder="请搜索或者选择" class="filter-item" style="width: 130px">
        <el-option v-for="item in judgeCheckTypeOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="handleFilter" />
      </el-select>
      <el-select v-model="listQuery.useFlag" clearable filterable placeholder="状态" class="filter-item" style="width: 130px">
        <el-option v-for="item in useFlagOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh" @click="handleReset">
        重置
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
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
      size="medium "
      @sort-change="sortChange"
    >
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
      <el-table-column label="设备" align="center" min-width="140px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.machineName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核参数" align="center" min-width="200px">
        <template slot-scope="{row}">
          <span>{{ row.values }}</span>
        </template>
      </el-table-column>
      <!--
      <el-table-column v-for="(item,index) in details" :key="index" label="item[0].name" align="center">
        <template slot-scope="{row}">
          <span>{{ item[0].value }}</span>
        </template>
      </el-table-column> -->
      <!-- 自定义列的遍历-->
      <!--  <div v-for="item in details" :key="item">
          <div v-for="s in item" :key="s">
            <template>
              <span>{{ s.value }}</span>
            </template>

          </div>

        </el-table-column>

      </div> -->

      <el-table-column label="启用状态" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.useFlag" type="success">
            启用
          </el-tag>
          <el-tag v-else type="danger">
            禁用
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="启用时间" min-width="130" align="center">
        <template v-if="row.startDate !== null" slot-scope="{row}">
          <span>{{ row.startDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="停用时间" width="130" align="center">
        <template v-if="row.endDate !==null" slot-scope="{row}">
          <span>{{ row.endDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="说明" min-width="130px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" min-width="218px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <!--           <el-button v-if="row.useFlag" size="mini" type="warning" @click="handleModifyUseFlag(row,false)">禁用</el-button>
          <el-button v-else size="mini" type="success" @click="handleModifyUseFlag(row,true)">启用</el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" :page-sizes="pageSizes" @pagination="getList" />

    <ul>
      <li v-for="item in details" :key="item">
        <div v-for="s in item" :key="s">
          {{ s.name }}++{{ s.value }}
        </div>

      </li>
    </ul>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" size="mini" label-width="125px" style="width: 800px; margin-left:50px;">
        <el-row>
          <el-col :span="12">
            <el-form-item label="工序" prop="operationId">
              <el-select v-if="dialogStatus==='update'" v-model="temp.operationId" clearable filterable placeholder="请搜索或者选择" disabled>
                <el-option v-for="item in operationOption" :key="item.value" :label="item.label" :value="item.value" />
                <el-option v-for="item in operationOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-else v-model="temp.operationId" clearable filterable placeholder="请搜索或者选择">
                <el-option v-for="item in operationOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="产品" prop="productId">
              <el-select v-if="dialogStatus==='update'" v-model="temp.productId" clearable filterable placeholder="请搜索或者选择" disabled>
                <el-option v-for="item in productOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-select v-else v-model="temp.productId" clearable filterable placeholder="请搜索或者选择">
                <el-option v-for="item in productOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="设备" prop="machineId">
              <el-select v-model="temp.machineId" clearable filterable placeholder="请搜索或者选择">
                <el-option v-for="item in machineOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="启用状态" prop="useFlag">
              <el-switch v-model="temp.useFlag" active-color="#13ce66" inactive-color="#ff4949" />
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="temp.note" clearable style="width:220px;" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入备注" />
            </el-form-item>

            <!-- <el-form-item label="审核参数种类" prop="judgeCheckTypeId">
              <el-select clearable  v-model="temp.judgeCheckTypeId" filterable placeholder="请搜索或者选择">
                <el-option v-for="item in judgeCheckTypeOption" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item> -->
          </el-col>
          <el-col :span="12">
            <el-form-item v-for="(item,index) in judgeCheckTypeOption" :key="item.value" :label="item.label">
              <!-- <el-input clearable v-model="temp.values[index]" type="text" placeholder="请输入参数值" /> -->
              <el-input v-model="temp.values[index]" clearable-number :min="0" :max="20000" controls-position="right" style="width:240px" />
            </el-form-item>
          </el-col>
          <!--  <el-col :span="12">
            <el-form-item v-for="(item,index) in judgeCheckTypeOption" :key="item.value" :label="item.label">
              <el-input clearable v-model="temp.valueData[index]" type="text" placeholder="请输入参数值" />
            </el-form-item>
          </el-col> -->
        </el-row>
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

import { fetchList, createAuditParameter, updateAuditParameter, updateUseFlag, deleteAuditParameter } from '@/api/auditParameter'
import { listOptionAuditParameter, listOptionAuditParameterByIds } from '@/api/querySelectOption'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

// const judgeCheckTypeOption = []

const useFlagOptions = [
  { key: '0', display_name: '禁用' },
  { key: '1', display_name: '启用' }
]

// arr to obj, such as { CN : "China", US : "USA" }
// const calendarTypeKeyValue = judgeCheckTypeOption.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

export default {
  name: 'AuditParameterTable',
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
      details: [],
      total: 0,
      listLoading: true,
      pageSizes:	[1000, 2000, 3000, 40000, 5000],
      listQuery: {
        page: 1,
        limit: 1000,
        useFlag: undefined,
        // importance: undefined,
        title: undefined,
        sort: '+id'
      },
      judgeCheckTypeOption: [],
      operationOption: [],
      productOption: [],
      machineOption: [],
      importanceOptions: [1, 2, 3],
      useFlagOptions, // 启用状态
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        operationId: '',
        productId: '',
        machineId: '',
        values: [0, 0, 0],
        useFlag: true,
        note: ''
      },
      TempUpdataOrDelete: {
        operationId: '',
        productId: '',
        machineId: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改审核参数',
        create: '添加审核参数'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        operationId: [{ required: true, message: '请选择工序', trigger: 'blur' }],
        productId: [{ required: true, message: '请选择产品', trigger: 'blur' }]
        // endDate: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]

      },
      downloadLoading: false
    }
  },
  // 初始化获取数据列表
  created() {
    this.getList()
    this.getAuditParameterTypes()
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
    getDetails(row) {
      console.log('row', row)
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
    // 获取审核参数种类类别oprions
    getAuditParameterTypes() {
      listOptionAuditParameter().then(response => {
        this.judgeCheckTypeOption = response.judgeCheckTypeOption
        this.operationOption = response.operationOption
        this.productOption = response.productOption
        this.machineOption = response.machineOption
      })
    },
    getAuditParameterTypesByIds(data) {
      listOptionAuditParameterByIds(data).then(response => {
        this.judgeCheckTypeOption = response.judgeCheckTypeOption
        this.operationOption = response.operationOption
        this.productOption = response.productOption
        this.machineOption = response.machineOption
        for (let index = 0; index < this.judgeCheckTypeOption.length; index++) {
          this.temp.values[index] = this.judgeCheckTypeOption[index].valueData
        }
        return true
      })
      return true
    },
    // 审核参数禁用启用操作
    handleModifyUseFlag(row, useFlag) {
      updateUseFlag(row.judgeCheckId).then(response => {
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
        operationId: '',
        productId: '',
        machineId: '',
        values: [0, 0, 0],
        useFlag: true,
        note: ''
      }
    },
    resetDeleteTemp() {
      this.TempUpdataOrDelete = {
        operationId: '',
        productId: '',
        machineId: ''
      }
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        limit: 1000,
        useFlag: undefined,
        // importance: undefined,
        title: undefined,
        sort: '+id'
      }
    },
    handleReset() {
      this.resetListQuery()
      this.getList()
    },
    // 监听create dialog事件
    handleCreate() {
      this.resetTemp()
      this.getAuditParameterTypes()
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
        if (valid) {
          createAuditParameter(this.temp).then(() => {
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
      this.resetTemp()

      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)

      // 获取参数的值
      this.TempUpdataOrDelete.operationId = row.operationId
      this.TempUpdataOrDelete.productId = row.productId
      this.TempUpdataOrDelete.machineId = row.machineId

      this.getAuditParameterTypesByIds(this.TempUpdataOrDelete)

      this.temp.operationId = row.operationId
      this.temp.productId = row.productId
      if (row.machineId !== '') {
        this.temp.machineId = row.machineId
      }
      // this.temp.values = row.values
      // this.temp.useFlag = row.useFlag
      // this.temp.note = row.note
      console.log(this.temp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 修改操作
    updateData() {
      // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
      updateAuditParameter(this.temp).then(() => {
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
        this.TempUpdataOrDelete.operationId = row.operationId
        this.TempUpdataOrDelete.productId = row.productId
        this.TempUpdataOrDelete.machineId = row.machineId

        deleteAuditParameter(this.TempUpdataOrDelete).then(() => {
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

<style lang="scss">
 .names_algin {
  text-align-last:justify;
	text-align:justify;
	text-justify:distribute-all-lines; // 这行必加，兼容ie浏览器
  font-size: 48px;
 }
   .el-dialog .el-form .el-form-item .el-input{
    width: 220px;
  }

</style>
