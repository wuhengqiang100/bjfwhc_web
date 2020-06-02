/* eslint-disable vue/no-unused-components */
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input clearable v-model="listQuery.title" placeholder="请输入菜单日志名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" /> -->
      <el-input
        v-model="listQuery.title"
        clearable
        placeholder="请输入菜单名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
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
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      row-key="functionId"
      highlight-current-row
      style="width: 100%;"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >

      <el-table-column
        type="selection"
        width="36"
      />
      <el-table-column
        label="菜单id"
        prop="id"
        sortable="custom"
        align="center"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.functionId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单名称" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="模块name" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="链接地址" min-width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="请求组件" min-width="130px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.component }}</span>
        </template>
      </el-table-column>

      <el-table-column label="菜单图标" min-width="80px" align="center">
        <template slot-scope="{row}">
          <span><svg-icon :icon-class="row.icon" /></span>

        </template>
      </el-table-column>

      <el-table-column label="重定向" align="center">
        <template slot-scope="{row}">
          <span>{{ row.redirect }}</span>
        </template>
      </el-table-column>
      <el-table-column label="父类id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.parentId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="子模块联集" align="center">
        <template slot-scope="{row}">
          <span>{{ row.childrenIds }}</span>
        </template>
      </el-table-column>
      <el-table-column label="缓存" align="center" min-width="60px">
        <template slot-scope="{row}">
          <span>{{ row.noCache }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模块排序" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column label="显示状态" align="center" min-width="60px">
        <template slot-scope="{row}">
          <span>{{ row.hidden }}</span>
        </template>
      </el-table-column>

      <el-table-column label="角色权限" align="center" min-width="60px">
        <template slot-scope="{row}">
          <span>{{ row.roles }}</span>
        </template>
      </el-table-column>

      <el-table-column label="根路由显示" align="center" min-width="60px">
        <template slot-scope="{row}">
          <span>{{ row.alwaysShow }}</span>
        </template>
      </el-table-column>

      <el-table-column label="面包屑显示" align="center" min-width="60px">
        <template slot-scope="{row}">
          <span>{{ row.breadcrumb }}</span>
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
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="50%"
      top="	5vh"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        size="mini"
        label-width="100px"
        style="width: 700px; margin-left:2px;"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="title">
              <el-input v-model="temp.title" clearable type="text" placeholder="请输入菜单名称" />
            </el-form-item>
            <el-form-item label="模块名称" prop="name">
              <el-input v-model="temp.name" clearable type="text" placeholder="请输入模块名称" />
            </el-form-item>
            <el-form-item label="路由地址" prop="path">
              <el-input v-model="temp.path" clearable type="text" placeholder="请输入路由地址" />
            </el-form-item>
            <el-form-item label="请求组件" prop="icon">
              <el-input v-model="temp.icon" clearable type="text" placeholder="请输入菜单图标" />
            </el-form-item>
            <el-form-item label="菜单图标" prop="component">
              <el-input v-model="temp.component" clearable type="text" placeholder="请输入请求组件" />
            </el-form-item>
            <el-form-item label="重定向" prop="redirect">
              <el-input v-model="temp.redirect" clearable type="text" placeholder="请输入重定向地址" />
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="父菜单" prop="parentId">
              <el-input v-model="temp.parentId" clearable type="text" placeholder="请输入父菜单" />
            </el-form-item>
            <el-form-item label="子菜单" prop="childrenIds">
              <el-input v-model="temp.childrenIds" clearable type="text" placeholder="请输入子菜单" />
            </el-form-item>
            <el-form-item label="缓存" prop="noCache">
              <el-input v-model="temp.noCache" clearable type="text" placeholder="请输入缓存" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="temp.sort" clearable type="text" placeholder="请输入排序" />
            </el-form-item>
            <el-form-item label="显示状态" prop="hidden">
              <el-input v-model="temp.hidden" clearable type="text" placeholder="请输入显示状态" />
            </el-form-item>
            <el-form-item label="根路由显示" prop="alwaysShow">
              <el-input v-model="temp.alwaysShow" clearable type="text" placeholder="请输入根路由显示" />
            </el-form-item>
            <el-form-item label="面包屑显示" prop="breadcrumb">
              <el-input v-model="temp.breadcrumb" clearable type="text" placeholder="请输入面包屑显示" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          返回
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { fetchBmenuList, createCmenu, updateCmenu } from '@/api/menu'
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
  name: 'BMenu',
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
      multipleSelection: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      dateValue: '',

      listQuery: {
        page: 1,
        limit: 20,
        useFlag: undefined,
        // importance: undefined,
        title: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      useFlagOptions, // 启用状态
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        functionId: undefined,
        functIonCode: '',
        name: '',
        title: '',
        parentId: '',
        childrenIds: '',
        sort: '',
        path: '',
        hidden: '',
        roles: '',
        delFlag: '',
        component: '',
        alwaysShow: '',
        icon: '',
        noCache: '',
        breadcrumb: '',
        redirect: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改菜单',
        create: '添加菜单'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        machineCode: [{ required: true, message: '请填写菜单日志code', trigger: 'blur' }],
        machineName: [{ required: true, message: '请填写菜单日志name', trigger: 'blur' }],
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

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      // val 是整个行对象
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    // 有加载圈的加载数据列表
    getList() {
      this.listLoading = true
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchBmenuList(this.listQuery).then(response => {
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
      fetchBmenuList(this.listQuery).then(response => {
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
        useFlag: undefined,
        // importance: undefined,
        title: undefined,
        sort: '+id'
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.listLoading = true
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchBmenuList(this.listQuery).then(response => {
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
    // 监听create dialog事件
    handleCreate() {
      // this.resetTemp()
      // 获取权限menuTree
      // this.getRoleMenus()
      // this.$refs.tree.setCheckedKeys([])
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 添加操作
    createData() {
      // console.log(this.$refs.tree.getCheckedKeys())
      this.$refs['dataForm'].validate((valid) => {
        // this.temp.menuIds = this.$refs.tree.getCheckedKeys()
        // this.temp.checkedPermiss = this.checkedcPermiss
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createCmenu(this.temp).then(() => {
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
      this.getRoleMenus()
      this.getRoleOwnMenus(this.temp.roleId)
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
      this.temp.menuIds = this.$refs.tree.getCheckedKeys()
      this.temp.checkedPermiss = this.checkedcPermiss
      // this.list.unshift(this.temp)
      this.dialogFormVisible = false
      console.log(this.temp)

      updateCmenu(this.temp).then(() => {
        this.refreshList()
        this.resetTemp()
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
  width: 220px;
}
</style>
