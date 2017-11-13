<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="fooddec">
      <div>
        <div class="food-content">
          <div class="img-header">
            <img :src="food.image" alt="">
            <div class="icon-wrap" @click.stop.prevent="showFlag=false" @touchstart.stop.prevent="showFlag=false">
              <svg class="icon icon-color" aria-hidden="true">
  						<use xlink:href="#icon-arrow_lift"></use>
						</svg>
            </div>
          </div>
          <fooddec :food="food"></fooddec>
          <div class="cartcontrol-warp">
            <cartcontrol v-show="food.count>0" :food="food"></cartcontrol>
            <transition name="fade">
              <span @touchstart.stop.prevent="addCart($event)" @click.stop.prevent="addCart($event)" v-show="!food.count || food.count===0">加入购物车</span>
            </transition>
          </div>
        </div>
        <split></split>
        <div class="info">
          <h2 class="title">商品信息</h2>
          <div class="text text-indent">{{food.info}}</div>
        </div>
        <split></split>
        <div class="rating">
          <h2 class="title">商品评价</h2>
          <!-- ⑥ @ratingtypeselect="getSelectType"子组件ratingtypeselect方法,触发父组件getSelectType方法 -->
          <keep-alive><ratingselect @ratingtypeselect="getSelectType" @contenttoggle="getToggleContent" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect></keep-alive>
          <div class="rating-wrap">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img width="12" height="12" :src="rating.avatar" alt="" class="avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span class="icon-up" v-show="rating.rateType===0">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-thumb_up"></use>
                    </svg>
                  </span>
                  <span class="icon-down" v-show="rating.rateType===1">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-thumb_down"></use>
                    </svg>
                  </span>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import fooddec from '@/components/fooddec/fooddec';
  import cartcontrol from '@/components/cartcontrol/cartcontrol';
  import split from '@/components/split/split';
  // 通过export default暴露的模块不需要加 {}
  import ratingselect from '@/components/ratingselect/ratingselect';
  // 通过export function +函数名方式 需要用 {函数名+函数名+....}
  import {formatDate} from '@/common/js/date';

  const POSITIVE = 0;
  const NEGATIVE = 0;
  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    created() {

    },
    methods: {
      show() {
        this.showFlag = true;
        //* 以下两个为初始化显示状态(当组件数据被多次使用前可以将数据恢复到初始状态)
        //由子组件$emit触发事件修改父组件数据
        this.selectType = ALL;
        this.onlyContent = false;
        //*
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.fooddec, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        })
      },
      addCart(event) {
        if (!this.food.count) {
          // vue不能给food新增字段count,需要用set增加
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        //$emit触发父组件的carAdd事件
        this.$root.eventHub.$emit('cartadd', event.target);
      },
      getSelectType(type) {
        //** ⑤绑定子组件 @ratingtypeselect 触发"getSelectType"方法 修改父组件的数据
        this.selectType = type;
      },
      getToggleContent(msg) {
        this.onlyContent = msg;
      },
      needShow(type, text) {
        //console.log(text);
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          //console.log(ALL);
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    components: {
      fooddec,
      cartcontrol,
      split,
      ratingselect
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    watch: {

    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../common/sass/mixin";

  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    transform: translate3d(0, 0, 0);
    &.move-enter-active,
    &.move-leave-active {
      transition: all .5s;
    }
    &.move-enter,
    &.move-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .food-content {
      position: relative;
      .img-header {
        position: relative;
        /*下面做法可以将宽度和高度变成双等的*/
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .icon-wrap {
          position: absolute;
          top: 20px;
          left: 5px;
          .icon-color {
            font-size: 20px;
            font-weight: 700;
            color: #fff;
            padding: 5px;
          }
        }
      }
      .fooddec {
        padding: 18px;
      }
      .cartcontrol-warp {
        position: absolute;
        bottom: 18px;
        right: 18px;
        span {
          position: absolute;
          bottom: 0;
          right: 0;
          display: block;
          width: 74px;
          height: 24px;
          background: rgb(0, 160, 220);
          border-radius: 24px;
          text-align: center;
          color: #fff;
          line-height: 26px;
          font-size: 10px;
          opacity: 1;
          /* 注册vue2动画最终效果 动画名-事件-开始状态 */
          &.fade-enter-active,
          &.fade-leave-active {
            transition: all .5s;
          }
          /* 注册vue2动画开始和结束后的效果 动画名-事件 */
          &.fade-enter,
          &.fade-leave-to {
            opacity: 0;
          }
        }
        .cartcontrol {
          & {
            margin-bottom: -5px;
            margin-right: -10px;
          }
        }
      }
    }
    .info,
    .rating {
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: #07111b;
        font-weight: 700;
      }
      .text {
        font-size: 12px;
        line-height: 24px;
        color: #666;
      }
      .text-indent {
        text-indent: 24px;
      }
    }
    .rating-wrap {
      .rating-item {
        position: relative;
        padding: 12px 0;
        @include border-1px(rgba(6, 13, 21, 0.23));
        .user {
          position: absolute;
          right: 0;
          top: 16px;
          font-size: 0;
          line-height: 12px;
          .name {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .avatar {
            border-radius: 50%;
          }
        }
        .time {
          margin-bottom: 6px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          span {
            margin-right: 4px;
            line-height: 24px;
            font-size: 12px;
            &.icon-up {
              color: rgb(0, 160, 220);
            }
            &.icon-down {
              color: rgb(147, 153, 159);
            }
          }
        }
      }
      .no-rating {
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147, 153, 159);
      }
    }
  }

</style>
