<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        clearable
        placeholder="请输入角色名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-select
        v-model="listQuery.useFlag"
        clearable
        placeholder="状态"
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in useFlagOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
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
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>
      <!--     <el-button class="filter-item" style="margin-left: 10px;" type="warning" icon="el-icon-download" @click="handleCreate">
        导入
      </el-button> -->
    </div>
    <el-row :gutter="5">
      <el-col :span="3">
        <h5>默认颜色</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <!--           <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu> -->
          <el-menu-item index="2">
            <i class="el-icon-menu" />
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document" />
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting" />
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
        <!--    <el-card class="box-card"
                 body-style="padding-left:15px;padding-top:5px;padding-right:5px;padding-bottom: 5px;text-algin:center;algin-center:true">
          <div slot="header"
               class="clearfix">
            <span>系统名称</span>
            <el-button style="float: right; padding: 3px 0"
                       type="text">添加</el-button>
          </div>
          <div v-for="o in 5"
               :key="o"
               class="text item"
               style="margin-top:4px">
            <el-button size="medium"
                       style="min-width:120px;max-width:140px;"
                       type="success"
                       plain> {{'石家庄核查系统' + o }}</el-button>
          </div>
        </el-card> -->
      </el-col>
      <el-col :span="20">
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
            label="角色id"
            prop="id"
            sortable="custom"
            align="center"
            :class-name="getSortClass('id')"
          >
            <template slot-scope="{row}">
              <span>{{ row.roleId }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="角色名称"
            align="center"
            min-width="120px"
          >
            <template slot-scope="{row}">
              <span
                class="link-type"
                @click="handleUpdate(row)"
              >{{ row.roleName }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="启用状态"
            align="center"
          >
            <template slot-scope="{row}">
              <el-tag
                v-if="row.useFlag"
                type="success"
              >
                启用
              </el-tag>
              <el-tag
                v-else
                type="danger"
              >
                禁用
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="说明"
            min-width="50px"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.note }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            min-width="218px"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="{row}">
              <el-button
                type="primary"
                size="mini"
                @click="handleUpdate(row)"
              >
                修改
              </el-button>
              <el-button
                v-if="row.useFlag"
                size="mini"
                type="warning"
                @click="handleModifyUseFlag(row,false)"
              >禁用</el-button>
              <el-button
                v-else
                size="mini"
                type="success"
                @click="handleModifyUseFlag(row,true)"
              >启用</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(row)"
              >删除</el-button>

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
      </el-col>
    </el-row>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="60%"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        size="mini"
        label-width="125px"
        style="width: 750px; margin-left:20px;"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="角色name"
              prop="roleName"
            >
              <el-input
                v-model="temp.roleName"
                clearable
                type="text"
                placeholder="请输入角色name"
              />
            </el-form-item>

            <el-form-item
              label="启用状态"
              prop="useFlag"
            >
              <el-switch
                v-model="temp.useFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>

            <el-form-item label="备注">
              <el-input
                v-model="temp.note"
                clearable
                style="width:220px;"
                :autosize="{ minRows: 2, maxRows: 5}"
                type="textarea"
                placeholder="请输入备注"
              />
            </el-form-item>
            <el-form-item label="c端权限">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
              <div style="margin: 15px 0;" />
              <el-checkbox-group
                v-model="checkedcPermiss"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="permiss in cPermissOptions"
                  :key="permiss"
                  :label="permiss"
                >{{ permiss }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="b端权限">
              <el-tree
                ref="tree"
                :data="menuTree"
                show-checkbox
                default-expand-all
                node-key="id"
                highlight-current
                :props="defaultProps"
              />
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

    <el-dialog
      :visible.sync="dialogPvVisible"
      title="Reading statistics"
    >
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="key"
          label="Channel"
        />
        <el-table-column
          prop="pv"
          label="Pv"
        />
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogPvVisible = false"
        >Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { fetchList, fetchPv, createRole, updateRole, updateUseFlag, deleteRole, fetchRoleMenus, fetchRoleOwnMenus } from '@/api/sysRole'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const roleTypeOptions = []

const useFlagOptions = [
  { key: '0', display_name: '禁用' },
  { key: '1', display_name: '启用' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = roleTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'RoleTable',
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
      checkAll: false, // c端权限全选标志
      checkedcPermiss: [], // 端权限已选
      cPermissOptions: [], // c端所有权限
      isIndeterminate: true,

      menuTree: [], // 菜单树
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      useFlagOptions, // 启用状态
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        roleId: undefined,
        roleName: '',
        useFlag: true,
        note: '',
        menuIds: [],
        checkedPermiss: []
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改角色',
        create: '添加角色'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        // roleCode: [{ required: true, message: '请填写角色code', trigger: 'blur' }],
        roleName: [{ required: true, message: '请填写角色name', trigger: 'blur' }]
        // startDate: [{ type: 'date', required: true, message: '请填写开始时间', trigger: 'change' }]
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
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    // 获取所有的menus
    getRoleMenus() {
      fetchRoleMenus().then(response => {
        this.menuTree = response.menuTree
        this.cPermissOptions = response.cPermissOptions
      })
    },
    // 获取所有的menus并设置值
    getRoleOwnMenus(roleId) {
      fetchRoleOwnMenus(roleId).then(response => {
        this.temp.menuIds = response.menuIds
        this.$refs.tree.setCheckedKeys(this.temp.menuIds)
        // this.$refs.tree.setCheckedKeys([3, 7])
        this.checkedcPermiss = response.checkedcPermiss
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
    // 角色禁用启用操作
    handleModifyUseFlag(row, useFlag) {
      updateUseFlag(row.roleId).then(response => {
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
        roleId: undefined,
        roleName: '',
        useFlag: true,
        note: '',
        menuIds: [],
        checkedPermiss: []
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
    handleReset() {
      this.resetListQuery()
      this.getList()
    },
    // 监听create dialog事件
    handleCreate() {
      this.resetTemp()
      // 获取权限menuTree
      this.getRoleMenus()
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
        // date格式化
        this.temp.startDate = parseTime(this.temp.startDate)
        if (this.temp.endDate !== '') {
          this.temp.endDate = parseTime(this.temp.endDate)
        }
        this.temp.menuIds = this.$refs.tree.getCheckedKeys()
        this.temp.checkedPermiss = this.checkedcPermiss
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createRole(this.temp).then(() => {
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
      updateRole(this.temp).then(() => {
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
        deleteRole(row.roleId).then(() => {
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
    },
    handleCheckAllChange(val) {
      this.checkedcPermiss = val ? this.cPermissOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cPermissOptions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cPermissOptions.length
    }
  }
}
</script>

<style scoped>
.el-dialog .el-form .el-form-item .el-input {
  width: 220px;
}
</style>
