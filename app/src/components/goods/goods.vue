<template>
<div>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex == index}" @click="selectMenu(index)">
        <span class="text">
          <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
        </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="food-list food-list-hook" :id="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectedFood(food)">
              <div class="icon">
                <img :src="food.icon" width='57' height='57' alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @fg ='fLogo' :flash="1"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref='shopcart' :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
  <food :food="selectFood" ref="food" @fg ='fLogo'></food>
</div>
</template>

<script>
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import food from 'components/food/food'
const ERR_OK = 0;
  export default {
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return{
        goods:{},
        listHeight:[],
        scrollY: 0,
        selectFood:{}
      }
    },
    computed:{
      currentIndex(){
        for(let i = 0; i < this.listHeight.length; i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
        let foods = [];
//        this.goods.forEach((good) => {
//          good.foods.forEach((food) => {
//            if(food.count){
//              foods.push(food);
//            }
//          })
//        })
        for(let i in this.goods){
          for(let j in this.goods[i].foods){
            if(this.goods[i].foods[j].count){
              foods.push(this.goods[i].foods[j])
            }
          }
        }
        return foods;
      }
    },
    created(){
      this.classMap = ['decrease','discount','special','invoice','guarantee'];
      this.$http.get('/api/goods').then((res) => {
        res = res.body;
        if(res.errno === ERR_OK){
          this.goods = res.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          })
        }
      })
    },
    methods:{
      _initScroll(){
        this.menuScroll = new BScroll(this.$refs.menuWrapper,{
          click : true
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper,{
          probeType:3,
          click : true
        });

        this.foodScroll.on('scroll',(pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight(){
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for(let i = 0; i < foodList.length; i++){
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index){
//        if(!event._constrcucted){
//          return;
//        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el,600);
      },
      selectedFood(food){
        this.selectFood = food;
        this.$refs.food.show();
      },
      fLogo(){
        this.$refs.shopcart.flyLogo();
      }
    },
    components:{
      shopcart,
      cartcontrol,
      food
    }
  };
</script>

<style>

  .goods{
    display: flex;
    position:absolute;
    top:174px;
    bottom:46px;
    width:100%;
    overflow: hidden;
  }
.goods .menu-wrapper{
  flex:0 0 80px;
  width:80px;
  background: #f3f5f7;
}
.menu-item{
  display:table;
  height: 54px;
  width: 56px;
  line-height:14px;
  padding: 0px 12px;
}
  .menu-item .icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: top;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat:no-repeat ;
  }
  .decrease{
    background-image: url("decrease_3@2x.png");
  }
  .discount{
    background-image: url("discount_3@2x.png");
  }
  .guarantee{
    background-image: url("guarantee_3@2x.png");
  }
  .invoice{
    background-image: url("invoice_3@2x.png");
  }
  .special{
    background-image: url("special_3@2x.png");
  }
  .menu-item .text{
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
    border-bottom:1px solid rgba(7,17,27,.1);
    text-align: center;
  }
  .current{
 animation: rotate 3s linear infinite;
    color: deeppink;
  }
  @keyframes rotate {
    0%{}
    100%{
      transform: rotateY(360deg);
    }
  }

  .goods .foods-wrapper{
    flex:1;
  }
  .foods-wrapper .title{
    padding-left: 14px;
    height: 26px;
    line-height:26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color:rgb(147,153,159);
    background: #f3f5f7;
  }
  .food-item{
    display: flex;
    margin:18px;
    padding-bottom: 18px;
    border-bottom:1px solid rgba(7,17,27,.1);
  }
  .food-item:last-child{
    border-bottom:0px;
    margin-bottom: 0px;
  }
  .food-item .icon{
    flex:0 0 57px;
    margin-right: 10px;
  }
  .food-item .content{
    flex:1;
    position: relative;
  }
  .food-item .name{
    margin:2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color:rgb(7,17,27);
  }
  .food-item .desc,.food-item .extra{
    line-height: 10px;
    font-size: 10px;
    color:rgb(147,153,159)
  }
  .food-item .desc{
    margin-bottom: 8px;
  }
  .food-item .extra .count{
    margin-right: 12px;
  }
  .food-item .price{
    font-weight: bold;
    line-height: 24px;
  }
  .cartcontrol-wrapper{
    position:absolute;
    right: -5px;
    bottom: -12px;
  }
  .now{
    margin-right: 8px;
    font-size: 14px;
    color:deeppink;
  }
  .old{
    text-decoration: line-through;
    color:rgb(147,153,159);
    font-size: 10px;
  }
</style>
