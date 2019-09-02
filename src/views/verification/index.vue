<template>
  <div class="verificationBox">
    <!-- 查询条件部分 -->
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
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
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-circle-plus" @click="handleCreateTask">创建任务</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- list -->
    <div class="list">
      <el-table
        :data="tableData"
        :header-cell-style= "{ 'background': 'rgba(0, 77, 161, 1)', 'text-align': 'center', 'color': 'rgba(255, 255, 255, 1)' }"
        :cell-style= "{ 'text-align': 'center' }"
        stripe
        height="684px"
        style="width: 100%">
        <el-table-column prop="date" show-overflow-tooltip label="序号"></el-table-column>
        <el-table-column prop="name" show-overflow-tooltip label="任务地点"></el-table-column>
        <el-table-column prop="address" show-overflow-tooltip label="灾种"></el-table-column>
        <el-table-column prop="date" show-overflow-tooltip label="任务周期"></el-table-column>
        <el-table-column prop="name" show-overflow-tooltip label="任务状态"></el-table-column>
        <el-table-column prop="address" show-overflow-tooltip label="操作">
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
    <!-- 创建任务 -->
    <el-dialog
      title="创建任务"
      :visible.sync="CreateTaskdialog"
      :close-on-click-modal="false"
      class="createtaskDialog"
      width="1008px"
      >
      <div class="createtaskDialogBox">
        <!-- 查询条件 -->
        <el-form :inline="true" :model="formInlineDialog" class="demo-form-inline" size="mini">
          <el-form-item label="任务地点">
            <el-select v-model="formInlineDialog.taskLocation" placeholder="">
              <el-option
                v-for="item in taskLocationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="formInlineDialog.date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="灾种">
            <el-select v-model="formInlineDialog.display" placeholder="">
              <el-option
                v-for="item in displayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- checkBox list -->
        <div class="checkBox">
          <p class="title">人员分配</p>
          <el-checkbox-group v-model="checkedPersonnels" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(item, itemIndex) in allPersonnels" :label="item.label" :key="itemIndex" :title="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="createTaskDialogSure">确 定</el-button>
        <el-button size="small" @click="createTaskDialogCancel">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 任务查看 -->
    <el-dialog
      title="任务查看"
      :visible.sync="taskViewDialog"
      :close-on-click-modal="false"
      class="taskViewDialog"
      width="1200px">
      <div class="taskCon">
        <!-- list -->
        <el-table
          :data="taskViewData"
          :header-cell-style= "{ 'background': 'rgba(0, 77, 161, 1)', 'text-align': 'center', 'color': 'rgba(255, 255, 255, 1)' }"
          :cell-style= "{ 'text-align': 'center' }"
          height="528px"
          stripe
          style="width: 100%">
          <el-table-column prop="date" show-overflow-tooltip label="序号"></el-table-column>
          <el-table-column prop="name" show-overflow-tooltip label="任务地点"></el-table-column>
          <el-table-column prop="address" show-overflow-tooltip label="灾种"></el-table-column>
          <el-table-column prop="date" show-overflow-tooltip label="任务周期"></el-table-column>
          <el-table-column prop="people" show-overflow-tooltip label="人员"></el-table-column>
          <el-table-column prop="progress" show-overflow-tooltip label="进度"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- 分页 -->
        <div class="paginationtaskDialog pag">
          <el-pagination
            background
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :page-size="taskConPageSize"
            :current-page.sync="taskConCurrentPage"
            @current-change="handletaskConPageCurrentChange"
            :total="taskConTotal">
          </el-pagination>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'verification',
  data () {
    return {
      // 查询条件部分
      formInline: {
        display: '台风',
        date: null,
        status: '已上报'
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
      // 状态选择信息
      statusOptions: [
        {
          value: '选项1',
          label: '已上报'
        }, {
          value: '选项2',
          label: '未上报'
        }
      ],
      // 表区数据
      tableData: [
        {
          date: '01',
          name: '王小虎',
          address: '台风'
        }, {
          date: '02',
          name: '王小虎',
          address: '台风'
        }, {
          date: '03',
          name: '王小虎',
          address: '台风'
        }, {
          date: '04',
          name: '王小虎',
          address: '台风'
        }, {
          date: '05',
          name: '王小虎',
          address: '台风'
        }, {
          date: '01',
          name: '王小虎',
          address: '台风'
        }, {
          date: '02',
          name: '王小虎',
          address: '台风'
        }, {
          date: '03',
          name: '王小虎',
          address: '台风'
        }, {
          date: '04',
          name: '王小虎',
          address: '台风'
        }, {
          date: '05',
          name: '王小虎',
          address: '台风'
        }, {
          date: '04',
          name: '王小虎',
          address: '台风'
        }, {
          date: '05',
          name: '王小虎',
          address: '台风'
        }
      ],
      // 每页显示多少条
      pageSize: 12,
      // 当前页
      currentPage: 1,
      // 分页总条数
      total: 0,
      // 创建任务弹窗
      CreateTaskdialog: false,
      // 创建任务弹窗查询添加
      formInlineDialog: {
        taskLocation: 'xxxxxxxxxxxxxxxx1',
        date: null,
        display: '台风'
      },
      // 任务地点选择信息
      taskLocationOptions: [
        {
          value: '选项1',
          label: 'xxxxxxxxxxxxxxxx1'
        }, {
          value: '选项2',
          label: 'xxxxxxxxxxxxxxxx2'
        }
      ],
      // 选中的人员
      checkedPersonnels: [],
      // 所有人员数据
      allPersonnels: [
        { value: '1', label: '上海' },
        { value: '2', label: '北京' },
        { value: '3', label: '广州' },
        { value: '4', label: '深圳' },
        { value: '5', label: '上海1' },
        { value: '6', label: '北京1' },
        { value: '7', label: '广州1' },
        { value: '8', label: '深圳1' },
        { value: '9', label: '上海2' },
        { value: '10', label: '北京2' },
        { value: '11', label: '广州2' },
        { value: '12', label: '深圳2' }
      ],
      // 任务查看弹窗
      taskViewDialog: false,
      // 任务查看list数据
      taskViewData: [
        {
          date: '01',
          name: '王小虎',
          address: '台风',
          people: '人员1',
          progress: '30%'
        }, {
          date: '02',
          name: '王小虎',
          address: '台风',
          people: '人员1',
          progress: '30%'
        }, {
          date: '03',
          name: '王小虎',
          address: '台风',
          people: '人员1',
          progress: '30%'
        }, {
          date: '04',
          name: '王小虎',
          address: '台风',
          people: '人员1',
          progress: '30%'
        }, {
          date: '05',
          name: '王小虎',
          address: '台风',
          people: '人员1',
          progress: '30%'
        }, {
          date: '01',
          name: '王小虎',
          address: '台风',
          people: '人员1',
          progress: '30%'
        }, {
          date: '02',
          name: '王小虎',
          address: '台风',
          people: '人员1',
          progress: '30%'
        }, {
          date: '03',
          name: '王小虎',
          address: '台风',
          people: '人员1',
          progress: '30%'
        }, {
          date: '04',
          name: '王小虎',
          address: '台风',
          people: '人员1',
          progress: '30%'
        }, {
          date: '05',
          name: '王小虎',
          address: '台风',
          people: '人员1',
          progress: '30%'
        }
      ],
      // 任务查看中每页显示多少条
      taskConPageSize: 10,
      // 任务查看中当前页
      taskConCurrentPage: 1,
      // 任务查看中 列表总条数
      taskConTotal: 0
    }
  },
  methods: {
    // 创建任务
    handleCreateTask () {
      this.CreateTaskdialog = true
    },
    // 列表查看
    handleExamine (index, row) {
      // console.log(index, row)
      this.taskConTotal = this.taskViewData.length
      this.taskViewDialog = true
    },
    // 任务查看 列表查看 分页改变时
    handletaskConPageCurrentChange (val) {
      // console.log(`当前页: ${val}`)
    },
    // 分页改变时
    handleCurrentChange (val) {},
    // 创建任务 弹窗check选择change
    handleCheckedCitiesChange (value) {
      // console.log(value)
    },
    // 创建任务 确认按钮
    createTaskDialogSure () {
      this.CreateTaskdialog = false
    },
    // 创建任务 取消按钮
    createTaskDialogCancel () {
      // 清空check选中的内容
      this.checkedPersonnels = []
      this.CreateTaskdialog = false
    }
  },
  mounted () {
    this.total = this.tableData.length
  }
}
</script>

