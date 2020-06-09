<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" clearable placeholder="请输入大屏名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      大屏：
      <el-select v-model="listQuery.displayPlatformId" clearable filterable placeholder="请搜索或者选择" class="filter-item" style="width: 300px">
        <el-option v-for="item in displayPlatformOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="handleFilter" />
      </el-select>
      设备:
      <el-select v-model="listQuery.machineId" clearable filterable placeholder="请搜索或者选择" class="filter-item" style="width: 130px">
        <el-option v-for="item in machineOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="handleFilter" />
      </el-select>
      状态:
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

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column label="大屏配置序号" prop="id" sortable="custom" align="center" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.infoId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大屏名称" align="center" width="300">
        <template slot-scope="{row}">
          <span v-if="row.displayPlatform!=null">{{ row.displayPlatform.displayPlatformName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备名称" align="center">
        <template slot-scope="{row}">
          <span v-if="row.machine!=null" class="link-type" @click="handleUpdate(row)">{{ row.machine.machineName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="显示顺序" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderNum }}</span>
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
      <el-table-column label="停用时间" width="112" align="center">
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="35%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" size="mini" label-width="125px" style="width: 600px; margin-left:50px;">

        <el-form-item label="大屏" prop="displayPlatformId">
          <el-select v-model="temp.displayPlatformId" clearable filterable placeholder="请搜索或者选择" style="width:300px;">
            <el-option v-for="item in displayPlatformOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备" prop="machineId">
          <el-select v-model="temp.machineId" clearable filterable placeholder="请搜索或者选择" style="width:220px;">
            <el-option v-for="item in machineOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="显示顺序" prop="orderNum">
          <el-input-number v-model="temp.orderNum" clearable-number :min="0" :max="10" controls-position="right" style="width:220px" />
        </el-form-item>
        <!--         <el-form-item label="大屏类别" prop="displayPlatformInfoType">
          <el-input clearable v-model="temp.displayPlatformInfoTypeId" type="text" placeholder="请输入大屏类别" />
        </el-form-item> -->
        <el-form-item label="启用状态" prop="useFlag">
          <el-switch v-model="temp.useFlag" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>

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

import { fetchList, createDisplayPlatformInfo, updateDisplayPlatformInfo, updateUseFlag, deleteDisplayPlatformInfo } from '@/api/displayPlatformInfo'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { listOptionDisplayPlatformInfo } from '@/api/querySelectOption'
// const displayPlatformInfoTypeOptions = []

const useFlagOptions = [
  { key: '0', display_name: '禁用' },
  { key: '1', display_name: '启用' }
]

// arr to obj, such as { CN : "China", US : "USA" }
// const calendarTypeKeyValue = displayPlatformInfoTypeOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

export default {
  name: 'DisplayPlatformInfoTable',
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
        displayPlatformId: undefined,
        machineId: undefined,
        sort: '+id'
      },
      machineOption: [],
      displayPlatformOption: [],
      importanceOptions: [1, 2, 3],
      useFlagOptions, // 启用状态
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        infoId: undefined,
        displayPlatformId: '',
        machineId: '',
        orderNum: '',
        useFlag: true,
        startDate: new Date(),
        endDate: '',
        note: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改大屏',
        create: '添加大屏'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        displayPlatformId: [{ required: true, message: '请选择大屏', trigger: 'blur' }],
        machineId: [{ required: true, message: '请填写设备', trigger: 'blur' }],
        startDate: [{ type: 'date', required: true, message: '请填写开始时间', trigger: 'change' }]

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
    // 获取大屏种类类别oprions
    getOptions() {
      listOptionDisplayPlatformInfo().then(response => {
        this.displayPlatformOption = response.displayPlatformOption
        this.machineOption = response.machineOption
      })
    },
    // 大屏禁用启用操作
    handleModifyUseFlag(row, useFlag) {
      updateUseFlag(row.displayPlatformInfoId).then(response => {
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
        infoId: undefined,
        displayPlatformId: '',
        machineId: '',
        orderNum: '',
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
        useFlag: undefined,
        displayPlatformId: undefined,
        machineId: undefined,
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
      this.getOptions()
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
          createDisplayPlatformInfo(this.temp).then(() => {
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
      this.getOptions()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 修改操作
    updateData() {
      // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
      updateDisplayPlatformInfo(this.temp).then(() => {
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
        deleteDisplayPlatformInfo(row.infoId).then(() => {
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
