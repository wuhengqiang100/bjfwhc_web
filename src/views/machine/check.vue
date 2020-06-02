/* eslint-disable spaced-comment */
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="10">
          <el-card class="box-card" style="height:800px;max-height:850px;overflow-y: scroll;">
            <div slot="header" class="clearfix">
              <span><el-tag effect="dark">待审核车次</el-tag></span>
              <span style="float: right; padding: 3px 0">
                <el-input v-model="listQuery.cartNumber" clearable placeholder="请输入车号" style="width: 200px;" class="filter-item" @keyup.enter.native="getCanAuditTable" />
                <el-button v-waves size="mini" class="filter-item" type="primary" icon="el-icon-search" @click="getCanAuditTable">
                  搜索
                </el-button>
                <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh" @click="handleCanAuditReset">
                  重置
                </el-button>
              </span>

            </div>
            <el-table ref="multipleCanAudiTable" :key="tableKeyCan" stripe fit highlight-current-row :data="canAuditTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleCanAuditSelectionChange">
              <el-table-column prop="inspectmId" type="selection" width="25" />
              <el-table-column prop="wipJobs.cartNumber" sortable label="车号" width="55" class="link-type">
                <template slot-scope="{row}">
                  <span class="link-type" @click="handleEditNoteCan(row)">{{ row.wipJobs.cartNumber }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="product.productName" sortable label="品种" width="60" />
              <el-table-column prop="operation.operationName" sortable label="工艺" width="60" />
              <el-table-column prop="machine.machineName" sortable label="设备" width="80" />
              <el-table-column prop="infoNumber" sortable label="总数" width="55" />
              <el-table-column prop="machineWasterNumber" sortable label="机检数" width="70" />
              <el-table-column prop="noCheckNum" sortable label="未检" width="55" />
              <el-table-column prop="judgeWasterNumber" sortable label="判废" width="60">
                <template slot-scope="{row}">
                  <span v-if="row.judgeWasterNumber===null">未上传完成</span>
                  <span v--else>{{ row.judgeWasterNumber }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="note" label="说明" min-width="80">
                <template slot-scope="{row}">
                  <span class="link-type" @click="handleEditNoteCan(row)">{{ row.note }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="wipProdLogs.startDate" sortable label="生产时间" width="120" />

            </el-table>
          </el-card>
          <div style="margin-top: 20px">

            <el-button @click="refresh">刷新数据</el-button>

            自动刷新
            <el-button>
              <el-switch v-model="switchWalue" active-color="#13ce66" inactive-color="#ff4949" @change="changeSwitch" />
            </el-button>

          </div>
        </el-col>
        <el-col :span="1" style="display:flex">
          <div style="margin-top:200px;" class="button-class">
            <el-row style="margin-top:60px">
              <el-input v-model="temp.note" clearable type="textarea" :rows="2" placeholder="请输入说明" />
            </el-row>
            <el-row style="margin-top:10px;margin-left:5px">
              <el-button type="primary" @click="handleAudit()">审核<i class="el-icon-arrow-right el-icon--right" /></el-button>
            </el-row>
            <el-row style="margin-top:10px;margin-left:5px">
              <el-button type="warning" @click="handleNotAudit()">全检<i class="el-icon-arrow-right el-icon--right" /></el-button>
            </el-row>
            <el-row style="margin-top:10px;margin-left:5px">
              <el-button type="success" icon="el-icon-arrow-left" @click="handleReturn()">回退</el-button>
            </el-row>

          </div>

        </el-col>
        <el-col :span="13">
          <el-row>
            <el-card class="box-card" style="height:800px;max-height:850px;overflow-y: scroll;">
              <div slot="header" class="clearfix">
                <span><el-tag effect="dark" type="success">已审核车次</el-tag></span>
                <span style="float: right; padding: 3px 0;width:auto">
                  <el-row :gutter="20">
                    <el-col :span="10">
                      <el-date-picker
                        v-model="dateValue2"
                        type="datetimerange"
                        align="right"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:01', '23:59:59']"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        style="width:280px"
                        @change="getAlreadyAuditTable"
                      />
                    </el-col>
                    <el-col :span="4">
                      <el-input v-model="listQuery.cartNumber" clearable placeholder="请输入车号" style="width: 100px;" class="filter-item" @keyup.enter.native="getAlreadyAuditTable" />

                    </el-col>
                    <el-col :span="4">
                      <el-select v-model="listQuery.allowJudge" clearable placeholder="选择状态" style="width: 100px;">
                        <el-option label="未分活" value="1" />
                        <el-option label="已分活" value="2" />
                        <el-option label="全检" value="-1" />
                      </el-select>
                    </el-col>
                    <el-col :span="6">
                      <el-button v-waves size="mini" class="filter-item" type="primary" icon="el-icon-search" @click="getAlreadyAuditTable">
                        搜索
                      </el-button>
                      <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh" @click="handleAlreadyReset">
                        重置
                      </el-button>
                    </el-col>
                  </el-row>

                </span>
              </div>

              <el-table ref="multipleAlreadyAuditTable" :key="tableKeyCan" stripe fit highlight-current-row :data="alreadyAuditTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleAlreadyAuditSelectionChange">
                <el-table-column prop="inspectmId" type="selection" width="25" />
                <el-table-column prop="wipJobs.cartNumber" sortable label="车号" width="55" class="link-type">
                  <template slot-scope="{row}">
                    <span class="link-type" @click="handleEditNoteAlready(row)">{{ row.wipJobs.cartNumber }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="product.productName" sortable label="品种" width="60" />
                <el-table-column prop="operation.operationName" sortable label="工艺" width="60" />
                <el-table-column prop="machine.machineName" sortable label="设备" width="80" />
                <el-table-column prop="infoNumber" sortable label="总数" width="60" />
                <el-table-column prop="machineWasterNumber" sortable label="机检数" width="70" />
                <el-table-column prop="noCheckNum" sortable label="未检" width="60" />
                <el-table-column prop="judgeWasterNumber" sortable label="判废" width="60" />
                <el-table-column prop="note" label="说明" min-width="80">
                  <template slot-scope="{row}">
                    <span class="link-type" @click="handleEditNoteAlready(row)">{{ row.note }}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="wipProdLogs.startDate" sortable label="生产时间" width="120" />

                <el-table-column prop="checkDate" sortable label="审核日期" width="120" />
                <el-table-column label="状态" width="70">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.allowJudge===1" effect="dark" type="success">已审核</el-tag>
                    <el-tag v-else-if="scope.row.allowJudge===2" effect="dark" type="info">已分活</el-tag>
                    <el-tag v-else-if="scope.row.allowJudge===-1" effect="dark" type="warning">全检</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-row>
          <!-- <el-row style="margin-top:20px">
            <el-card class="box-card" style="height:430px;overflow-y: scroll;">
              <div slot="header" class="clearfix">
                <span><el-tag effect="dark" type="warning">全检车次</el-tag></span>
                <span>
                  <el-date-picker
                    v-model="dateValue3"
                    style="float: right; padding: 3px 0"
                    type="datetimerange"
                    align="right"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:01', '23:59:59']"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="getNotAuditTable"
                  />
                </span>
              </div>
              <el-table ref="multipleNotAudiTable" fit highlight-current-row :data="notAuditTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleReturnNotAuditSelectionChange">
                <el-table-column type="selection" width="22" />
                <el-table-column prop="wipJobs.cartNumber" label="车号" width="40" />
                <el-table-column prop="product.productName" label="品种" width="50" />
                <el-table-column prop="operation.operationName" label="工艺" width="60" />
                <el-table-column prop="infoNumber" label="检测张数" width="60" />
                <el-table-column prop="machineWasterNumber" label="机检数量" width="60" />
                <el-table-column prop="noCheckNum" label="未检数" width="60" />
                <el-table-column prop="judgeWasterNumber" label="判废数" width="50" />
                <el-table-column prop="note" label="说明" width="80" />
                <el-table-column prop="lastUpdateTime" label="日期" width="120" />
                <el-table-column prop="lastUpdateTime" label="日期" width="120" />
                <el-table-column label="状态" width="80">
                  <template>
                    <el-tag effect="dark" type="warning">全检</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-row> -->

        </el-col>
      </el-row>

    </div>
    <el-dialog title="未审核备注" :visible.sync="dialogNoteCanVisible" width="20%">
      <el-input v-model="tempNoteCan.note" clearable style="width:250px;" :autosize="{ minRows: 3, maxRows: 6}" type="textarea" placeholder="请输入备注" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNoteCanVisible = false">
          返回
        </el-button>
        <el-button type="primary" @click="editNoteCan()">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="已审核备注" :visible.sync="dialogNoteAlreadyVisible" width="20%">
      <el-input v-model="tempNoteAlready.note" clearable style="width:250px;" :autosize="{ minRows: 3, maxRows: 6}" type="textarea" placeholder="请输入备注" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogNoteAlreadyVisible = false">
          返回
        </el-button>
        <el-button type="primary" @click="editNoteAlready()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { fetchCanAuditList, fetchAlreadyAuditList, saveCanAudit, saveAlreadyAudit, saveNotAudit, saveEditNoteCan, saveEditNoteAlready } from '@/api/machineAudit'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import { getToken } from '@/utils/auth'

export default {
  name: 'MachineCheckTable',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination },
  directives: { waves },
  filters: {},
  data() {
    return {
      // 可以审核
      canAuditTable: [],
      // 已经审核(包括已经审核,和已经分活等)
      alreadyAuditTable: [],
      // 不走核查
      // notAuditTable: [],
      multipleCanAuditTableSelection: [],
      multipleAlreadyAuditTableSelection: [],
      multipleNotAuditTableSelection: [],

      canAuditData: [],
      alreadyAuditData: [],
      notAuditData: [],
      switchWalue: false,
      dateValue1: '',
      dateValue2: '',
      dateValue3: '',
      listQuery: {
        allowJudge: undefined,
        cartNumber: undefined,
        startDate: Date,
        endDate: Date
      },
      temp: {
        data: [],
        note: ''
      },
      tempNoteCan: {
        data: '',
        note: ''
      }, tempNoteAlready: {
        data: '',
        note: ''
      },

      options: [{
        value: '1',
        label: '未分活'
      }, {
        value: '2',
        label: '已分活'
      }, {
        value: '-1',
        label: '未检'
      }],
      dialogNoteCanVisible: false,
      dialogNoteAlreadyVisible: false
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    // 有加载圈的加载数据列表
    getList() {
      this.refresh()
    },

    resetListQuery() {
      this.listQuery = {
        allowJudge: undefined,
        cartNumber: undefined,
        startDate: Date,
        endDate: Date
      }
    },
    resetTemp() {
      this.temp = {
        data: [],
        note: ''
      }
    },
    resetTempNoteCan() {
      this.tempNoteCan = {
        data: '',
        note: ''
      }
    }, resetTempNoteAlready() {
      this.tempNoteAlready = {
        data: '',
        note: ''
      }
    },
    refresh() {
      this.getCanAuditTable()
      this.getAlreadyAuditTable()
      this.multipleCanAuditTableSelection = []
      this.multipleAlreadyAuditTableSelection = []
      // this.getNotAuditTable()
    },

    handleEditNoteCan(row) {
      // this.tempNote = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      // this.dialogStatus = 'update'a
      this.resetTempNoteCan()
      this.tempNoteCan.data = row.inspectmId
      this.tempNoteCan.note = row.note
      this.dialogNoteCanVisible = true
    },
    handleEditNoteAlready(row) {
      // this.tempNote = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      // this.dialogStatus = 'update'a
      this.resetTempNoteAlready()
      this.tempNoteAlready.data = row.inspectmId
      this.tempNoteAlready.note = row.note
      this.dialogNoteAlreadyVisible = true
    },

    // 未审核修改备注
    editNoteCan() {
      saveEditNoteCan(this.tempNoteCan).then(response => {
        this.resetTempNoteCan()
        this.getCanAuditTable()
        this.dialogNoteCanVisible = false
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    }, // 已审核 修改备注
    editNoteAlready() {
      saveEditNoteAlready(this.tempNoteAlready).then(response => {
        this.resetTempNoteAlready()
        this.getAlreadyAuditTable()
        this.dialogNoteAlreadyVisible = false
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    // 获取可以审核的数据
    getCanAuditTable() {
      if (this.dateValue1 !== '') {
        this.listQuery.startDate = parseTime(this.dateValue1[0])
        this.listQuery.endDate = parseTime(this.dateValue1[1])
      }
      fetchCanAuditList(this.listQuery).then(response => {
        this.canAuditTable = response.canAuditTable
        // this.resetListQuery()
      })
    },

    // 获取已经审核的数据
    getAlreadyAuditTable() {
      // this.resetListQuery()
      if (this.dateValue2 !== '') {
        this.listQuery.startDate = parseTime(this.dateValue2[0])
        this.listQuery.endDate = parseTime(this.dateValue2[1])
      }
      fetchAlreadyAuditList(this.listQuery).then(response => {
        this.alreadyAuditTable = response.alreadyAuditTable
        // this.resetListQuery()
      })
    },

    // 获取不走审核的数据
    /*  getNotAuditTable(time) {
      this.resetListQuery()
      if (this.dateValue3 !== '') {
        this.listQuery.startDate = parseTime(time[0])
        this.listQuery.endDate = parseTime(time[1])
      }
      fetchNotAuditList(this.listQuery).then(response => {
        this.notAuditTable = response.notAuditTable
      })
    }, */

    // 可以审核
    handleCanAuditSelectionChange(val) {
      this.multipleCanAuditTableSelection = []
      this.multipleCanAuditTableSelection = val
      if (this.switchWalue) {
        this.multipleCanAuditTableSelection = []
        this.$notify({
          title: '提示',
          message: '审核前请关闭自动刷新',
          type: 'info',
          duration: 2000
        })
        return
      }
    },

    // 审核
    handleAudit() {
      if (this.multipleCanAuditTableSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请从未审核状态中选择审核的车次',
          type: 'info',
          duration: 2000
        })
        this.getAlreadyAuditTable()
        return
      }
      if (this.switchWalue) {
        this.multipleCanAuditTableSelection = []
        this.$notify({
          title: '提示',
          message: '审核前请关闭自动刷新',
          type: 'info',
          duration: 2000
        })
        return
      }
      for (let index = 0; index < this.multipleCanAuditTableSelection.length; index++) {
        this.canAuditData[index] = this.multipleCanAuditTableSelection[index].inspectmId
        console.log('inspectid', this.multipleCanAuditTableSelection[index].inspectmId)
      }
      this.temp.data = this.canAuditData
      saveCanAudit(this.temp).then(response => {
        this.canAuditData = []
        this.multipleCanAuditTableSelection = []
        this.resetTemp()
        this.refresh()
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    // 审核全检
    handleNotAudit() {
      if (this.multipleCanAuditTableSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请从未审核状态中选择全检的车次',
          type: 'info',
          duration: 2000
        })
        this.getAlreadyAuditTable()
        return
      }
      if (this.switchWalue) {
        this.multipleCanAuditTableSelection = []
        this.$notify({
          title: '提示',
          message: '审核前请关闭自动刷新',
          type: 'info',
          duration: 2000
        })
        return
      }
      for (let index = 0; index < this.multipleCanAuditTableSelection.length; index++) {
        this.canAuditData[index] = this.multipleCanAuditTableSelection[index].inspectmId
      }
      this.temp.data = this.canAuditData
      saveNotAudit(this.temp).then(response => {
        this.canAuditData = []
        this.multipleCanAuditTableSelection = []
        this.resetTemp()
        this.refresh()
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    // 审核回退
    handleAlreadyAuditSelectionChange(val) {
      this.multipleAlreadyAuditTableSelection = []
      this.multipleAlreadyAuditTableSelection = val

      if (this.switchWalue) {
        this.multipleCanAuditTableSelection = []
        this.$notify({
          title: '提示',
          message: '审核前请关闭自动刷新',
          type: 'info',
          duration: 2000
        })
        return
      }
      let noAllowReturn = 0
      for (let index = 0; index < this.multipleAlreadyAuditTableSelection.length; index++) {
        if (this.multipleAlreadyAuditTableSelection[index].disabled) {
          noAllowReturn += 1
        }

        this.alreadyAuditData[index] = this.multipleAlreadyAuditTableSelection[index].inspectmId
      }
      if (noAllowReturn > 0) {
        this.multipleAlreadyAuditTableSelection = []
        this.$notify({
          title: '注意',
          message: '已分活的车次不能回退',
          type: 'info',
          duration: 2000
        })
        this.multipleAlreadyAuditTableSelection = []
        this.alreadyAuditData = []
        this.getAlreadyAuditTable()
        return true
      }
      return true
    },
    handleReturn() {
      if (this.alreadyAuditData.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择可以回退的车次',
          type: 'info',
          duration: 2000
        })
        return
      }
      this.temp.data = this.alreadyAuditData
      if (this.switchWalue) {
        this.multipleCanAuditTableSelection = []
        this.$notify({
          title: '提示',
          message: '审核前请关闭自动刷新',
          type: 'info',
          duration: 2000
        })
        return
      }
      let noAllowReturn = 0
      for (let index = 0; index < this.multipleAlreadyAuditTableSelection.length; index++) {
        if (this.multipleAlreadyAuditTableSelection[index].disabled) {
          noAllowReturn += 1
        }

        this.alreadyAuditData[index] = this.multipleAlreadyAuditTableSelection[index].inspectmId
      }

      if (noAllowReturn > 0) {
        this.multipleAlreadyAuditTableSelection = []

        this.$notify({
          title: '注意',
          message: '已分活的车次不能回退',
          type: 'info',
          duration: 2000
        })
      }
      if (noAllowReturn === 0) {
        saveAlreadyAudit(this.temp).then(response => {
          this.alreadyAuditData = []
          this.multipleAlreadyAuditTableSelection = []
          this.resetTemp()

          this.refresh()
          this.$notify({
            title: 'Success',
            message: response.message,
            type: 'success',
            duration: 2000
          })
        })
      } else {
        this.refresh()
      }
    },
    handleCanAuditReset() {
      this.resetListQuery()
      this.getCanAuditTable()
    },
    handleAlreadyReset() {
      this.resetListQuery()
      this.dateValue2 = ''
      this.getAlreadyAuditTable()
    }, // 回退全检
    /*     handleReturnNotAuditSelectionChange(val) {
      this.multipleNotAuditTableSelection = val
      console.log(this.multipleNotAuditTableSelection)
    },

    handleReturnAbandon() {
      for (let index = 0; index < this.multipleNotAuditTableSelection.length; index++) {
        this.notAuditData[index] = this.multipleNotAuditTableSelection[index].inspectmId
      }
      this.temp.data = this.notAuditData

      returnNotAudit(this.temp).then(response => {
        this.notAuditData = []
        this.multipleNotAuditTableSelection = []
        this.resetTemp()

        this.getCanAuditTable()// 考虑要不要删
        this.getNotAuditTable()
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    }, */

    changeSwitch() {
      console.log(this.switchWalue)
      if (this.switchWalue) {
        // 开启自动刷新功能
        this.interval = setInterval(() => {
          this.refresh() // 定时刷新获取数据
        }, 2 * 2000)
      } else {
        clearInterval(this.interval)
      }
    }
  }
}
</script>
<style lang="scss">
  .el-card__header {
    padding: 5px 20px;
    border-bottom: 1px solid #e6ebf5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-card__body {
    padding: 5px;
}
  .el-table th > .cell {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    padding-left: 2px;
    padding-right: 2px;
    width: 100%;
}
.el-table--mini th, .el-table--mini td {
    padding: 2px 0;
}
.el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 20px;
    padding-left: 2px;
    padding-right: 2px;
}
.el-button--mini {
    padding: 7px 7px;
    font-size: 12px;
    border-radius: 3px;
}
.el-range-editor.el-input__inner {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    // -webkit-box-align: center;
    // -ms-flex-align: center;
    // align-items: center;
    padding: 0px 10px;
}
</style>>

