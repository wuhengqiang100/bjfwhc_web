<template>
  <div id="cards">
    <div
      v-for="(card,i) in cards"
      :key="card.title"
      class="card-item"
    >
      <div class="card-header">

        <div class="card-header-left">
          <dv-decoration-11
            v-if="i==0"
            class="card-title"
          >{{ card.title }}</dv-decoration-11>
          <dv-decoration-11
            v-if="i==1"
            class="card-title1"
          >{{ card.title }}</dv-decoration-11>
          <dv-decoration-11
            v-if="i==2"
            class="card-title2"
          >{{ card.title }}</dv-decoration-11>
        </div>
        <div class="card-header-right">
          <dv-decoration-1
            style="width:160px;height:40px;"
            :color="['red', 'green']"
            dur="9"
          />
        </div>

      </div>
      <!-- <dv-charts class="ring-charts" :option="card.ring" /> -->
      <div class="card-content">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-row
              class="row-class main-value"
              type="flex"
              justify="center"
            >
              <el-col :span="10">产品名称</el-col>
              <el-col :span="10"><span>7T</span></el-col>
            </el-row>
            <el-row
              class="row-class compare-value"
              type="flex"
              justify="center"
            >
              <el-col :span="10">卷轴号</el-col>
              <el-col :span="10"><span>0001</span></el-col>
            </el-row>
            <el-row
              class="row-class compare-value"
              type="flex"
              justify="center"
            >
              <el-col :span="10">机速</el-col>
              <el-col :span="10"><span>50m</span></el-col>
            </el-row>
            <el-row
              class="row-class compare-value"
              type="flex"
              justify="center"
            >
              <el-col :span="10">生产班组</el-col>
              <el-col :span="10"><span>001</span></el-col>
            </el-row>
            <el-row
              class="row-class compare-value"
              type="flex"
              justify="center"
            >
              <el-col :span="10">怀疑品数</el-col>
              <el-col :span="10"><span class="question-number">20</span></el-col>
            </el-row>
            <el-row
              class="row-class compare-value"
              type="flex"
              justify="center"
            >
              <el-col :span="10">废品数</el-col>
              <el-col :span="10"><span class="error-number">10</span></el-col>
            </el-row>

          </el-col>
          <el-col :span="12">
            <el-col>
              <el-row
                class="row-class compare-value"
                type="flex"
                justify="center"
              >
                <el-col :span="10">节点</el-col>
                <el-col :span="10"><span>分切</span></el-col>
              </el-row>
              <!--            <el-row class="row-class main-value"
                      type="flex"
                      justify="center">
                <el-col :span="10">产品名称</el-col>
                <el-col :span="10"><span>7T</span></el-col>
              </el-row> -->
              <!-- <el-row class="row-class main-value"
                      type="flex"
                      justify="center">
                <dv-charts class="ring-charts"
                           :option="card.ring" />
              </el-row> -->
              <dv-charts
                class="ring-charts"
                :option="card.ring"
              />
            </el-col>
          </el-col>

        </el-row>
      </div>

      <div class="card-footer">
        <div class="card-footer-item">
          <div class="footer-title">生产总数</div>
          <div class="footer-detail">
            <dv-digital-flop
              :config="card.total"
              style="width:70%;height:35px;"
            />
          </div>
        </div>
        <div class="card-footer-item">
          <div class="footer-title">好品数</div>
          <div class="footer-detail">
            <dv-digital-flop
              :config="card.num"
              style="width:70%;height:35px;"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cards',
  data() {
    return {
      cards: []
    }
  },
  mounted() {
    const { createData } = this

    createData()

    setInterval(this.createData, 30000)
  },
  methods: {
    createData() {
      const { randomExtend } = this

      this.cards = new Array(3).fill(0).map((foo, i) => ({
        title: '设备' + (i + 1),
        total: {
          number: [randomExtend(9500, 10000)],
          content: '{nt}',
          textAlign: 'right',
          style: {
            fill: '#ea6027',
            fontWeight: 'bold'
          }
        },
        num: {
          number: [randomExtend(8500, 9500)],
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
                { name: '好品率', value: randomExtend(80, 100) }
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
                  fontSize: 18
                }
              }
            }
          ],
          color: ['#03d3ec']
        }
      }))
    },
    randomExtend(minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      }
    }
  }
}
</script>

<style lang="less">
.card-title {
  width: 160px;
  height: 48px;
}
.card-title1 {
  width: 160px;
  height: 48px;
  background-color: royalblue;
}
.card-title2 {
  width: 160px;
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
    font-size: 24px;
    color: #00c0ff;
    margin-left: 22px;
  }
}

.compare-value {
  height: 24px;
  line-height: 24px;
  font-size: 16px;

  span {
    margin-left: 24px;
  }
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
