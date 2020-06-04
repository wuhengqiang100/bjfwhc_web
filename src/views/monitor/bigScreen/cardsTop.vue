<template>
  <div id="cards">
    <div v-for="(card, key, index) in cards" :key="index" class="card-item">
      <!-- <el-row> -->
      <div class="card-header">
        <div class="card-header-left">
          <dv-decoration-11 v-if="card.status==0" class="card-title">{{ card.title }}</dv-decoration-11>
          <dv-decoration-11 v-if="card.status==1" class="card-title1">{{ card.title }}</dv-decoration-11>
          <dv-decoration-11 v-if="card.status==2" class="card-title2">{{ card.title }}</dv-decoration-11>
        </div>
        <div class="card-header-right">
          <dv-decoration-1 style="width:160px;height:40px;" :color="['red', 'green']" dur="9" />
        </div>
      </div>
      <!-- <dv-charts class="ring-charts" :option="card.ring" /> -->
      <div class="card-content">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-row class="row-class main-value" type="flex" justify="center">
              <el-col :span="8">产品名称</el-col>
              <el-col :span="12"><span>{{ card.productName }}</span></el-col>
              <!-- <el-col :span="12"><span>{{ index }}</span></el-col> -->
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="8">卷轴号</el-col>
              <el-col :span="12"><span>{{ card.rollNum }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="8">机速</el-col>
              <el-col :span="12"><span>{{ card.machineSpeed }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="8">生产班组</el-col>
              <el-col :span="12"><span>{{ card.shiftTeam }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="8">怀疑品数</el-col>
              <el-col :span="12"><span class="question-number">{{ card.doubtNum }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="8">废品数</el-col>
              <el-col :span="12"><span class="error-number">{{ card.wasteNum }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="7">开始时间</el-col>
              <el-col :span="13"><span style="font-size:12px">{{ card.startDate }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="7">结束时间</el-col>
              <el-col :span="13"><span style="font-size:12px">{{ card.endDate }}</span></el-col>
            </el-row>

          </el-col>
          <el-col :span="12">
            <el-col>
              <el-row class="row-class compare-value" type="flex" justify="center">
                <el-col :span="7">状态</el-col>
                <el-col :span="13">
                  <span v-if="card.status==0">未开机</span>
                  <span v-if="card.status==1">生产中</span>
                  <span v-if="card.status==2">设备异常</span>
                </el-col>
              </el-row>
              <el-row class="row-class compare-value" type="flex" justify="center">
                <el-col :span="7">模板</el-col>
                <el-col :span="13"><span>{{ card.templateName }}</span></el-col>
              </el-row>
              <el-row type="flex" justify="center" style="margin-top:50px">
                <el-col :span="20" :offset="4"><dv-charts class="ring-charts" :option="card.ring" /></el-col>
              </el-row>

            </el-col>
          </el-col>
        </el-row>
      </div>
      <div class="card-footer">
        <div class="card-footer-item">
          <div class="footer-title">生产总数</div>
          <div class="footer-detail">
            <dv-digital-flop :config="card.total" style="width:70%;height:35px;" />
          </div>
        </div>
        <div class="card-footer-item">
          <div class="footer-title">好品数</div>
          <div class="footer-detail">
            <dv-digital-flop :config="card.num" style="width:70%;height:35px;" />
          </div>
        </div>
      </div>
      <!-- </el-row> -->
      <!-- <el-row v-else> -->
      <!--  <div class="card-header">
        <div class="card-header-left">
          <dv-decoration-11 v-if="card.status==0" class="card-title">{{ card.title }}</dv-decoration-11>
          <dv-decoration-11 v-if="card.status==1" class="card-title1">{{ card.title }}</dv-decoration-11>
          <dv-decoration-11 v-if="card.status==2" class="card-title2">{{ card.title }}</dv-decoration-11>
        </div>
        <div class="card-header-right">
          <dv-decoration-1 style="width:160px;height:40px;" :color="['red', 'green']" dur="9" />
        </div>
      </div>

      <div class="card-content">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-row class="row-class main-value" type="flex" justify="center">
              <el-col :span="8">产品名称</el-col>
              <el-col :span="12"><span>{{ card.productName }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="8">卷轴号</el-col>
              <el-col :span="12"><span>{{ card.rollNum }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="8">机速</el-col>
              <el-col :span="12"><span>{{ card.machineSpeed }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="8">生产班组</el-col>
              <el-col :span="12"><span>{{ card.shiftTeam }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="8">怀疑品数</el-col>
              <el-col :span="12"><span class="question-number">{{ card.doubtNum }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="8">废品数</el-col>
              <el-col :span="12"><span class="error-number">{{ card.wasteNum }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="7">开始时间</el-col>
              <el-col :span="13"><span style="font-size:12px">{{ card.startDate }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="7">结束时间</el-col>
              <el-col :span="13"><span style="font-size:12px">{{ card.endDate }}</span></el-col>
            </el-row>

          </el-col>
          <el-col :span="12">
            <el-col>
              <el-row class="row-class compare-value" type="flex" justify="center">
                <el-col :span="7">模板</el-col>
                <el-col :span="13"><span>{{ card.templateName }}</span></el-col>
              </el-row>
              <dv-charts class="ring-charts" :option="card.ring" />
            </el-col>
          </el-col>
        </el-row>
      </div>
      <div class="card-footer">
        <div class="card-footer-item">
          <div class="footer-title">生产总数</div>
          <div class="footer-detail">
            <dv-digital-flop :config="card.total" style="width:70%;height:35px;" />
          </div>
        </div>
        <div class="card-footer-item">
          <div class="footer-title">好品数</div>
          <div class="footer-detail">
            <dv-digital-flop :config="card.num" style="width:70%;height:35px;" />
          </div>
        </div>
      </div> -->
      <!-- </el-row> -->

    </div>
  </div>
</template>

<script>
import { fetchListCardTop } from '@/api/monitor'
// import { listOptionAuditParameter, listOptionAuditParameterByIds } from '@/api/querySelectOption'

export default {
  name: 'CardsTop',
  data() {
    return {
      cards: [],
      monitorList: []
    }
  },
  mounted() {
    const { createData } = this

    createData()

    setInterval(this.createData, 3000)
  },
  methods: {
    createData() {
      // const { randomExtend } = this
      fetchListCardTop().then(response => {
        this.monitorList = response.monitorList

        this.cards = new Array(this.monitorList.length).fill(0).map((foo, i) => ({
          // title: '设备' + (i + 1),
          rollNum: this.monitorList[i].rollNum,
          productName: this.monitorList[i].productName,
          templateName: this.monitorList[i].templateName,
          shiftTeam: this.monitorList[i].shiftTeam,
          startDate: this.monitorList[i].startDate,
          endDate: this.monitorList[i].endDate,
          totalNum: this.monitorList[i].totalNum,
          goodNum: this.monitorList[i].goodNum,
          doubtNum: this.monitorList[i].doubtNum,
          wasteNum: this.monitorList[i].wasteNum,
          goodRate: this.monitorList[i].goodRate,
          machineSpeed: this.monitorList[i].machineSpeed,
          machineId: this.monitorList[i].machineId,
          machineName: this.monitorList[i].machineName,
          status: this.monitorList[i].status,

          title: this.monitorList[i].machineName,
          total: {
            // number: [randomExtend(9500, 10000)],
            number: [this.monitorList[i].totalNum],
            content: '{nt}',
            textAlign: 'right',
            style: {
              fill: '#ea6027',
              fontWeight: 'bold'
            }
          },
          num: {
            // number: [randomExtend(8500, 9500)],
            number: [this.monitorList[i].goodNum],
            content: '{nt}',
            textAlign: 'right',
            style: {
              fill: '#26fcd8',
              fontWeight: 'bold'
            }
          },
          ring: {
            series: [
              {
                type: 'gauge',
                startAngle: -Math.PI / 2,
                endAngle: Math.PI * 1.5,
                arcLineWidth: 13,
                radius: '80%',
                data: [
                  // { name: '好品率', value: randomExtend(80, 100) }
                  { name: '好品率', value: this.toPercent(this.monitorList[i].goodRate) }
                ],
                axisLabel: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                pointer: {
                  show: false
                },
                backgroundArc: {
                  style: {
                    stroke: '#224590'
                  }
                },
                details: {
                  show: true,
                  formatter: '好品率{value}%',
                  style: {
                    fill: '#1ed3e5',
                    fontSize: 16
                  }
                }
              }
            ],
            color: ['#03d3ec']
          }
        }))
      })
    },
    randomExtend(minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      }
    },
    toPercent(point) {
      var str = Number(point * 100).toFixed(1)
      // str += '%'
      return str
    }
  }
}
</script>

<style lang="less">

.card-title {
  min-width: 160px;
    max-width: 250px;

  height: 48px;
}
.card-title1 {
  min-width: 160px;
    max-width: 250px;

  height: 48px;
  background-color: royalblue;
}
.card-title2 {
  min-width: 160px;
  max-width: 250px;
  height: 48px;
  background-color: red;
}
.question-number {
  color: #91463c;
}
.error-number {
  color: red;
}
.row-class {
  margin-bottom: 10px;
}
.main-value {
  font-weight: bold;
  line-height: 24px;

  font-size: 16px;

  span {
    font-size: 22px;
    color: #00c0ff;
    margin-left: 22px;
  }
}

.compare-value {
  height: 22px;
  line-height: 24px;
  font-size: 16px;

  span {
    margin-left: 22px;
  }
}
.el-row {
    // position:absolute;
    // -webkit-box-sizing: border-box;
    // box-sizing: border-box;
}
#cards {
  display: flex;
  justify-content: space-between;
  height: 49%;

  .card-item {
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, 0.5);
    width: 33%;
    display: flex;
    flex-direction: column;
  }

  .card-header {
    display: flex;
    height: 20%;
    align-items: center;
    justify-content: space-between;

    .card-header-left {
      font-size: 16px;
      font-weight: bold;
      padding-left: 20px;
    }

    .card-header-right {
      padding-right: 20px;
      font-size: 24px;
      color: #03d3ec;
    }
  }
  .card-content {
    height: 55%;
  }
  .main-content {
    height: 55%;
  }
  .ring-charts {
    height: 150px;
    width: 150px;
  }
  .row-bg {
    padding: 10px 0;
  }

  .card-footer {
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .card-footer-item {
    padding: 5px 10px 0px 10px;
    box-sizing: border-box;
    width: 40%;
    background-color: rgba(6, 30, 93, 0.7);
    border-radius: 3px;

    .footer-title {
      font-size: 15px;
      margin-bottom: 5px;
    }

    .footer-detail {
      font-size: 20px;
      color: #1294fb;
      display: flex;
      font-size: 18px;
      align-items: center;

      .dv-digital-flop {
        margin-right: 5px;
      }
    }
  }
}

</style>
