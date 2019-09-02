<template>
  <div class="chuckBox">
    <div class="topChuckBox">
      <div class="chuck" v-for="(item, itemIndex) in topList" :key="itemIndex" @click="handleRouterLink(item.path, item.meta.title)">
        <div v-if="!item.hidden">
          <div class="iconBox">
            <i :class="item.meta.icon"></i>
          </div>
          <p class="text">{{ item.meta.title }}</p>
        </div>
      </div>
    </div>
    <div class="bottomChuckBox">
      <div class="chuck" v-for="(item, itemIndex) in bottomList" :key="itemIndex" @click="handleRouterLink(item.path, item.meta.title)">
        <div v-if="!item.hidden">
          <div class="iconBox">
            <i :class="item.meta.icon"></i>
          </div>
          <p class="text">{{ item.meta.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modules',
  data () {
    return {
      topList: [],
      bottomList: []
    }
  },
  methods: {
    handleRouterLink (path, title) {
      this.$store.dispatch('GET_TITLE', title)
      this.$router.push({
        path: path
      })
    }
  },
  created () {
    let ChuckList = this.$router.options.routes[0].children
    ChuckList.map((item, itemIndex) => {
      if (item.hidden) {
        ChuckList.splice(itemIndex, 1)
      }
    })
    // 承接数组
    let arr = []
    for (var i = 0; i < ChuckList.length; i += 3) {
      arr.push(ChuckList.slice(i, i + 3))
    }
    this.topList = arr[0]
    this.bottomList = arr[1]
  }
}
</script>

<style scoped>
.chuckBox {
  text-align: center;
  margin-top: 4%;
}
.topChuckBox {
  /* text-align: center; */
  margin-bottom: 40px;
}
.chuckBox .chuck {
  position: relative;
  width: 130px;
  height: 212px;
  background:rgba(255,255,255,1);
  box-shadow: 1px 2px 25px 0px rgba(0,77,161,0.1);
  border-radius: 10px;
  display: inline-block;
  margin: 0 30px;
  padding: 50px 87px 30px;
  cursor: pointer;
}
.chuckBox .chuck:hover {
  background: rgba(0, 77, 161, 1);
}
.chuckBox .chuck:hover .iconBox {
  background: rgba(255, 255, 255, 1);
}
.chuckBox .chuck:hover .text {
  color:rgba(255,255,255,1);
}
.chuckBox .chuck .iconBox {
  position: relative;
  width: 130px;
  height: 130px;
  background: rgba(0,77,161,0.05);
  border-radius: 50%;
}
.chuckBox .chuck .iconBox i {
  /* position: absolute;
  top: 32px;
  left: 42px; */
  margin-top: 32px;
  color: rgba(0, 77, 161, 1);
  font-size: 60px;
}
.chuckBox .chuck .text {
  position: absolute;
  font-size: 22px;
  font-weight: 500;
  color: rgba(51,51,51,1);
  line-height: 30px;
  left: 106px;
  bottom: 32px;
}
</style>
