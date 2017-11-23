<template>
<div class="header">
  <div class="content-wrapper">
    <div class="avater">
      <img width='64' height='64' :src="seller.avatar" alt="">
    </div>
    <div class="content">
      <div class="title">
        <span class="brand"></span>
        <span class="name">{{seller.name}}</span>
      </div>
      <div class="description">
        {{seller.description}}/{{seller.deliveryTime}}分钟送达
      </div>
      <div v-if="seller.supports" class="support">
        <span class="icon" :class="classMap[seller.supports[0].type]"></span>
        <span class="text">{{seller.supports[0].description}}</span>
      </div>
    </div>
    <div v-if="seller.supports" class="support-count" @click="showDetail">
      <span class="count">{{seller.supports.length}}个</span>
      <span class="icon-right">></span>
    </div>
  </div>
  <div class="bulletin-wrapper" @click="showDetail">
    <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    <span class="bulletin-right">></span>
  </div>
  <div class="background">
    <img :src="seller.avatar" width="100%" height="100%" alt="">
  </div>
  <transition name="fade">  <div class="detail" v-show="detailShow">
    <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <h1 class="name">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :size="48" :score="seller.score"></star>
        </div>
        <div class="title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <div class="text">{{seller.supports[index].description}}</div>
          </li>
        </ul>
        <div class="title">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div class="bulletin">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
    </div>
    <div class="detail-close" @click="closeDetail">
      <span class="icon-close">^</span>
    </div>
  </div></transition>
</div>
</template>

<script>

import  star from '../star/star'
  export default {
props: {
  seller:{
    type:Object
  }
},
    data(){
      return{
        detailShow:false
      }
    },
    methods:{
      showDetail:function(){
        this.detailShow = true
      },
      closeDetail:function(){
        this.detailShow = false
      }
    },
    created(){
  this.classMap = ['decrease','discount','special','invoice','guarantee'];
    },
    components:{
      star
    }
  };
</script>

<style scoped>
  body,html{
    line-height:1;
    font-weight: 200;
    font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif;
  }
.header{
  color: white;
  position: relative;
  background: rgba(7,17,27,.5);
  overflow: hidden;
}
  .content-wrapper{
    padding:24px 12px 18px 24px;
    font-size: 0px;
    position: relative;
  }
  .avater{
    display:inline-block;
    vertical-align: top;
  }
  .avater img{
    border-radius: 2px;
  }
  .content{
    display: inline-block;
    font-size:14px;
    margin-left: 14px;
  }
  .title{
    margin: 2px 0px 8px 0px;
  }
  .brand{
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 18px;
    background-image:url("./brand@2x.png");
    background-size: 30px 18px;
    background-repeat: no-repeat;

  }
.name{
  margin-left: 6px;
  font-size: 16px;
  ling-height:18px;
  font-weight:bold;
  color: pink;
}
  .description{
    margin-bottom: 10px;
    line-height:12px;
    font-size: 12px;
  }
.support .icon{
  display: inline-block;
  vertical-align: top;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.text{
  line-height:12px;
  font-size: 10px;
}
  .decrease{
    background-image: url("decrease_1@2x.png");
  }
  .discount{
    background-image: url("discount_1@2x.png");
  }
 .guarantee{
    background-image: url("guarantee_1@2x.png");
  }
 .invoice{
    background-image: url("invoice_1@2x.png");
  }
 .special{
    background-image: url("special_1@2x.png");
  }

  .support-count{
    position: absolute;
    right:12px;
    bottom: 14px;
    padding:0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0,0,0,.2);
    text-align:center;
  }
  .count{
    font-size: 10px;
  }
  .icon-right{
    font-size: 10px;
    line-height:24px;
    margin-left: 2px;
  }

  .bulletin-wrapper{
    height: 28px;
    line-height:28px;
    padding:0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    background: rgba(7,17,27,.2);
  }
  .bulletin-title{
    display: inline-block;
    vertical-align: middle;
    width: 22px;
    height: 12px;
    background-image: url("bulletin@2x.png");
    background-size: 22px 12px;
    background-repeat: no-repeat;
  }
  .bulletin-text{
    font-size:10px;
    margin:0 4px;
  }
  .bulletin-right{
    font-size: 10px;
    position: absolute;
    top:3px;
    right:5px;
  }

  .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .detail{
    position: fixed;
    top:0;
    left:0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7,17,27,.8);
    transition: all 0.2s;
    backdrop-filter:blur(10px);
  }
 .fade-enter-active,.fade-leave-active{
    opacity: 1;
   filter: blur(5px);
  }
   .fade-enter,.fade-leave-active{
    opacity: 0;
     filter: blur(0px);

   }
  .detail-wrapper{
    width: 100%;
    min-height: 100%;
  }
  .detail-main{
    margin-top:64px;
    padding-bottom:64px;
  }
  .detail-main .name{
    line-height: 16px;
    text-align: center;
    font-weight: bold;
  }
  .detail-main .star-wrapper{
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
  .detail-main .title{
    display: flex;
    width: 80%;
    margin: 28px auto 24px auto;
  }
  .detail-main .title .line{
    flex: 1;
    position: relative;
    top:-6px;
    border-bottom:1px solid rgba(255,255,255,.2);
  }
  .detail-main .title .text{
    padding: 0 12px;
    font-size: 14px;
    font-weight: bold;
  }
  .supports{
    width: 80%;
    margin: 0 auto;
  }
  .supports .support-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size:0;
  }
  .supports .support-item:last-child{
    margin-bottom: 0;
  }
  .supports .support-item .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat:no-repeat ;
  }
  .supports .support-item .text{
    display: inline-block;
    line-height:16px;
    font-size:12px;
  }
  .detail-wrapper .bulletin{
    width: 80%;
    margin: 0 auto;
  }
  .detail-wrapper .bulletin .content{
    padding: 0 12px;
    line-height:24px;
    font-size:12px;
  }
  .detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear:both;
    font-size: 32px;
  }
</style>
