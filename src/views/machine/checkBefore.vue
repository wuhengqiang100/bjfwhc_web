/* eslint-disable spaced-comment */
<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="text-align: justify;width:100%;  justify-content: space-between">
        <el-transfer
          v-model="value"
          style="text-align: left; display: inline-block;margin: auto"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入车号"
          :titles="titles"
          :button-texts="['回退', '审核']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          :data="data"
          @change="handleChange"
        >
          <span
            v-if="option.allowJudge === 0"
            slot-scope="{ option }"
            class="widController"
          >
            <el-tag size="small">{{ option.wipJobs.cartNumber }}</el-tag>
            <span style="margin-left:20px;" />
            <span class="spanLi"> {{ option.product.productName }}</span>
            <span class="spanLi">{{ option.operation.operationName }}</span>
            <span class="spanLi">{{ option.infoNumber }}</span>
            <span class="spanLi">{{ option.machineWasterNumber }}</span>
            <span class="spanLi2">{{ option.noCheckNum }}</span>
          </span>
          <span
            v-else-if="option.allowJudge === 1"
            slot-scope="{ option }"
            class="widController"
          >
            <el-tag
              size="small "
              type="success"
            >{{
              option.wipJobs.cartNumber
            }}</el-tag>
            <span style="margin-left:20px;" />
            <span class="spanLi"> {{ option.product.productName }}</span>
            <span class="spanLi">{{ option.operation.operationName }}</span>
            <span class="spanLi">{{ option.infoNumber }}</span>
            <span class="spanLi">{{ option.machineWasterNumber }}</span>
            <span class="spanLi2">{{ option.noCheckNum }}</span>
            <span class="spanLi">未分活</span>
          </span>
          <span
            v-else
            slot-scope="{ option }"
            class="widController"
          >
            <el-tag
              size="small "
              type="danger"
            >{{
              option.wipJobs.cartNumber
            }}</el-tag>
            <span style="margin-left:20px;" />
            <span class="spanLi"> {{ option.product.productName }}</span>
            <span class="spanLi">{{ option.operation.operationName }}</span>
            <span class="spanLi">{{ option.infoNumber }}</span>
            <span class="spanLi">{{ option.machineWasterNumber }}</span>
            <span class="spanLi2">{{ option.noCheckNum }}</span>
            <span class="spanLi">已分活</span>
          </span>
          <span
            slot="left-footer"
            class="transfer-footer"
            style="font-size:12px;padding-right:0px;"
          >手动</span>
          <el-button
            slot="left-footer"
            class="transfer-footer"
            size="small"
            @click="refreshQa"
          >刷新数据</el-button>
          <span
            slot="left-footer"
            class="transfer-footer"
            style="font-size:12px;padding-right:0px;"
          >定时</span>
          <el-button
            slot="left-footer"
            class="transfer-footer"
            size="small"
          >
            <el-switch
              v-model="switchWalue"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeSwitch"
            />
          </el-button>
          <span
            slot="left-footer"
            class="transfer-footer"
            style="font-size:12px;padding-right:0px;"
          >配置</span>
          <el-button
            slot="left-footer"
            class="transfer-footer"
            size="small"
            @click="dialogVisible = true"
          >审核参数</el-button>
          <!-- <el-button slot="left-footer" class="transfer-footer" size="small" @click="refreshQa">定时获取</el-button> -->
          <!-- <el-button slot="left-footer" v-popover:popover class="transfer-footer" size="small">定时获取</el-button> -->

          <!-- <el-button slot="right-footer" class="transfer-footer" size="small">回退</el-button> -->
        </el-transfer>
      </div>
    </div>
    <el-dialog
      title="自动审核参数设置"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      top="	50vh"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="tempCanshu"
        label-position="left"
        size="mini"
        label-width="70px"
        style="width: 300px; margin-left:2px;"
      >
        <el-form-item label="参数一">
          <el-input v-model="tempCanshu.num1" clearable-number :precision="2" :step="0.1" :max="10" />
        </el-form-item>
        <el-form-item label="参数二">
          <el-input v-model="tempCanshu.num2" clearable-number :precision="2" :step="0.1" :max="10" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="editCanshu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, updateMachineCheck } from '@/api/machineCheck'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { getToken } from '@/utils/auth'

