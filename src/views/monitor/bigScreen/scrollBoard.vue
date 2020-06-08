<template>
  <div id="scroll-board" style="height:98%;background-color: #091a2d;">
    <!-- <div class="table-name">
        <img src="./img/icon1.png" />人员贡献排行榜
      </div> -->

    <dv-scroll-board :config="config" @click="testClick" />
  </div>
</template>

<script>
import { fetchListMachineWarning } from '@/api/monitor'

export default {
  name: 'ScrollBoard',
  data() {
    return {
      config: {}
    }
  },
  // create() {
  //   const { createData } = this

  //   createData()

  //   setInterval(this.createData, 3000)
  // },
  mounted() {
    const { createData } = this

    createData()

    setInterval(this.createData, 34000)
  },
  methods: {
    createData() {
      fetchListMachineWarning().then(response => {
        this.config = {
          header: ['站点', '报警描述'],
          data: response.warnings,
          index: true,
          columnWidth: [65, 110],
          align: ['center'],
          rowNum: 20,
          headerBGC: '#1981f6',
          headerHeight: 45,
          oddRowBGC: 'rgba(0, 44, 81, 0.8)',
          evenRowBGC: 'rgba(10, 29, 50, 0.8)',
          carousel: 'single',
          indexHeader: '序号'
        }
      })
    },
    // 预留后面用来展示报警的具体信息
    testClick(row, ceil, rowIndex, columnIndex) {
      console.log(row)
      console.log(row.ceil)
      console.log(row.rowIndex)
      console.log(row.columnIndex)
    }
  }
}
</script>

<style lang="less">
#scroll-board {
  width: 98%;
  box-sizing: border-box;
  margin-left: 20px;
  height: 100%;
  overflow: hidden;

}
  .table-name {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;

    img {
      width: 25px;
      height: 25px;
      margin-right: 5px;
    }
  }

</style>
