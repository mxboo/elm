<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}" ref="gou">
              <span class="icon-shopping_cart" :class="{'highlight1':totalCount>0}" v-show="!listShow">购</span>
              <span class="icon-shopping_cart icon-cart-focus" :class="{'highlight1':totalCount>0}"
                    v-show="listShow">^</span>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight1':totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title"></h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" :flash="2" @fg='fLogo'></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="jade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';

  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {

        fold: true
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        })
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return '￥' + this.minPrice + '元起送'
        }
        else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return '还差￥' + diff + '元起送'
        }
        else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        }
        else {
          return 'enough';
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh();
            }

          })
        }
        return show;
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      logoHeight(event) {
        this.$emit('gou', event.target)
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
          localStorage.setItem(food.name, JSON.stringify(food.count));
        })
      },
      hideList() {
        this.fold = true;
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert('支付' + this.totalPrice + '元')
      },
      flyLogo() {
        this.$nextTick(() => {
          let self = this;
          setTimeout(function () {
            self.$refs.gou.style.transform = 'scale(1.2) rotate(60deg)'
          }, 1000)
          setTimeout(function () {
            self.$refs.gou.style.transform = 'scale(1) rotate(0deg)'
          }, 1200)
        })
      },
      fLogo(num) {
        this.flyLogo()
      }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style scoped>
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    background: black
  }

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
  }

  .content-left {
    flex: 1;
  }

  .content-right {
    flex: 0 0 100px;
    width: 100px;
  }

  .logo-wrapper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;
    vertical-align: top;
  }

  .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: lightyellow;
    text-align: center;
    transition: all 0.25s;
  }

  .highlight {
    background: pink;
  }

  .icon-shopping_cart {
    color: #80858a;
    font-size: 24px;
    line-height: 44px;
  }

  .icon-cart-focus {
    line-height: 60px;
    font-size: 40px;
    animation: icondrop 1s infinite;
  }

  @keyframes icondrop {
    0% {
    }
    50% {
      line-height: 50px;
    }
    100% {
      line-height: 60px;
    }
  }

  .highlight1 {
    color: lightyellow !important;
  }

  .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
    background: deeppink;
    font-size: 10px;
  }

  .price {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    box-sizing: border-box;
    padding-right: 8px;
    border-right: 1px solid rgba(255, 255, 255, .1);
    font-size: 16px;
    font-weight: bold;
    color: rgba(255, 255, 255, .4);
    margin-top: 12px;
  }

  .desc {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 8px;
    font-size: 8px;
    color: rgba(255, 255, 255, .4);
  }

  .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    color: rgba(255, 255, 255, .4);
    background: #2b333b;
  }

  .not-enough {
    background: #2b333b;
  }

  .enough {
    background: pink;
    color: lightyellow;
  }

  .ball-coontainer {

  }

  .ball {
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
    transition: all 0.4s;
  }

  .drop-enter-active, .drop-leave-active {
    opacity: 1;
    background: rgba(7, 17, 27, .8);
  }

  .drop-enter, .drop-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }

  .inner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: pink;
  }

  .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transition: all 0.5s;
    transform: translate3d(0, -100%, 0);
  }

  .fold-enter-active, .fold-leave-active {

  }

  .fold-enter, .fold-leave-active {
    transform: translate3d(0, 0, 0);
  }

  .list-header {
    overflow: hidden;
    position: relative;
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .list-header .title {
    float: left;
    font-size: 14px;
    color: deeppink;
    position: absolute;
    top: 15px;
  }

  .list-header .empty {
    float: right;
    font-size: 12px;
    color: pink;
  }

  .list-content {
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
    background: lightyellow;
  }

  .list-content .food {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #cccccc;
  }

  .list-content .food .name {
    line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .list-content .food .price {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    color: deeppink;
    font-weight: bold;
    font-size: 14px;
  }

  .list-content .food .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 11px;
  }

  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    -webkit-backdrop-filter: blur(10px);
    background: rgba(7, 17, 27, .7);
    transition: all 1s;
  }

  .jade-enter-active, .jade-leave-active {
    opacity: 1;
    background: rgba(7, 17, 27, .7);
  }

  .jade-enter, .jade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
</style>