export default {
  name: 'MachineCheckTable',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination },
  directives: { waves },
  filters: {},
  data() {
    return {
      dialogVisible: false,
      visible: false,
      data: [],
      value: [],
      switchWalue: false,
      interval: '', // 定时器参数
      titles: [
        ' -- 车号 -----  品种 -----  工艺 -----  总数  ----- 缺陷数  -- 未检数',
        '-- 车号 ------  品种 -----  工艺 -----  总数  ----- 缺陷数  -- 未检数--  状态'
      ],
      filterMethod(query, item) {
        return item.wipJobs.cartNumber.indexOf(query) > -1
      },
      qaInspectMasterList: [], // 总的核查数据list
      tempCanshu: {
        num1: Number,
        num2: Number
      },
      temp: {
        direction: '',
        movedKeys: [],
        tokenId: ''
      },
      qaInspectMaster: {
        inspectmId: Number, // 质量表头id
        machineWasterNumber: Number, // 整万错误数量
        infoNumber: Number, // 整万信息数量
        noCheckNum: Number, // 未检信息数量
        allowJudge: Number, // 产品状态码
        wipProdLogs: {
          // 生产日志信息
          logId: Number, // 生产日志id
          jobId: Number, // 外键(生产序号)
          operationId: Number, // 生产工序
          machineId: Number, // 生产机器
          workUnitId: Number, // 生产机台
          operatorId: Number, // 操作人
          itemFlag: Number, // 操作标志
          qainfonum: Number, // 信息数量
          qawasternum: Number, // 报错数量
          sminfonum: Number // 识码数量
        },
        wipJobs: {
          // 基础生产信息
          jobId: Number, // 基础生产信息id
          cartNumber: Number // 车号
        },
        product: {
          // 产品种类信息
          productId: Number, // 产品id
          productCode: '', // 产品code
          productName: '' // 产品name
        },
        operation: {
          // 产品工序信息
          operationId: Number, // 工序id
          operationCode: '', // 工序code
          operationName: '' // 工序name
        },
        operator: {
          // 操作员信息
          operatorId: Number, // 人员id
          operatorCode: '', // 人员code
          operatorName: '' // 人员name
        },
        machine: {
          // 机器信息
          machineId: Number, // 机器id
          machineCode: '', // 机器code
          machineName: '' // 机器name
        },
        dicWorkUnits: {
          // 操作台信息
          workUnitId: Number, // 操作台id
          workUnitCode: '', // 操作台code
          workUnitName: '' // 操作台name
        }
      }
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
      // this.listLoading = true
      fetchList().then(response => {
        this.qaInspectMasterList = response.qaInspectMasterList
        // this.generateData(this.qaInspectMasterList)// 解析返回的核查数据
        // this.generateData() // 生成data穿梭框数据
        this.qaInspectMasterList.forEach((qa, index) => {
          // this.qaInspectMaster = qa

          // 可以审核
          if (qa.allowJudge === 0) {
            this.data.push({
              key: qa.inspectmId,
              label: qa.product.productName,
              disabled: false,
              machineWasterNumber: qa.machineWasterNumber,
              noCheckNum: qa.noCheckNum,
              infoNumber: qa.infoNumber,
              allowJudge: qa.allowJudge,
              wipProdLogs: qa.wipProdLogs,
              wipJobs: qa.wipJobs,
              product: qa.product,
              operation: qa.operation,
              operator: qa.operator,
              machine: qa.machine,
              dicWorkUnits: qa.dicWorkUnits
            })
          }
          // 允许分活
          if (qa.allowJudge === 1) {
            this.value.push(qa.inspectmId)
            this.data.push({
              key: qa.inspectmId,
              label: qa.product.productName,
              disabled: false,
              machineWasterNumber: qa.machineWasterNumber,
              noCheckNum: qa.noCheckNum,
              infoNumber: qa.infoNumber,
              allowJudge: qa.allowJudge,
              wipProdLogs: qa.wipProdLogs,
              wipJobs: qa.wipJobs,
              product: qa.product,
              operation: qa.operation,
              operator: qa.operator,
              machine: qa.machine,
              dicWorkUnits: qa.dicWorkUnits
            })
          }
          // 已经分完活,不能回退
          if (qa.allowJudge === 2) {
            this.value.push(qa.inspectmId)
            this.data.push({
              key: qa.inspectmId,
              label: qa.product.productName,
              disabled: true,
              machineWasterNumber: qa.machineWasterNumber,
              noCheckNum: qa.noCheckNum,
              infoNumber: qa.infoNumber,
              allowJudge: qa.allowJudge,
              wipProdLogs: qa.wipProdLogs,
              wipJobs: qa.wipJobs,
              product: qa.product,
              operation: qa.operation,
              operator: qa.operator,
              machine: qa.machine,
              dicWorkUnits: qa.dicWorkUnits
            })
          }
        })
        // console.log('data', this.data)
        /*       setTimeout(() => {
          this.listLoading = false
          // console.log('tag', this.data)
        }, 1 * 1000) */
      })
    },
    /**
     * direction:right 审核操作
     * direction:left  回退操作
     * movedKeys改变状态的id值,质量表头id
     */
    handleChange(value, direction, movedKeys) {
      this.temp.direction = direction
      this.temp.movedKeys = movedKeys
      this.temp.tokenId = getToken()
      updateMachineCheck(this.temp).then(response => {
        this.getList()
        this.resetTemp()
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    refreshQa() {
      this.resetTemp() // 重置数据
      this.getList() // 获取数据
    },
    changeSwitch(data) {
      if (data) {
        // 开启自动刷新功能
        this.interval = setInterval(() => {
          this.resetTemp() // 先初始化
          this.getList() // 定时刷新获取数据
        }, 2 * 2000)
      } else {
        clearInterval(this.interval)
      }
    },
    // 重置temp实体类变量属性
    resetTemp() {
      this.temp = {
        direction: '',
        movedKeys: [],
        tokenId: ''
      }
      this.data = []
      this.value = []
    },
    handleClose(done) {
      this.dialogVisible = false
      /*    this.$confirm('确认关闭？')
        .then(_ => {

          done()
        })
        .catch(_ => {}) */
    },
    editCanshu() {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
      // 增加修改参数的后台请求操作
      this.dialogVisible = false
    }

  }
}
</script>
<style>
.widController .spanLi {
  width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.widController .spanLi2 {
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.widController .el-tag {
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.el-transfer {
  width: 98%;
  justify-content: space-between;
}
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
.el-transfer-panel {
  min-width: 45%;
}
.el-transfer-panel__body {
  height: 560px;
}
.el-transfer-panel__list.is-filterable {
  height: 560px;
  padding-top: 5px;
}
.el-transfer-panel__filter {
  min-width: 90%;
  max-width: 100%;
}
</style>
