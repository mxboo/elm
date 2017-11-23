<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2)" class="block positive" :class="{'BPactive':selectType==2,
      'Cactive':selectType==2}">{{desc.all}} <span class="count">{{ratings.length}}</span> </span>
      <span @click="select(0)" class="block positive" :class="{'BPactive':selectType==0,
      'Cactive':selectType==0}">{{desc.positive}} <span class="count">{{positives.length}}</span> </span>
      <span @click="select(1)" class="block negative" :class="{'BNactive':selectType==1,
      'Cactive':selectType==1}">{{desc.negative}}<span class="count">{{negatives.length}}</span> </span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
      <span class="icon-check">!</span>
      <span class="text">只看有内容的评论</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSTIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    methods: {
      select(type) {
        this.$emit('ratingtypeSelect', type)
      },
      toggleContent() {
        let only = !this.onlyContent;
        this.$emit('contentToggle', only)
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSTIVE;
        })
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        })
      }
    }

  }
</script>

<style scoped>
  .ratingselect {
  }

  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    font-size: 0;
  }

  .block {
    display: inline-block;
    padding: 8px 12px;
    border-radius: 2px;
    margin-right: 8px;
    color: rgb(77, 85, 93);
    font-size: 12px;
    line-height: 16px;
  }

  .positive {
    background: rgba(255, 174, 200, .2);
  }

  .negative {
    background: rgba(77, 85, 93, .3)
  }

  .count {
    font-size: 8px;
    margin-left: 2px;
  }

  .Cactive {
    color: lightyellow;
  }

  .BPactive {
    background: rgba(255, 174, 200, .8);
  }

  .BNactive {
    background: rgba(77, 85, 93, 1)
  }

  .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    color: rgb(147, 153, 159)
  }

  .switch .icon-check {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 18px;
    margin-right: 4px;
    font-size: 18px;
    border-radius: 50%;
    background: rgba(7, 17, 27, .1);
  }

  .on .icon-check {
    color: lightyellow;
    background: pink;
    animation: rotateIcon 2s linear infinite;
  }

  @Keyframes rotateIcon {
    0% {
    }
    100% {
      transform: rotateY(360deg)
    }
  }

  .switch .text {
    font-size: 12px;
  }

  .on .text {
    color: rgb(7, 17, 27);
    text-shadow: 5px 5px 1px pink;
  }

</style>
