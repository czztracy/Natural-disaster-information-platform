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
        <el-form-item label="时间">
          <el-date-picker
            v-model="formInline.time"
            type="daterange"
            range-separator="——"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上报状态">
          <el-select v-model="formInline.index" placeholder="上报状态" multiple collapse-tags>
            <el-option v-for="item in indexList" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="create">创建快报</el-button>
        </el-form-item>
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
            <el-button @click="handleClick(scope.row)" type="text" size="small" class="operate">查看</el-button>
            <el-button type="text" size="small" class="operate">上报</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 创建弹框 -->
    <el-dialog title="创建快报" :visible.sync="dialogTableVisible">
      <div class="create-head">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="上报类型">
            <el-select v-model="tableDataCreate.type" placeholder="活动区域">
              <el-option v-for="item in typeList" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table
          :data="tableDataCreate"
          border
          :header-cell-style="{'background-color':'#004DA1','color':'#FFFFFF','height':'52px'}"
          stripe
          style="width: 100%">
          <el-table-column
            align="center"
            label="灾种">
            <template slot-scope="scope">
              <el-select v-model="formCreate.disaster" placeholder="灾种" multiple collapse-tags @change="aaa(scope)">
                <el-option v-for="item in areaList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="发生时间">
            <template slot-scope="scope">
              <el-date-picker
                v-model="formCreate.happen"
                type="date"
                value-format="yyyy-MM-dd"
                @change="aaa(scope)"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="受灾人口(人)">
            <template slot-scope="scope">
               <el-input v-model="formCreate.disasterNumber" placeholder="请输入内容" @change='aaa(scope)'></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="因灾死亡人口(人)">
            <template slot-scope="scope">
               <el-input v-model="formCreate.dieNumber" placeholder="请输入内容" @change='aaa(scope)'></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="农作物受灾面积（千公顷）">
            <template slot-scope="scope">
               <el-input v-model="formCreate.crop" placeholder="请输入内容" @change='aaa(scope)'></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="倒塌房屋数量（间）">
            <template slot-scope="scope">
               <el-input v-model="formCreate.collapse" placeholder="请输入内容" @change='aaa(scope)'></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="直接经济损失 （亿元）">
            <template slot-scope="scope">
               <el-input v-model="formCreate.economics" placeholder="请输入内容" @change='aaa(scope)'></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='create-bottom'>
        <el-button type="primary" @click="createSure">确定</el-button>
        <el-button type="primary" @click="createCancel">取消</el-button>
      </div>
    </el-dialog>
    <!-- 查看弹窗 -->
    <el-dialog title="创建快报" :visible.sync="dialogTableLook">
      <div class="create-head">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="上报类型">
            <el-select v-model="type" placeholder="活动区域">
              <el-option v-for="item in typeList" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
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
        <el-button type="primary" @click="LookSure">确定</el-button>
        <el-button type="primary" @click="LookSure">取消</el-button>
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
      dialogTableVisible: false,
      dialogTableLook: false,
      type: '',
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
        { disaster: '', happen: '', disasterNumber: '', dieNumber: '', crop: '', collapse: '', economics: '', type: '' }
      ],
      formCreate: { disaster: '', happen: '', disasterNumber: '', dieNumber: '', crop: '', collapse: '', economics: '', type: '' },
      tableDataLook: [{ disaster: '火灾', happen: '2019', disasterNumber: '1', dieNumber: '1', crop: '1', collapse: '1', economics: '1', type: '1' }],
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
        { label: '已上报', value: '1' },
        { label: '未上报', value: '2' }
      ]
    }
  },
  methods: {
    // 创建快报
    onSubmit () {
      this.dialogTableVisible = true
    },
    // 创建快报确定
    createSure () {
      this.dialogTableVisible = false
    },
    // 创建快报取消
    createCancel () {
      this.dialogTableVisible = false
    },
    // 查看
    handleClick (val) {
      // this.tableDataLook = []
      this.dialogTableLook = true
      // this.tableDataLook.push(val)
    },
    LookSure () {
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
  justify-content: space-between;
}
.head /deep/ .el-form-item{
  text-align: left;
  margin-bottom: 0;
  margin-right: 0;
}
.head /deep/ .el-form-item:nth-child(1) {
  width: 20%;
  min-width: 212px;
}
.head /deep/ .el-form-item:nth-child(2) {
  width: 20%;
  min-width: 207px;
}
.head /deep/ .el-form-item:nth-child(3) {
  width: 26%;
  min-width: 304px;
}
.head /deep/ .el-form-item:nth-child(4) {
  width: 20%;
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
  width: 40px;
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
