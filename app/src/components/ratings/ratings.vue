<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore" class="star"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore" class="star"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :selectType="selectType" :onlyContent="onlyContent"  :ratings="ratings" @ratingtypeSelect="changeType" @contentToggle="changeToggle" ></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
            <div class="avater">
              <img :src="rating.avater" alt="" width="28"height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span v-show="rating.rateType===0" class="up">good</span><span v-show="rating.rateType===1" class="down">bad</span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from 'components/star/star'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'
  import {formatDate} from '../../common/js/date'
  import BScroll from 'better-scroll'

  const ALL = 2;
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return{
        ratings:[],
        selectType:ALL,
        onlyContent:false,
      }
    },
    components: {
      star,
      split,
      ratingselect
    },
    created(){
      this.$http.get('/api/ratings').then((res) => {
        res = res.body;
        if(res.errno === ERR_OK){
          this.ratings = res.data;
          this.$nextTick(() =>{
            this.scroll = new BScroll(this.$refs.ratings,{
              click:true
            })
          })
        }
      })
    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm');
      }
    },
    methods:{
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
    }

  };

</script>

<style scoped>
  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  .overview {
    display: flex;
    padding: 18px 0;
  }

  .overview-left {
    padding: 6px 0;
    flex: 0 0 137px;
    width: 137px;
    border-right: 1px solid rgba(7, 17, 27, .1);
    text-align: center;
  }
  .score {
    line-height: 28px;
    font-size: 24px;
    color: hotpink;
    margin-bottom: 6px;
  }

  .title {
    line-height: 12px;
    font-size: 12px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
  }

  .rank {
    font-size: 10px;
    line-height: 10px;
    color: rgb(147, 153, 159);
  }
  .overview-right {
    flex: 1;
    padding:6px 0 6px 24px;
  }
  .score-wrapper{
    margin-bottom: 8px;
    line-height: 18px;
    font-size: 0px;
  }
  .score-wrapper .title{
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    color:rgb(7,17,27);
    line-height: 18px;
  }
  .star{
    display: inline-block;
    margin: 0 12px ;
    vertical-align: middle;
  }
  .score-wrapper .score{
    display:inline-block;
    vertical-align: middle;
    font-size: 12px;
    color: hotpink;
    line-height: 18px;
  }
  .deliveryTime{
    font-size: 0px;

  }
  .deliveryTime .title{
    font-size: 12px;
    color:rgb(7,17,27);
    line-height: 18px;
  }
  .delivery{
    margin-left: 12px;
    font-size: 12px;
    color:rgb(147, 153, 159);
    margin-top: 4px;
  }
  @media screen and (max-width: 320px){
    .overview-left{
      flex: 0 0 110px;
      width: 110px;
    }
    .overview-right{
      padding-left: 8px;
    }

  }
  .rating-wrapper{
    padding:0 18px;
  }
  .rating-item{
    display: flex;
    padding: 18px 0;
    border-bottom:1px solid rgba(7,17,27,.1);
  }

  .avater{
    flex:0 0 28px;
    width: 28px;
    margin-right: 12px;
  }
  .avater img{
    border-radius: 50%;
  }
  .content{
    position:relative;
    flex:1;
  }
  .name{
    margin-bottom: 4px;
    line-height: 12px;
    font-size: 10px;
    color:rgb(7,17,27)
  }
  .star-wrapper{
    margin-bottom: 6px;
    font-size: 0;
  }
  .star{
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
  }
  .delivery{
    display: inline-block;
    vertical-align: top;
    line-height: 12px;
    font-size: 10px;
    color:rgb(147,153,159)
  }
  .text{
    margin-bottom: 18px;
    line-height: 18px;
    color:rgb(7,17,27);
    font-size: 12px;
  }
  .recommend{
    line-height: 16px;
  }

  .up{
    font-size: 10px;
    background: pink;
    color: lightyellow;
    padding:   3px;
    border-radius: 5px;
    margin: 10px 0px 20px 0px;
  }
  .item{
    margin:  0 8px 0 4px;
    display: inline-block;
    font-size: 9px;
    padding:  0 6px;
    border:1px solid rgba(7,17,27,.1);
    color:rgb(147,153,159);
    background:white;
  }
.time{
  position:absolute;
  top: 0;
  right: 0;
  line-height: 12px;
  font-size: 10px;
  color:rgb(147,153,159);

}
</style>