<style scoped>
.verificationBox {
  text-align: left;
}
.search {
  border-bottom: 1px solid rgba(221, 221, 221, 1);
}
.search /deep/ .el-form-item--small.el-form-item {
  margin-right: 40px;
}
.search /deep/ .el-form-item--small.el-form-item:nth-child(3) .el-select > .el-input {
  width: 120px;
}
.search /deep/ .el-form-item--small.el-form-item:nth-child(4) {
  margin-right: 0;
  float: right;
}
.search /deep/ .el-form-item--small.el-form-item:nth-child(4) .el-button {
  /* background:rgba(0,77,161,0.05); */
  border-radius: 4px;
  border: 1px solid rgba(0,77,161,1);
  color: rgba(40,40,40,1);
}
.search /deep/ .el-form-item--small.el-form-item:nth-child(4) .el-button i {
  color: rgba(0, 77, 161, 1);
}
.list {
  padding-top: 22px;
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
.createtaskDialog /deep/ .el-dialog__header {
  text-align: center;
  background: rgba(244,244,244,1);
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1);
  color: rgba(51,51,51,1);
  font-weight: 600;
  padding: 16px;
}

.createtaskDialog /deep/ .el-dialog__headerbtn {
  top: 20px;
}
.createtaskDialog /deep/ .el-dialog__footer {
  text-align: center;
  padding: 20px;
}
.createtaskDialog /deep/ .el-dialog__footer .el-button {
  padding: 9px 30px;
}
.createtaskDialog /deep/ .el-button + .el-button {
  margin-left: 20px;
}
.createtaskDialog /deep/ .el-dialog__body {
  padding: 30px 20px 0;
}
.createtaskDialog .createtaskDialogBox {
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(221,221,221,0.5191);
}
.createtaskDialog .createtaskDialogBox /deep/ .el-form-item.el-form-item--mini {
  margin-right: 42px;
}
.createtaskDialog .createtaskDialogBox /deep/ .el-form-item.el-form-item--mini:nth-child(3) {
  margin-right: 0;
}
.createtaskDialogBox /deep/ .el-form.demo-form-inline.el-form--inline {
  border-bottom: 1px solid rgba(221,221,221,0.5191);
}
.createtaskDialog .checkBox /deep/ .el-checkbox-group {
  max-height: 120px;
  overflow-y: auto;
}
.createtaskDialog .checkBox .title {
  text-align: left;
  margin-top: 18px;
  margin-bottom: 0;
}
.createtaskDialog .checkBox /deep/ .el-checkbox {
  width: 90px;
  margin-top: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.taskViewDialog /deep/ .el-dialog__header {
  text-align: center;
  background: rgba(244,244,244,1);
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1);
  color: rgba(51,51,51,1);
  font-weight: 600;
  padding: 16px;
}
.taskViewDialog /deep/ .el-dialog__headerbtn {
  top: 20px;
}
.taskViewDialog /deep/ .el-dialog__footer {
  text-align: center;
  padding: 20px;
  padding-bottom: 30px;
}
.taskViewDialog /deep/ .el-dialog__footer .el-button {
  padding: 9px 30px;
}
.taskViewDialog /deep/ .el-button + .el-button {
  margin-left: 20px;
}
.taskViewDialog /deep/ .el-dialog__body {
  padding: 30px 20px 0;
}
</style>
