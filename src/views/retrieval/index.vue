<template>
  <div class="retrieval">
    <!-- 查询条件部分 -->
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <!-- 第一行查询 -->
        <div class="first">
          <el-form-item label="灾种">
            <el-select v-model="formInline.display" placeholder="">
              <el-option
                v-for="item in displayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="formInline.date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="历时/天">
            <el-select v-model="formInline.duration" placeholder="">
              <el-option
                v-for="item in durationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上报次数">
            <el-select v-model="formInline.reportNumber" placeholder="">
              <el-option
                v-for="item in reportNumberOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleExport" icon="el-icon-download">导出</el-button>
          </el-form-item>
        </div>
        <!-- 第二行查询 -->
        <div class="second">
          <el-form-item label="省">
            <el-select v-model="formInline.province" placeholder="">
              <el-option
                v-for="item in provinceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市">
            <el-select v-model="formInline.city" placeholder="">
              <el-option
                v-for="item in cityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="县">
            <el-select v-model="formInline.county" placeholder="">
              <el-option
                v-for="item in countyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleSearch" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- list -->
    <div class="list">
      <el-table
        :data="tableData"
        :header-cell-style= "{ 'background': 'rgba(0, 77, 161, 1)', 'text-align': 'center', 'color': 'rgba(255, 255, 255, 1)' }"
        :cell-style= "{ 'text-align': 'center' }"
        stripe
        height="631px"
        style="width: 100%">
        <el-table-column prop="display" show-overflow-tooltip label="灾种"></el-table-column>
        <el-table-column prop="area" show-overflow-tooltip label="区域"></el-table-column>
        <el-table-column prop="date" show-overflow-tooltip label="灾情发生时间"></el-table-column>
        <el-table-column prop="reportDate" show-overflow-tooltip label="上报时间"></el-table-column>
        <el-table-column prop="reportsNum" show-overflow-tooltip label="上报次数"></el-table-column>
        <el-table-column prop="days" show-overflow-tooltip label="历时/天"></el-table-column>
        <el-table-column prop="reports" show-overflow-tooltip label="报告"></el-table-column>
        <el-table-column prop="images" show-overflow-tooltip label="图片">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleExamine(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination pag">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
        :total="total">
      </el-pagination>
    </div>
    <!-- 查看弹窗 -->
    <!-- 任务查看 -->
    <el-dialog
      title="灾情查看"
      :visible.sync="DisasterDialog"
      :close-on-click-modal="false"
      class="DisasterDialog"
      top="16%"
      width="1200px">
      <div class="DisasterCon">
        <!-- list -->
        <el-table
          :data="DisasterData"
          :header-cell-style= "{ 'background': 'rgba(0, 77, 161, 1)', 'text-align': 'center', 'color': 'rgba(255, 255, 255, 1)' }"
          :cell-style= "{ 'text-align': 'center' }"
          stripe
          style="width: 100%">
          <el-table-column prop="display" show-overflow-tooltip label="灾种"></el-table-column>
          <el-table-column prop="date" show-overflow-tooltip label="灾情发生时间"></el-table-column>
          <el-table-column prop="displayPeople" show-overflow-tooltip label="受灾人口（人）"></el-table-column>
          <el-table-column prop="diePeople" show-overflow-tooltip label="因灾死亡人口（人）"></el-table-column>
          <el-table-column prop="cropArea" show-overflow-tooltip label="农作物受灾面积（千公顷）"></el-table-column>
          <el-table-column prop="collapseHouses" show-overflow-tooltip label="倒塌房屋数量（间）"></el-table-column>
          <el-table-column prop="financialLoss" show-overflow-tooltip label="直接经济损失（亿元）"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'retrieval',
  data () {
    return {
      formInline: {
        display: '台风',
        date: null,
        duration: '>5天',
        reportNumber: '>3次',
        province: '广东',
        city: '广州',
        county: '广州'
      },
      // 灾种选择信息
      displayOptions: [
        {
          value: '选项1',
          label: '台风'
        }, {
          value: '选项2',
          label: '冰雹'
        }
      ],
      // 历时/天 选择信息
      durationOptions: [
        {
          value: '选项1',
          label: '>3天'
        }, {
          value: '选项2',
          label: '>4天'
        }, {
          value: '选项3',
          label: '>5天'
        }
      ],
      // 上报次数
      reportNumberOptions: [
        {
          value: '选项1',
          label: '>3次'
        }, {
          value: '选项2',
          label: '>4次'
        }, {
          value: '选项3',
          label: '>5ci'
        }
      ],
      // 省选择信息
      provinceOptions: [
        {
          value: '选项1',
          label: '广东'
        }
      ],
      // 市选择信息
      cityOptions: [
        {
          value: '选项1',
          label: '广州'
        }
      ],
      // 县选择信息
      countyOptions: [
        {
          value: '选项1',
          label: '广州'
        }
      ],
      // 表区数据
      tableData: [
        {
          display: '台风',
          area: '盘龙区',
          date: '2018.08.08 11:11:11',
          reportDate: '2018.08.08 11:11:11',
          reportsNum: '1',
          days: '3',
          reports: '3',
          images: '3'
        }, {
          display: '台风',
          area: '盘龙区',
          date: '2018.08.08 11:11:11',
          reportDate: '2018.08.08 11:11:11',
          reportsNum: '1',
          days: '3',
          reports: '3',
          images: '3'
        }, {
          display: '台风',
          area: '盘龙区',
          date: '2018.08.08 11:11:11',
          reportDate: '2018.08.08 11:11:11',
          reportsNum: '1',
          days: '3',
          reports: '3',
          images: '3'
        }, {
          display: '台风',
          area: '盘龙区',
          date: '2018.08.08 11:11:11',
          reportDate: '2018.08.08 11:11:11',
          reportsNum: '1',
          days: '3',
          reports: '3',
          images: '3'
        }, {
          display: '台风',
          area: '盘龙区',
          date: '2018.08.08 11:11:11',
          reportDate: '2018.08.08 11:11:11',
          reportsNum: '1',
          days: '3',
          reports: '3',
          images: '3'
        }, {
          display: '台风',
          area: '盘龙区',
          date: '2018.08.08 11:11:11',
          reportDate: '2018.08.08 11:11:11',
          reportsNum: '1',
          days: '3',
          reports: '3',
          images: '3'
        }, {
          display: '台风',
          area: '盘龙区',
          date: '2018.08.08 11:11:11',
          reportDate: '2018.08.08 11:11:11',
          reportsNum: '1',
          days: '3',
          reports: '3',
          images: '3'
        }, {
          display: '台风',
          area: '盘龙区',
          date: '2018.08.08 11:11:11',
          reportDate: '2018.08.08 11:11:11',
          reportsNum: '1',
          days: '3',
          reports: '3',
          images: '3'
        }, {
          display: '台风',
          area: '盘龙区',
          date: '2018.08.08 11:11:11',
          reportDate: '2018.08.08 11:11:11',
          reportsNum: '1',
          days: '3',
          reports: '3',
          images: '3'
        }, {
          display: '台风',
          area: '盘龙区',
          date: '2018.08.08 11:11:11',
          reportDate: '2018.08.08 11:11:11',
          reportsNum: '1',
          days: '3',
          reports: '3',
          images: '3'
        }, {
          display: '台风',
          area: '盘龙区',
          date: '2018.08.08 11:11:11',
          reportDate: '2018.08.08 11:11:11',
          reportsNum: '1',
          days: '3',
          reports: '3',
          images: '3'
        }
      ],
      // 每页显示多少条
      pageSize: 11,
      // 当前页
      currentPage: 1,
      // 分页总条数
      total: 0,
      // 灾情查看弹窗
      DisasterDialog: false,
      // 灾情查看 数据
      DisasterData: [
        {
          display: '台风',
          date: '2018.08.08 11:11:11',
          displayPeople: '000',
          diePeople: '000',
          cropArea: '000',
          collapseHouses: '000',
          financialLoss: '000'
        }
      ]
    }
  },
  methods: {
    // 导出
    handleExport () {},
    // 查询
    handleSearch () {},
    // 列表查看
    handleExamine (index, row) {
      this.DisasterDialog = true
    },
    // 分页改变时
    handleCurrentChange (val) {}
  }
}
</script>

