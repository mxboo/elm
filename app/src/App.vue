<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="/seller">商店</router-link></div>
    </div>
    <transition name="run">
      <keep-alive>
        <router-view :seller="seller" id="run"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header.vue'
  const ERR_OK = 0;
export default {
    data() {
      return{
        seller:{
        }
      }
    },
  created(){
    this.$http.get('/api/seller?').then((res) => {
      res = res.body;
      if(res.errno === ERR_OK){
        this.seller = res.data;
      }
    });
  },
components:{
  'v-header':header
}
};
</script>

<style>
#app .tab{
  display:flex;
  width: 100%;
  height: 40px;
  line-height :40px;
}
#app .tab .tab-item{
  flex: 1;
  text-align :center;
  overflow: hidden;
}
#app .tab .tab-item a{
  display: block;
  font-size:14px;
  color:rgb(77,85,93);
}
 .a {
   animation: topBottom 1s linear infinite;
  color:pink!important;
   box-shadow: 0 -5px 0px 0px pink inset;
   background:  white;
  }
  @keyframes topBottom {
    0%{}
    50%{
      /*box-shadow: 0 40px 10px 1px pink inset;*/
      color: deeppink;
      transform: scale(1);
      background:white ;
    }
    100%{
      /*box-shadow: 0 0px 10px 1px pink inset;*/
      color:  pink;
      transform: scale(1);
      background:  white;
    }
  }
  #run{
    transition: all 1s;
    transform-origin: center center;
  }
.run-enter-active ,.run-leave-active {
  opacity: 1;
  /*filter: blur(4px);*/
}
.run-enter ,.run-leave-active {
  opacity: 0;
  /*filter: blur(0px);*/
}
</style>
