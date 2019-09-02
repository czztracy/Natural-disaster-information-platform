<template>
  <div class="examine">
    <div class="goBack">
      <el-button @click="$router.go(-1)" icon="el-icon-arrow-left">返回</el-button>
    </div>
    <div class="content">
      <h1>{{ $route.query.title }}</h1>
      <p class="date">{{ $route.query.date }}</p>
      <p class="describe">{{ $route.query.describe }}</p>
      <div class="imgBox">
        <img src="@/assets/images/map.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'examine',
  mounted () {
    console.log(this.$route.query)
  }
}
</script>

<style scoped>
.goBack {
  border-bottom: 1px solid #DDDDDD;
  padding-bottom: 16px;
  text-align: left;
}
.goBack /deep/ .el-button {
  border: 0;
  font-size: 16px;
  color: rgba(51,51,51,1);
}
.goBack /deep/ .el-button:hover {
  background: #FFFFFF;
  color: rgba(51,51,51,1);
}
.content .date {
  color:#b3b2b2;
  font-size: 14px;
  margin-top: 30px;
}
.content .describe {
  font-size: 16px;
  color: #333333;
  margin-top: 40px;
}
.content .imgBox {
  margin-top: 40px;
}
</style>
