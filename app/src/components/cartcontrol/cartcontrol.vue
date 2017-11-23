<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-dec" v-show="food.count>0" @click.stop="decCart" :class="{'focus':food.count>0&&focusHide}">
        <span class="inner">-</span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop="addCart()"  :class="{'addfocus':focusShow}">+
      <div v-for="(item,index) in 20" class="cart-add cart-adds" @click="flyHeight(index,$event)"  ref="flys">+</div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {store} from '../../common/js/store'
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      },
      flash:{
        type:Number
      }
    },
    data() {
      return {
        focusShow: false,
        focusHide: false,
        flyShow: false,
      }
    },
    created() {
//      this.$nextTick(() => {
//        let mydata = JSON.parse(localStorage.getItem(this.food.name));
//        for(let i in localStorage){
//          if(this.food.name == i && !this.food.count){
//            Vue.set(this.food,'count',mydata)
//          }
//        }
//
//      })
    },
    methods: {
      addCart(num) {
        var self = this;
        if(this.flash==1){
          this.focusShow = true;
        }else if(this.flash==2){
          this.focusShow = false;
        }
        this.flyShow = true;
        this.$emit('fg',num);
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
          localStorage.setItem(this.food.name,JSON.stringify(this.food.count));
        } else {
          this.food.count++;
          localStorage.setItem(this.food.name,JSON.stringify(this.food.count));
        }

        setTimeout(function () {
          self.focusShow = false
        }, 301)
        setTimeout(function () {
          self.flyShow = false
        }, 1001)
      },
      decCart() {
        var self = this;
        this.focusHide = true;
        this.food.count--;
        localStorage.setItem(this.food.name,JSON.stringify(this.food.count));
        setTimeout(function () {
          self.focusHide = false
        }, 301)
      },
      flyHeight(index,event) {
      this.$nextTick(() => {
        let self = this;
        let eX = event.offsetX;
        let eY = event.offsetY;
        let flys = this.$refs.flys;
        self.addTransition(flys[index]);
        if(this.flash==1){
          flys[index].style.transform = 'translate(' + (0 + eX) + 'px,' + (eY) + 'px)';
          setTimeout(function(){
            flys[index].style.transform = 'translate(' + (-40 + eX) + 'px,' + (1700+ eY) + 'px)';
          },300)
          setTimeout(function(){
            flys[index].style.transform = 'translate(' + (-70 + eX) + 'px,' + (0+ eY) + 'px)';
          },500)
          setTimeout(function(){
            flys[index].style.transform = 'translate(' + (-110 + eX) + 'px,' + (1700+ eY) + 'px)';
          },800)
          setTimeout(function () {
            self.removeTransition(flys[index]);
            self.$refs.flys[index].style.transform = 'translate(0px,0px)';
          },1201)
        }
        else if(this.flash==2){
          let x = -window.innerWidth;
          let y = window.innerHeight;
          flys[index].style.transform = 'translate(' + (x) + 'px,' + (40) + 'px)';
          setTimeout(function(){
            flys[index].style.transform = 'translate(' + (x) + 'px,' + (60) + 'px)';
          },200)
          setTimeout(function(){
            flys[index].style.transform = 'translate(' + (x) + 'px,' + (80) + 'px)';
          },400)
          setTimeout(function(){
            flys[index].style.transform = 'translate(' + (eY) + 'px,' + (-(eY-1000)) + 'px)';
          },1100)
          setTimeout(function () {
            self.removeTransition(flys[index]);
            self.$refs.flys[index].style.transform = 'translate(0px,0px)';
          },1201)
        }
      })
      },
      addTransition(el) {

        el.style.webkitTransition = "all 1.2s linear";
        el.style.transition = "all 1.2s linear";
      },
      removeTransition(el) {

        el.style.webkitTransition = "none";
        el.style.transition = "none";
      }

    },

  }

</script>

<style scoped>
  .cartcontrol {
    font-size: 0;
  }

  .cart-add {
    text-align: center;
    width: 24px;
    height: 24px;
    display: inline-block;
    font-size: 24px;
    color: lightyellow;
    border-radius: 50%;
    background: pink;
    line-height: 22px;
    position: relative;
  }

  .cart-adds {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    transition: all 1.2s linear;
  }
  .focus {
    animation: duel 0.3s linear infinite;
  }

  @keyframes duel {
    0% {
    }
    50% {
      transform: scale(2);
    }
    100% {
      transform: scale(1);
    }
  }

  .addfocus{
    animation: addduel 0.25s linear;
  }
  @keyframes addduel {
    0% {
    }
    50% {
   box-shadow:0px 0px 20px 1px rgba(0,0,0,.6);
    }
    100% {

    }
  }
  .cart-count {
    display: inline-block;
    font-size: 20px;
    margin: 0 5px 0 5px;
    color: hotpink;
  }

  .cart-dec {
    border-radius: 50%;
    text-align: center;
    display: inline-block;
    border: 2px pink solid;
    background: transparent;
    width: 22px;
    height: 22px;
    transition: all 0.5s linear;
  }

  .move-enter-active, .move-leave-active {
    opacity: 1;
    transform: translate3D(0, 0, 0);
  }

  .move-enter, .move-leave-active {
    opacity: 0;
    transform: translate3D(30px, 0, 0);
  }

  .move-enter .inner, .move-leave-active .inner {
    opacity: 0;
    transform: translate3D(30px, 0, 0);
    transform: rotate(180deg);
  }

  .inner {
    display: inline-block;
    color: pink;
    line-height: 17px;
    font-size: 28px;
    transition: all 0.5s linear;
    transform: rotate(0);
  }
</style>
