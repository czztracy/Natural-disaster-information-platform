<template>
  <el-container>
    <el-header style="height: 8vh; min-height:78px; background: rgba(0, 77, 161, 1); padding: 0 40px;">
      <div class="leftCon">
        <img src="@/assets/images/headerlogo.png" />
        <span class="title" @click="handleGohome">自然灾害信息管理平台</span>
        <span v-if="title" style="padding: 0 20px">|</span>
        <span>{{ title }}</span>
      </div>
      <div class="rightCont">
        <i class="fa fa-user-circle-o"></i>
        <span class="text">欢迎你</span>
        <span class="text">减灾中心</span>
        <span class="text">|</span>
        <span class="text">退出</span>
      </div>
    </el-header>
    <el-main style="min-height: 92vh; min-width: 1200px; padding: 20px 40px;">
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  // name: 'main',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['title'])
  },
  methods: {
    handleGohome () {
      // 标题处理
      this.$store.dispatch('GET_TITLE', '')
      // 防止在本页面跳转
      if (window.location.href.indexOf('/modules') !== -1) {} else {
        this.$router.push({ path: '/' })
      }
    }
  },
  components: {
  },
  mounted () {
  }
}
</script>

<style scoped>
.leftCon {
  float: left;
}
.leftCon img {
  margin-top: 10px;
  float: left;
}
.leftCon span {
  font-size: 20px;
  font-weight: 500;
  color: rgba(255,255,255,1);
  display: inline-block;
  margin-top: 24px;
  margin-left: 12px;
  cursor: pointer;
}
.rightCont {
  float: right;
  color: #dfdfdf;
  font-size: 14px;
}
.rightCont i {
  font-size: 24px;
  margin-right: 12px;
  float: left;
  margin-top: 26px;
  cursor: pointer;
}
.rightCont .text {
  float: left;
  padding-right: 10px;
  margin-top: 29px;
}
.rightCont .text:nth-child(4) {
  padding-right: 14px;
  padding-left: 4px;
}
.rightCont .text:nth-child(5) {
  cursor: pointer;
}
</style>