<style scoped>
.search {
  text-align: left;
}
.search .first {
  border-bottom: 1px solid rgba(221, 221, 221, 1);
  min-width: 1270px;
  white-space: nowrap;
}
.search .first /deep/ .el-form-item.el-form-item--small:last-child {
  float: right;
  margin-right: 0;
}
.search .first /deep/ .el-form-item.el-form-item--small:last-child .el-button {
  border-radius: 4px;
  border: 1px solid rgba(0,77,161,1);
  color: rgba(40,40,40,1);
}
.search .first /deep/ .el-form-item--small.el-form-item:last-child .el-button i {
  color: rgba(0, 77, 161, 1);
  font-weight: 600;
}
.search .first /deep/ .el-form-item--small.el-form-item {
  margin-right: 40px;
}
.search .first /deep/ .el-form-item--small.el-form-item:nth-child(3) .el-input--small .el-input__inner {
  width: 100px;
}
.search .first /deep/ .el-form-item--small.el-form-item:nth-child(4) .el-input--small .el-input__inner {
  width: 100px;
}
.search .second {
  padding-top: 18px;
}
.search .second /deep/ .el-form-item--small.el-form-item {
  margin-right: 40px;
}
.search .second /deep/ .el-form-item--small.el-form-item .el-input--small .el-input__inner {
  width: 100px;
}
.search .second /deep/ .el-form-item--small .el-form-item__label {
  width: 40px;
  text-align: left;
}
.search .second /deep/ .el-form-item.el-form-item--small:last-child {
  float: right;
  margin-right: 0;
}
.search .second /deep/ .el-form-item.el-form-item--small:last-child .el-button {
  border-radius: 4px;
  border: 1px solid rgba(0,77,161,1);
  color: rgba(40,40,40,1);
}
.search .second /deep/ .el-form-item--small.el-form-item:last-child .el-button i {
  color: rgba(0, 77, 161, 1);
  font-weight: 600;
}
.list /deep/ .el-table__body-wrapper.is-scrolling-none .el-table__row .el-button--mini {
  background: rgba(255,255,255,1);
  border-radius: 4px;
  border: 1px solid rgba(2,153,226,1);
  color: rgba(2,153,226,1);
}
.list /deep/ .el-table__body-wrapper.is-scrolling-none .el-table__row .el-button--mini:hover {
  background: rgba(255,255,255,1);
  border-radius: 4px;
  border: 1px solid rgba(2,153,226,1);
  color: rgba(2,153,226,1);
}
.pagination {
  margin-top: 40px;
  text-align: center;
}
.pag /deep/ .btn-prev {
  padding: 0 10px;
  background: rgba(255,255,255,1);
  border-radius: 2px;
  border: 1px solid rgba(193,193,193,1);
}
.pag /deep/ .btn-next {
  padding: 0 10px;
  background: rgba(255,255,255,1);
  border-radius: 2px;
  border: 1px solid rgba(193,193,193,1);
}
.pag /deep/ .el-pager .number {
  background: rgba(255,255,255,1);
  border-radius: 2px;
  border: 1px solid rgba(193,193,193,1);
}
.pag /deep/ .el-pager .el-icon {
  background: rgba(255,255,255,1);
  border-radius: 2px;
  border: 1px solid rgba(193,193,193,1);
}
.DisasterDialog /deep/ .el-dialog__header {
  text-align: center;
  background: rgba(244,244,244,1);
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1);
  color: rgba(51,51,51,1);
  font-weight: 600;
  padding: 16px;
}
.DisasterDialog /deep/ .el-dialog__headerbtn {
  top: 20px;
}
.DisasterDialog /deep/ .el-dialog__body {
  padding: 30px 20px;
}
</style>
