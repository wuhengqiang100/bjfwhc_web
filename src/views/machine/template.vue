<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        clearable
        placeholder="请输入设备名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!--
      <el-select clearable  v-model="listQuery.useFlag" placeholder="状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in useFlagOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>-->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-refresh"
        @click="handleReset"
      >重置</el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>-->
      <!--     <el-button class="filter-item" style="margin-left: 10px;" type="warning" icon="el-icon-download" @click="handleCreate">
        导入
      </el-button>-->
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
        label="设备id"
        prop="id"
        sortable="custom"
        align="center"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.machineId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备code" align="center">
        <template slot-scope="{row}">
          <span>{{ row.machineCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备名称" align="center" min-width="120px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.machineName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板image目录" min-width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.imageModelPath }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板image数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.imageModelNum }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="说明" min-width="50px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>-->
      <el-table-column
        label="操作"
        fixed="right"
        align="left"
        min-width="90px"
        class-name="big-padding fixed-width"
      >
        <template slot-scope="{row}">
          <!-- <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>-->
          <el-button type="primary" size="mini" @click="handleUpload(row)">上传</el-button>
          <!--  <el-button v-if="row.imageModelNum > 0"
                     size="mini"
                     type="success"
          @click="handlDownload(row)">下载</el-button>-->
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        size="mini"
        label-width="125px"
        style="width: 600px; margin-left:50px;"
      >
        <el-form-item label="设备code" prop="machineCode">
          <el-input v-model="temp.machineCode" clearable type="text" placeholder="请输入设备code" />
        </el-form-item>
        <el-form-item label="设备name" prop="machineName">
          <el-input v-model="temp.machineName" clearable type="text" placeholder="请输入设备name" />
        </el-form-item>
        <el-form-item label="模板image目录" prop="imageModelPath">
          <el-input
            v-model="temp.imageModelPath"
            clearable
            :autosize="{ minRows: 2, maxRows: 5}"
            type="textarea"
            placeholder="请输入模板image目录"
          />
        </el-form-item>
        <el-form-item label="模板image数量" prop="imageModelNum">
          <el-input v-model="temp.imageModelNum" clearable-number :min="0" label="描述文字" />
        </el-form-item>

        <el-form-item label="启用状态" prop="useFlag">
          <el-switch v-model="temp.useFlag" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
        <el-form-item label="启用时间" prop="startDate">
          <el-date-picker
            v-model="temp.startDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择一个开始时间"
          />
        </el-form-item>
        <el-form-item label="停用时间" prop="endDate">
          <el-date-picker
            v-model="temp.endDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择一个结束时间"
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返回</el-button>
        <!--        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>-->
      </div>
    </el-dialog>

    <el-dialog
      :title="addName"
      :visible.sync="dialogAddFile"
      width="500px"
      style="padding:0;"
      @close="resetAdd"
    >
      <!-- <el-form-item label="设备名称"> -->
      设备名称:
      <el-input v-model="addFileName" clearable disabled="true" type="text" style="width:200px" />
      <!-- </el-form-item> -->
      <!-- 附件名称：<el-input clearable v-model="addFileName" autocomplete="off" size="small" style="width: 250x;" /> -->
      <div class="add-file-right" style="height:70px;margin-left:100px;margin-top:15px;">
        <div class="add-file-right-img" style="margin-left:70px;">上传文件：</div>
        <input
          ref="clearFile"
          type="file"
          multiple="multiplt"
          class="add-file-right-input"
          style="margin-left:70px;"
          accept=".rar, .zip"
          @change="getFile($event)"
        >
      </div>
      <div style="text-algin:center">
        <span class="add-file-right-more">支持扩展名：.rar .zip</span>
      </div>
      <div class="add-file-list">
        <ul>
          <li v-for="(item, index) in addArr" :key="index">
            <a>{{ item.name }}</a>
          </li>
        </ul>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="submitAddFile">开始上传</el-button>
        <el-button size="small" @click="resetAdd">全部删除</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  fetchPv,
  createMachine,
  updateMachine,
  updateUseFlag,
  deleteMachine,
  upload,
  download
} from '@/api/machine'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getToken } from '@/utils/auth'
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
  name: 'MachineTable',
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
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
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
      dialogAddFile: false,
      dialogStatus: '',
      textMap: {
        update: '修改设备',
        create: '添加设备'
      },
      dialogPvVisible: false,
      pvData: [],
      addArr: [],
      addId: '',
      addFileName: '',
      addName: '上传文件',
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        machineCode: [
          { required: true, message: '请填写设备code', trigger: 'blur' }
        ],
        machineName: [
          { required: true, message: '请填写设备name', trigger: 'blur' }
        ],
        startDate: [
          {
            type: 'date',
            required: true,
            message: '请填写开始时间',
            trigger: 'change'
          }
        ]
        // endDate: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]
      },
      downloadLoading: false,
      ftpUrl: ''
    }
  },
  // 初始化获取数据列表
  created() {
    this.getList()
  },
  methods: {
    // 有加载圈的加载数据列表
    getFile(event) {
      var file = event.target.files
      for (var i = 0; i < file.length; i++) {
        //    上传类型判断
        var imgName = file[i].name
        var idx = imgName.lastIndexOf('.')
        if (idx !== -1) {
          var ext = imgName.substr(idx + 1).toUpperCase()
          ext = ext.toLowerCase()
          // eslint-disable-next-line no-empty
          if (ext !== 'rar' && ext !== 'zip') {
          } else {
            this.addArr.push(file[i])
          }
          // eslint-disable-next-line no-empty
        } else {
        }
      }
    },
    handleUpload(row) {
      // this.resetTemp()
      // this.dialogStatus = 'create'
      this.addId = row.machineId
      this.addFileName = row.machineName
      // this.addId = Object.assign({}, row.machineId) // copy obj
      this.dialogAddFile = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    submitAddFile() {
      if (this.addArr.length === 0) {
        this.$message({
          type: 'info',
          message: '请选择要上传的文件'
        })
        return
      }

      var formData = new FormData()
      // formData.append('num', this.addType)
      formData.append('addId', this.addId)
      formData.append('rfilename', this.addFileName)
      formData.append('tokenId', getToken())
      for (var i = 0; i < this.addArr.length; i++) {
        formData.append('fileUpload', this.addArr[i])
      }
      // eslint-disable-next-line no-unused-vars
      /*       const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': this.token
        }
      } */
      upload(formData).then(response => {
        if (response.code === 20000) {
          this.resetFile()
          this.getList()
          this.$message({
            type: 'success',
            message: response.message
          })
          this.dialogAddFile = false
        } else {
          this.addArr = []
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      })
      /*     this.axios.post(apidate.uploadEnclosure, formData, config)
        .then((response) => {
          if (response.data.info == 'success') {
            this.$message({
              type: 'success',
              message: '附件上传成功!'
            })
          }
        }) */
    },
    handlDownload(row) {
      // var elemIF = document.createElement('iframe')
      // //   // a.href = process.env.VUE_APP_BASE_API + '/machine/template/download?id=' + row.machineId

      // elemIF.src = 'http://127.0.0.1:8088/machine/template/download?id=' + row.machineId
      // elemIF.style.display = 'none'
      // document.body.appendChild(elemIF)
      download(row.machineId, getToken()).then(response => {
        // this.ftpUrl = response.ftpUrl
        window.location.href = response.ftpUrl
        // ftp://ftpuser:ftpuser@192.168.137.200\Model\Images\其他33\其他33.rar
      })
    },
    // 重置上传文件相关参数
    resetFile() {
      this.addArr = []
      this.addId = ''
      this.addFileName = ''
    },
    resetAdd() {
      this.resetFile()
      this.dialogAddFile = false
    },
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
    // 设备禁用启用操作
    handleModifyUseFlag(row, useFlag) {
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
      this.$refs['dataForm'].validate(valid => {
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
      })
        .then(() => {
          deleteMachine(row.machineId).then(() => {
            this.refreshList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
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
        const filterVal = [
          'timestamp',
          'title',
          'type',
          'importance',
          'status'
        ]
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
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
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
