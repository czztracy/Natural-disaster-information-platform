<template>
  <div class='disaster-rapid'>
    <div class="head">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size='small'>
        <el-form-item label="上报类型">
          <el-select v-model="formInline.themeType" placeholder="类型">
            <el-option v-for="item in typeList" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="灾种">
          <el-select v-model="formInline.area" placeholder="灾种" multiple collapse-tags>
            <el-option v-for="item in areaList" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上报时间">
          <el-date-picker
            v-model="formInline.time"
            type="daterange"
            range-separator="——"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="formInline.index" placeholder="审核状态" multiple collapse-tags>
            <el-option v-for="item in indexList" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit" class="create">创建快报</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <div class='content'>
      <el-table
        :data="tableData"
        :header-cell-style="{'background-color':'#004DA1','color':'#FFFFFF','height':'52px'}"
        stripe
        style="width: 100%">
        <el-table-column
          prop="index"
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="code"
          align="center"
          label="行政区划">
        </el-table-column>
        <el-table-column
          prop="disaster"
          align="center"
          label="灾种">
        </el-table-column>
        <el-table-column
          prop="happen"
          align="center"
          label="发生时间">
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          label="上报类型">
        </el-table-column>
        <el-table-column
          prop="state"
          align="center"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="supper"
          align="center"
          label="超级上报">
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" class="operate">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 审核弹窗 -->
    <el-dialog title="快报审核" :visible.sync="dialogTableLook">
      <div>
        <el-table
          :data="tableDataLook"
          border
          :header-cell-style="{'background-color':'#004DA1','color':'#FFFFFF','height':'52px'}"
          stripe
          style="width: 100%">
          <el-table-column
            prop="disaster"
            align="center"
            label="灾种">
          </el-table-column>
          <el-table-column
            prop="happen"
            align="center"
            label="发生时间">
          </el-table-column>
          <el-table-column
            prop="disasterNumber"
            align="center"
            label="受灾人口(人)">
          </el-table-column>
          <el-table-column
            prop="dieNumber"
            align="center"
            label="因灾死亡人口(人)">
          </el-table-column>
          <el-table-column
            prop="crop"
            align="center"
            label="农作物受灾面积（千公顷）">
          </el-table-column>
          <el-table-column
            prop="collapse"
            align="center"
            label="倒塌房屋数量（间）">
          </el-table-column>
          <el-table-column
            prop="economics"
            align="center"
            label="直接经济损失 （亿元）">
          </el-table-column>
        </el-table>
      </div>
      <div class='create-bottom'>
        <el-button type="primary" @click="pass">通过</el-button>
        <el-button type="primary" @click="reject">驳回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'bulletin',
  data () {
    return {
      // 创建
      dialogTableLook: false,
      formInline: {
        themeType: '',
        area: [],
        time: '',
        index: []
      },
      tableData: [
        { index: '1', code: '某省', disaster: '火种', happen: '2018', type: '初报', state: '已上报', supper: '是' }
      ],
      tableDataCreate: [
        { disaster: '火种', happen: '2018', disasterNumber: '0', dieNumber: '0', crop: '0', collapse: '0', economics: '0' }
      ],
      tableDataLook: [{ disaster: '火种', happen: '2018', disasterNumber: '1', dieNumber: '1', crop: '1', collapse: '1', economics: '1' }],
      // 下拉
      typeList: [
        { label: '初报', value: '1' },
        { label: '核报', value: '2' }
      ],
      areaList: [
        { label: '火灾', value: '1' },
        { label: '台风', value: '2' },
        { label: '干旱', value: '3' },
        { label: '洪涝', value: '4' },
        { label: '地震', value: '5' }
      ],
      parameterList: [
        { label: '因灾住院救治', value: '1' },
        { label: '紧急转移安置', value: '2' },
        { label: '需紧急生活救助', value: '3' },
        { label: '房屋倒塌', value: '4' },
        { label: '房屋损坏', value: '5' },
        { label: '受灾人口', value: '6' },
        { label: '死亡人口', value: '7' },
        { label: '直接经济损失', value: '8' },
        { label: '农作物受灾面积', value: '9' },
        { label: '农作物绝收', value: '10' }
      ],
      indexList: [
        { label: '未审核', value: '1' },
        { label: '已审核', value: '2' }
      ]
    }
  },
  methods: {
    // 审核
    handleClick (val) {
      this.tableDataLook = []
      this.dialogTableLook = true
      this.tableDataLook.push(val)
    },
    // 通过
    pass () {
      this.dialogTableLook = false
    },
    // 驳回
    reject () {
      this.dialogTableLook = false
    }
  }
}
</script>
<style scoped>
.head{
  height: 64px;
  border-bottom: 1px solid #DDDDDD;
  /* margin-top: 25px; */
}
.create{
  background: #fff;
  color: #282828;
}
.head /deep/ .el-form {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
.head /deep/ .el-form-item{
  text-align: left;
  margin-bottom: 0;
  margin-right: 0;
}
.head /deep/ .el-form-item:nth-child(1) {
  width: 15%;
  min-width: 212px;
}
.head /deep/ .el-form-item:nth-child(2) {
  width: 15%;
  min-width: 207px;
}
.head /deep/ .el-form-item:nth-child(3) {
  width: 20%;
  min-width: 360px;
}
.head /deep/ .el-form-item:nth-child(4) {
  width: 15%;
  min-width: 212px;
}
.head /deep/ .el-form-item:nth-child(5) {
  width: 28%;
  min-width: 300px;
  text-align: right;
}
.head /deep/ .el-form-item:nth-child(1) .el-form-item__label{
  width: 72px;
}
.head /deep/ .el-form-item:nth-child(1) .el-form-item__content{
  min-width: 100px;
  width: 60%;
}
.head /deep/ .el-form-item:nth-child(2) .el-form-item__label{
  width: 41px;
}
.head /deep/ .el-form-item:nth-child(2) .el-form-item__content{
  min-width: 156px;
  width: 70%;
}
.head /deep/ .el-form-item:nth-child(3) .el-form-item__label{
  width: 72px;
}
.head /deep/ .el-form-item:nth-child(3) .el-form-item__content{
  width: 60%;
  min-width: 264px;
}
.head /deep/ .el-form-item:nth-child(4) .el-form-item__label{
  width: 72px;
}
.head /deep/ .el-form-item:nth-child(4) .el-form-item__content{
  width: 60%;
  min-width: 100px;
}
.head /deep/ .el-form-item .el-form-item__label{
  width: 20%;
}
.head /deep/ .el-form-item .el-form-item__content{
  width: 80%;
}
.head /deep/ .el-form-item .el-form-item__content .el-select{
  width: 100%;
}
.el-range-editor--small.el-input__inner{
  max-width: 264px;
}
.content{
  height: 779px;
}
.operate{
  width:56px;
  height:24px;
  line-height: 7px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(2,153,226,1);
  color: #0299E2
}
.disaster-rapid /deep/ .el-dialog{
  width: 90.58%;
}
.disaster-rapid /deep/ .el-dialog__header{
  background: rgba(244,244,244,1);
  padding-bottom: 20px;
}
.disaster-rapid /deep/ .el-dialog__body{
  padding: 20px 40px 0 40px;
}
.create-head /deep/ .el-form{
  text-align: left;
}
.create-bottom {
  margin-top: 30px;
  height: 75px;
  border-top: 1px solid rgba(221,221,221,1);
  padding-top: 30px;
}
.create-bottom .el-button{
  width:100px;
  height:32px;
  line-height: 4px;
  background:rgba(0,77,161,1);
  border-radius:4px;
}
</style>
