<template>
  <div class="warning">
    <!-- 查询条件部分 -->
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="预警种类">
          <el-select v-model="formInline.warningTypes" placeholder="">
            <el-option
              v-for="item in warningTypesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警等级">
          <el-select v-model="formInline.warningLevel" placeholder="">
            <el-option
              v-for="item in warningLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
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
          <el-button icon="el-icon-search" @click="handleWarningSearch">预警查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 总条数 -->
    <div class="totalBox">
      <span>一共</span>
      <span>{{ total }}</span>
      <span>条</span>
    </div>
    <!-- list -->
    <div class="listBox">
      <div class="list" v-for="(item, itemIndex) in listData" :key="itemIndex">
        <img :src="item.image" />
        <div class="text">
          <p>{{ item.title }}</p>
          <p>{{ item.date }}</p>
        </div>
        <div class="btn">
          <el-button size="mini" @click="handleExamine(item)">查看</el-button>
        </div>
      </div>
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
  </div>
</template>

<script>
export default {
  name: 'warning',
  data () {
    return {
      // 查询条件部分
      formInline: {
        warningTypes: '台风预警',
        warningLevel: '蓝色',
        province: '广东',
        city: '广州',
        county: '广州'
      },
      // 预警种类选择数据
      warningTypesOptions: [
        { value: '1', label: '台风预警' }
      ],
      // 预警等级选择数据
      warningLevelOptions: [
        { value: '2', label: '蓝色' }
      ],
      // 省选择信息
      provinceOptions: [
        { value: '选项1', label: '广东' }
      ],
      // 市选择信息
      cityOptions: [
        { value: '选项1', label: '广州' }
      ],
      // 县选择信息
      countyOptions: [
        { value: '选项1', label: '广州' }
      ],
      // list 数据
      listData: [
        { image: 'http://localhost:9999/images/Image1.png', title: '安徽省宣城市发布雷雨大风橙色预警', date: '2019-08-27 11:58:49', describe: '未来6小时宣州区部分地区将出现雷雨大风天气，风力7—8级并伴有雷电。请注意防范！（预警信息来源：国家预警信息发布中心）' },
        { image: 'http://localhost:9999/images/Image2.png', title: '广州省广东市发布台风橙色预警', date: '2019-08-27 11:58:49', describe: '广东市台风橙色预警，风力7—8级。请注意防范！（预警信息来源：国家预警信息发布中心）' },
        { image: 'http://localhost:9999/images/Image3.png', title: '广州省广东市发布台风蓝色预警', date: '2019-08-27 11:58:49', describe: '广东市台风蓝色预警，风力7—8级。请注意防范！（预警信息来源：国家预警信息发布中心）' },
        { image: 'http://localhost:9999/images/Image3.png', title: '广州省广东市发布台风蓝色预警', date: '2019-08-27 11:58:49', describe: '广东市台风蓝色预警，风力7—8级。请注意防范！（预警信息来源：国家预警信息发布中心）' },
        { image: 'http://localhost:9999/images/Image3.png', title: '广州省广东市发布台风蓝色预警', date: '2019-08-27 11:58:49', describe: '广东市台风蓝色预警，风力7—8级。请注意防范！（预警信息来源：国家预警信息发布中心）' },
        { image: 'http://localhost:9999/images/Image3.png', title: '广州省广东市发布台风蓝色预警', date: '2019-08-27 11:58:49', describe: '广东市台风蓝色预警，风力7—8级。请注意防范！（预警信息来源：国家预警信息发布中心）' },
        { image: 'http://localhost:9999/images/Image3.png', title: '广州省广东市发布台风蓝色预警', date: '2019-08-27 11:58:49', describe: '广东市台风蓝色预警，风力7—8级。请注意防范！（预警信息来源：国家预警信息发布中心）' }
      ],
      // 每页显示多少条
      pageSize: 7,
      // 当前页
      currentPage: 1,
      // 分页总条数
      total: 0
    }
  },
  methods: {
    // 预警查询
    handleWarningSearch () {},
    // list 查看
    handleExamine (item) {
      this.$router.push({
        path: '/warning/examine',
        query: {
          title: item.title,
          date: item.date,
          describe: item.describe
        }
      })
      console.log(item)
    },
    // 分页改变时
    handleCurrentChange (val) {}
  },
  mounted () {
    this.total = this.listData.length
  }
}
</script>

<style scoped>
.search {
  text-align: left;
  border-bottom: 1px solid #DDDDDD;
}
.search /deep/ .el-form-item--small.el-form-item:nth-child(2) .el-input--small .el-input__inner {
  width: 180px;
}
.search /deep/ .el-form-item--small.el-form-item:nth-child(3) .el-input--small .el-input__inner {
  width: 100px;
}
.search /deep/ .el-form-item--small.el-form-item:nth-child(4) .el-input--small .el-input__inner {
  width: 100px;
}
.search /deep/ .el-form-item--small.el-form-item:nth-child(5) .el-input--small .el-input__inner {
  width: 100px;
}
.search /deep/ .el-form-item--small.el-form-item {
  margin-right: 40px;
}
.search /deep/ .el-form-item--small.el-form-item:last-child {
  float: right;
  margin-right: 0;
}
.search /deep/ .el-form-item.el-form-item--small:last-child .el-button {
  border-radius: 4px;
  border: 1px solid rgba(0,77,161,1);
  color: rgba(40,40,40,1);
}
.search /deep/ .el-form-item--small.el-form-item:last-child .el-button i {
  color: rgba(0, 77, 161, 1);
  font-weight: 600;
}

.totalBox {
  text-align: right;
  border-bottom: 1px solid #DDDDDD;
  padding: 24px 0 12px;
  font-size: 12px;
  color: #333;
}
.totalBox span:nth-child(2) {
  color: #619dde;
  padding: 2px;
}
.listBox .list {
  border-bottom: 1px solid #DDDDDD;
  padding: 14px 0;
  overflow: hidden;
}
.listBox .list img {
  float: left;
  margin-right: 16px;
}
.listBox .list .text {
  float: left;
}
.listBox .list .text p {
  margin: 0;
  text-align: left;
}
.listBox .list .text p:first-child {
  color: #333333;
  font-size: 16px;
  font-weight: 600;
  line-height: 36px;
}
.listBox .list .text p:last-child {
  color: #8B8B8B;
  font-size: 12px;
  line-height: 30px;
}
.listBox .list .btn {
  float: right;
  line-height: 66px;
}
.listBox .list .btn /deep/ .el-button {
  border-radius: 4px;
  border: 1px solid rgba(2,153,226,1);
  color: #0299E2;
}
.listBox .list .btn /deep/ .el-button:hover {
  border: 1px solid rgba(2,153,226,1);
  background: rgba(255,255,255,1);
  color: #0299E2;
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
/* .list /deep/ .el-table__body-wrapper.is-scrolling-none .el-table__row .el-button--mini {
  background: rgba(255,255,255,1);
  border-radius: 4px;
  border: 1px solid rgba(2,153,226,1);
  color: rgba(2,153,226,1);
} */
</style>
