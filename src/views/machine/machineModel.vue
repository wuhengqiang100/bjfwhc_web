<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" clearable placeholder="请输入设备模板名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-select v-model="listQuery.useFlag" clearable placeholder="状态" class="filter-item" style="width: 130px">
        <el-option v-for="item in useFlagOptions" :key="item.key" :label="item.display_name" :value="item.key" />
      </el-select>
      工序：
      <el-select v-model="listQuery.operationId" clearable filterable placeholder="请搜索或者选择">
        <el-option v-for="item in operationOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="handleFilter" />
      </el-select>
      设备：
      <el-select v-model="listQuery.machineId" clearable filterable placeholder="请搜索或者选择">
        <el-option v-for="item in machineOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="handleFilter" />
      </el-select>

      产品：
      <el-select v-model="listQuery.productId" clearable filterable placeholder="请搜索或者选择">
        <el-option v-for="item in productOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="handleFilter" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh" @click="handleReset">重置</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate"> 添加 </el-button>
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column label="模板id" prop="id" sortable="custom" align="center" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.machineModelId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板编号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.machineModelCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板名称" align="center" min-width="120px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.machineModelName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板版本" min-width="60px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.machineModelNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板路径" align="center" min-width="160px">
        <template slot-scope="{row}">
          <span>{{ row.machineModelPath }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工序" align="center">
        <template slot-scope="{row}">
          <span>{{ row.operation.operationName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备" align="center" min-width="130px">
        <template slot-scope="{row}">
          <span>{{ row.machine.machineName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="产品" align="center">
        <template slot-scope="{row}">
          <span>{{ row.product.productName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="启用状态" align="center">
        <template slot-scope="{ row }">
          <el-tag v-if="row.useFlag" type="success">  启用</el-tag>
          <el-tag v-else type="danger"> 禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="启用时间" width="112" align="center">
        <template v-if="row.startDate!=null" slot-scope="{ row }">
          <span>{{ row.startDate | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="停用时间" width="112" align="center">
        <template v-if="row.endDate !== null" slot-scope="{ row }">
          <span>{{ row.endDate | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="说明" min-width="50px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="left" width="295px" class-name="big-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">  修改  </el-button>
          <el-button type="primary" size="mini" @click="handleUpload(row)">上传</el-button>
          <!-- <el-button v-if="row.useFlag" size="mini" type="warning" @click="handleModifyUseFlag(row, false)">禁用</el-button>
          <el-button v-else size="mini" type="success" @click="handleModifyUseFlag(row, true)">启用</el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
          <!--  <el-button v-if="row.imageModelNum > 0"  size="mini" type="success" @click="handlDownload(row)">下载</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" size="mini" label-width="125px" style="width: 600px; margin-left:50px;">

        <el-form-item label="模板编号" prop="machineModelCode">
          <el-input v-model="temp.machineModelCode" clearable type="text" placeholder="请输入模板code" />
        </el-form-item>
        <el-form-item label="模板名称" prop="machineModelName">
          <el-input v-model="temp.machineModelName" clearable type="text" placeholder="请输入模板名称" />
        </el-form-item>
        <!--    <el-form-item label="模板路径" prop="machineModelPath">
          <el-input clearable v-model="temp.machineModelPath" type="text" placeholder="请输入模板路径" />
        </el-form-item> -->
        <el-form-item label="工序" prop="operationId">
          <el-select v-if="dialogStatus == 'create'" v-model="temp.operationId" clearable filterable placeholder="请搜索或者选择">
            <el-option v-for="item in operationOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-else v-model="temp.operationId" clearable filterable placeholder="请搜索或者选择" disabled>
            <el-option v-for="item in operationOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备" prop="machineId">
          <el-select v-if="dialogStatus == 'create'" v-model="temp.machineId" clearable filterable placeholder="请搜索或者选择">
            <el-option v-for="item in machineOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-else v-model="temp.machineId" clearable filterable placeholder="请搜索或者选择" disabled>
            <el-option v-for="item in machineOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="产品" prop="productId">
          <el-select v-if="dialogStatus == 'create'" v-model="temp.productId" clearable filterable placeholder="请搜索或者选择">
            <el-option v-for="item in productOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-select v-else v-model="temp.productId" clearable filterable placeholder="请搜索或者选择" disabled>
            <el-option v-for="item in productOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="启用状态" prop="useFlag">
          <el-switch v-model="temp.useFlag" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
        <!--       <el-form-item label="启用时间" prop="startDate">
          <el-date-picker v-model="temp.startDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择一个开始时间" />
        </el-form-item>
        <el-form-item label="停用时间" prop="endDate">
          <el-date-picker v-model="temp.endDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择一个结束时间" />
        </el-form-item> -->

        <el-form-item label="备注">
          <el-input v-model="temp.note" clearable style="width:220px;" :autosize="{ minRows: 2, maxRows: 5}" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返回</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()"> 确认 </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="addName"
      :visible.sync="dialogAddFile"
      width="500px"
      style="padding:0;"
    >
      <el-upload
        class="upload-demo"
        :action="action"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple="false"
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
        accept=".rar, .zip"
        :data="fileData"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传.rar .zip文件，且不超过2G</div>
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" size="small" @click="dialogAddFile==false">开始上传</el-button> -->
        <el-button size="small" @click="resetAdd">关闭</el-button>
      </div>
    </el-dialog>
    <!--     <el-dialog
      :title="addName"
      :visible.sync="dialogAddFile"
      width="500px"
      style="padding:0;"
      @close="resetAdd"
    >
      设备模板名称:
      <el-input clearable v-model="addFileName" disabled="true" type="text" style="width:200px" />
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
        <span class="add-file-right-more">支持扩展名：.rar .zip</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="add-file-right-more">文件大小能超过：200MB</span>
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
    </el-dialog> -->

  </div>
</template>

<script>
import { fetchList, upload, download, createMachineModel, updateMachineModel, deleteMachineModel, updateUseFlag } from '@/api/machineModel'
import { listOptionMachineModel } from '@/api/querySelectOption'
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
  name: 'MachineModelTable',
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
      productOption: [],
      operationOption: [],
      machineOption: [],
      dicWorkUnitOption: [],
      listQuery: {
        page: 1,
        limit: 20,
        useFlag: undefined,
        title: undefined,
        sort: '+id',
        operationId: '',
        machineId: '',
        productId: ''
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
        machineModelId: undefined,
        machineId: '',
        operationId: '',
        productId: '',
        machineModelCode: '',
        machineModelName: '',
        machineModelNum: '',
        machineModelPath: '',
        useFlag: true,
        startDate: new Date(),
        endDate: '',
        note: ''
      },
      dialogFormVisible: false,
      dialogAddFile: false,
      dialogStatus: '',
      textMap: {
        update: '修改机检模板',
        create: '添加机检模板'
      },
      editFlag: 0, // 弹窗标志 0 添加,1修改
      dialogPvVisible: false,
      pvData: [],
      addArr: [],
      addId: '',
      addFileName: '',
      addName: '上传文件',
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        machineModelCode: [{ required: true, message: '请填写设备模板code', trigger: 'blur' }],
        machineModelName: [{ required: true, message: '请填写设备模板名称', trigger: 'blur' }],
        machineId: [{ required: true, message: '请选择设备', trigger: 'blur' }],
        operationId: [{ required: true, message: '请选择工序', trigger: 'blur' }],
        productId: [{ required: true, message: '请选择产品', trigger: 'blur' }],
        startDate: [{ type: 'date', required: true, message: '请填写开始时间', trigger: 'change' }]
        // endDate: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]
      },
      downloadLoading: false,
      ftpUrl: '',
      fileList: [],
      fileData: {
        tokenId: getToken(),
        machineModelId: ''
      }, // 文件上传是附带的额外参数
      action: process.env.VUE_APP_BASE_API + '/machine/machineModel/upload1'
    }
  },
  // 初始化获取数据列表
  created() {
    this.getSelectOption()// 获取查询的条件options
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
    // 获取所有的下拉选择查询条件
    getSelectOption() {
      listOptionMachineModel().then(response => {
        this.productOption = response.productOption
        this.machineOption = response.machineOption
        this.operationOption = response.operationOption
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleUpload(row) {
      // this.resetTemp()
      // this.dialogStatus = 'create'
      // this.addId = row.machineModelId
      // this.addFileName = row.machineModelName
      // this.addId = Object.assign({}, row.machineId) // copy obj
      this.fileData.machineModelId = row.machineModelId
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
    },
    handlDownload(row) {
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
    resetFileData() {
      this.fileList = []
      this.fileData = {
        tokenId: getToken(),
        machineModelId: ''
      }
    },
    resetAdd() {
      this.resetFileData()
      this.dialogAddFile = false
      this.refreshList()
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
    // 设备模板禁用启用操作
    handleModifyUseFlag(row, useFlag) {
      updateUseFlag(row.machineModelId).then(response => {
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
        machineModelId: undefined,
        machineId: '',
        operationId: '',
        productId: '',
        machineModelCode: '',
        machineModelName: '',
        machineModelNum: '',
        machineModelPath: '',
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
        title: undefined,
        sort: '+id',
        operationId: '',
        machineId: '',
        productId: ''
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
          createMachineModel(this.temp).then(() => {
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
      updateMachineModel(this.temp).then(() => {
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
          deleteMachineModel(row.machineModelId).then(() => {
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
