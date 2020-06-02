<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" clearable placeholder="请输入机台名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      机长：
      <el-select v-model="listQuery.operatorId" clearable filterable placeholder="请搜索或者选择" class="filter-item" style="width: 130px">
        <el-option v-for="item in operatorOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="handleFilter" />
      </el-select>
      <el-select v-model="listQuery.useFlag" clearable placeholder="状态" class="filter-item" style="width: 130px">
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
      @sort-change="sortChange"
    >
      <el-table-column label="机台序号" prop="id" sortable="custom" align="center" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.workUnitId }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="MES机台代码" align="center">
        <template slot-scope="{row}">
          <span>{{ row.workUnitCodeMes }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="机台编号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.workUnitCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机台名称" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.workUnitName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机长" align="center">
        <template slot-scope="{row}">
          <span v-if="row.operator!=null">{{ row.operator.operatorName }}</span>
        </template>
      </el-table-column>

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

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" size="mini" label-width="125px" style="width: 600px; margin-left:50px;">

        <el-form-item label="机台编号" prop="workUnitCode">
          <el-input v-model="temp.workUnitCode" clearable type="text" placeholder="请输入机台编号" />
        </el-form-item>
        <!-- <el-form-item label="MES机台代码" prop="workUnitCodeMes">
          <el-input clearable v-model="temp.workUnitCodeMes" type="text" placeholder="请输入机台名称" />
        </el-form-item> -->
        <el-form-item label="机台名称" prop="workUnitName">
          <el-input v-model="temp.workUnitName" clearable type="text" placeholder="请输入机台名称" />
        </el-form-item>

        <el-form-item label="机长" prop="operatorId">
          <el-select v-model="temp.operatorId" clearable filterable placeholder="请搜索或者选择">
            <el-option v-for="item in operatorOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="启用状态" prop="useFlag">
          <el-switch v-model="temp.useFlag" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
        <!--  <el-form-item label="启用时间" prop="startDate">
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

import { fetchList, createWorkUnit, updateWorkUnit, updateUseFlag, deleteWorkUnit } from '@/api/workUnit'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { listOptionWorkUnit } from '@/api/querySelectOption'

// const operatorOption = []

const useFlagOptions = [
  { key: '0', display_name: '禁用' },
  { key: '1', display_name: '启用' }
]

// arr to obj, such as { CN : "China", US : "USA" }
// const calendarTypeKeyValue = operatorOption.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

export default {
  name: 'WorkUnitTable',
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
        useFlag: undefined,
        // importance: undefined,
        title: undefined,
        sort: '+id',
        operatorId: ''
      },
      operatorOption: [],
      importanceOptions: [1, 2, 3],
      useFlagOptions, // 启用状态
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        workUnitId: undefined,
        workUnitCode: '',
        workUnitCodeMes: '',
        workUnitName: '',
        operatorId: '',
        useFlag: true,
        startDate: new Date(),
        endDate: '',
        note: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改机台',
        create: '添加机台'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        workUnitCode: [{ required: true, message: '请填写机台编号', trigger: 'blur' }],
        workUnitName: [{ required: true, message: '请填写机台名称', trigger: 'blur' }],
        startDate: [{ type: 'date', required: true, message: '请填写开始时间', trigger: 'change' }]
        // endDate: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]

      },
      downloadLoading: false
    }
  },
  // 初始化获取数据列表
  created() {
    this.getList()
    this.getWorkUnitTypes()
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
    // 获取机台种类类别oprions
    getWorkUnitTypes() {
      listOptionWorkUnit().then(response => {
        this.operatorOption = response.operatorOption
      })
    },
    // 机台禁用启用操作
    handleModifyUseFlag(row, useFlag) {
      updateUseFlag(row.workUnitId).then(response => {
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
        workUnitId: undefined,
        workUnitCode: '',
        workUnitCodeMes: '',
        workUnitName: '',
        operatorId: '',
        useFlag: true,
        startDate: new Date(),
        endDate: '',
        note: ''
      }
      this.operatorOption = []
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        limit: 20,
        useFlag: undefined,
        // importance: undefined,
        title: undefined,
        sort: '+id',
        operatorId: ''
      }
    },
    handleReset() {
      this.resetListQuery()
      this.getList()
    },
    // 监听create dialog事件
    handleCreate() {
      this.resetTemp()
      this.getWorkUnitTypes()
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
          createWorkUnit(this.temp).then(() => {
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

      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.getWorkUnitTypes()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 修改操作
    updateData() {
      // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
      updateWorkUnit(this.temp).then(() => {
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
        deleteWorkUnit(row.workUnitId).then(() => {
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

<style scoped>
  .el-dialog .el-form .el-form-item .el-input{
    width: 220px;
  }
</style>
