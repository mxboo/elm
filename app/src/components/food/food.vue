<template>
  <transition name="move">
    <div v-show="showFlag" class="food" @touchstart='touchHide($event)' @touchmove='touchHide1($event)' ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <span class="icon-arrow">返回</span>
          </div>
        </div>
        <div class="content">
          <div class="title">{{food.name}}</div>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" @fg='fLogo':flash="1"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="!food.count || food.count===0 " @click="addFrist">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc='desc' :ratings="food.ratings" @ratingtypeSelect="changeType" @contentToggle="changeToggle"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show='food.ratings && food.ratings.length'>
              <li v-show='needShow(rating.rateType,rating.text)' v-for="rating in food.ratings" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avater" alt="" class="avater" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span v-show="rating.rateType===0" class="up">good</span><span v-show="rating.rateType===1" class="down">bad</span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import Vue from 'vue'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'
  import {formatDate} from '../../common/js/date'

  const POSTIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    computed: {},
    data() {
      return {
        showFlag: false,
        startX: 0,
        selectType:ALL,
        onlyContent:false,
        desc:{
          all:'全部',
          positive:'推荐',
          negative:'吐槽'
        }
      }
    },
    methods: {
      show() {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Bscroll(this.$refs.food, {
              click: true
            })
          }
          else {
            this.scroll.refresh();
          }
        })
      },
      hide() {
        this.showFlag = false;
      },
      touchHide(e) {

        this.startX = e.touches[0].clientX;

      },
      touchHide1(e) {
        let X = e.touches[0].clientX;
        if ((X - this.startX) > 150) {
          this.showFlag = false;
        }
      },
      addFrist() {
        Vue.set(this.food, 'count', 1)
      },
      fLogo(num) {
        this.$emit('fg', num)
      },
      changeType(num){
        this.selectType= num;
      },
      changeToggle(n){
        this.onlyContent = n
      },
      needShow(type,text){
        if(this.onlyContent && !text){
          return false;
        }
        if (this.selectType === ALL){
          return true;
        }else{
          return type === this.selectType;
        }
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect

    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<style scoped>
  .food {
    position: fixed;
    left: 0px;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: white;
    transition: all 1s;
    transform-origin: left bottom;
  }

  .move-enter-active, .move-leave-active {
    transform: rotate(0deg);
  }

  .move-enter, .move-leave-active {
    transform: rotate(90deg);
  }

  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }

  .image-header img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .back {
    position: absolute;
    top: 10px;
    left: 0;
  }

  .icon-arrow {
    display: block;
    padding: 10px;
    color: pink;
    opacity: 0.7;
    font-size: 20px;
  }

  .back:active .icon-arrow {
    color: lightyellow;
  }

  .content {
    padding: 18px;
    position: relative;
  }

  .content .title {
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
  }

  .content .detail {
    margin-bottom: 18px;
    line-height: 10px;
    font-size: 0;
  }

  .sell-count, .rating {
    font-size: 10px;
    color: rgb(147, 153, 159);

  }

  .sell-count {
    margin-right: 12px;
  }

  .price {
    font-weight: bold;
    line-height: 24px;
  }

  .now {
    margin-right: 8px;
    font-size: 14px;
    color: deeppink;
  }

  .old {
    text-decoration: line-through;
    color: rgb(147, 153, 159);
    font-size: 10px;
  }

  .cartcontrol-wrapper {
    position: absolute;
    right: 12px;
    bottom: 12px;
  }

  .buy {
    position: absolute;
    right: 10px;
    bottom: 10px;
    border-radius: 12px;
    z-index: 1000;
    height: 30px;
    line-height: 30px;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 10px;
    color: lightyellow;
    background: pink;
    transition: all 0.5s;
    transform-origin: bottom right;
  }

  .fade-enter-active, .fade-leave-active {
    opacity: 1;
    transform: scale(1);
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: scale(3);
  }

  .info {
    padding: 18px;
  }

  .info .title {
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .info .text {
    font-size: 12px;
    line-height: 24px;
    padding: 0 8px;
    color: rgb(77, 85, 93);
  }
  .rating{
    padding-top:18px;
  }
  .rating .title{
    line-height: 14px;
    font-size: 14px;
    color: rgb(7, 17, 27);
    margin-left: 18px;
  }
  .rating-wrapper{
    padding:0 18px;
  }
  .rating-item{
    position:relative;
    paddinh:16px 0;
    border-bottom:1px solid rgba(7,17,27,.1);
    height: 100px;
    overflow: hidden;
  }
  .rating-item .user{
    position:absolute;
    right:0;
    top:10px;
    font-size: 0;
    line-height:12px;
  }
  .user .name{
    display:inline-block;
    vertical-align: top;
    font-size: 15px;
    color:rgb(147,153,159);
    margin-right: 6px;
  }
  .user .avater{
    border-radius: 50%;
  }
  .time{
    margin: 10px 0 6px 0;
    font-size: 15px;
    line-height: 12px;
    color:rgb(147,153,159);
  }
  .up{
    background: pink;
    color: lightyellow;
    padding:   3px;
    border-radius: 5px;
    margin-right: 10px;
  }
  .down{
    background: #cccccc;
    color: black;
    padding:   3px;
    border-radius: 5px;
    margin-right: 10px;
  }
  .down{}
  .rating-item .text{
    line-height: 16px;
    font-size: 15px;
    color:rgb(7,17,27);
    margin-top: 15px;
  }
  .no-rating{
    padding: 18px 0;
    font-size: 12px;
    color:rgb(147,153,159)
  }
</style>
