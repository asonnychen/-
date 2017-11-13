<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" alt="">
      </div>
      <div class="content" @touchstrat.stop.prevent="show = !show" @click.stop.prevent="show = !show">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description"> {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @touchstrat.stop.prevent="show=!show" @click.stop.prevent="show = !show">
        <span class="count">{{seller.supports.length}}个</span>
        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-keyboard_arrow_right"></use></svg>
      </div>
    </div>
    <div class="bulletin-wrap" @touchstrat.stop.prevent="show=!show" @click.stop.prevent="show = !show">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <svg class="icon" aria-hidden="true"><use xlink:href="#icon-keyboard_arrow_right"></use></svg>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <!--vue2通过transition标签注册动画,name属性为动画名-->
    <transition name="fade">
      <div v-if="show" class="detail">
        <div class="detail-wrap clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrap">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <supports :seller="seller"></supports>
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
        <div class="detail-close" @touchstrat.stop.prevent="show=!show" @click.stop.prevent="show = !show"><svg class="icon" aria-hidden="true">
  			<use xlink:href="#icon-close"></use></svg>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import star from '@/components/star/star';
  import supports from '@/components/supports/supports';
  
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        show: false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star,
      supports
    }
  }

</script>

<style lang="scss" type="text/css">
  @import "../../common/sass/mixin";
  
  .header {
    position: relative;
    font-family: "微软雅黑";
    overflow: hidden;
    background: rgba(7, 17, 27, .5);
    color: #fff;
    .content-wrap {
      position: relative;
      padding: 24px 24px 18px 24px;
      font-size: 0;
      .avatar {
        display: inline-block;
      }
      .content {
        display: inline-block;
        margin-left: 14px;
        font-size: 14px;
        .title {
          margin: 2px 0 8px 0;
          .brand {
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 18px;
            @include bg-image('brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
          .name {
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .description {
          margin-bottom: 10px;
          line-height: 14px;
          font-size: 14px;
        }
        .support {
          .icon {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease {
              @include bg-image('decrease_1');
            }
            &.discount {
              @include bg-image('discount_1');
            }
            &.guarantee {
              @include bg-image('guarantee_1');
            }
            &.invoice {
              @include bg-image('invoice_1');
            }
            &.special {
              @include bg-image('special_1');
            }
          }
          .text {
            line-height: 12px;
            font-size: 12px;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 12px;
        padding: 2px;
        height: 24px;
        line-height: 25px;
        border-radius: 14px;
        background: rgba(0, 0, 0, .2);
        text-align: center;
        font-size: 12px;
        color: #fff;
        display: inline-block;
        .count {
          padding-left: 5px;
          text-align: right;
        }
        .icon {
          text-align: left;
          margin-left: -2px;
          font-size: 14px;
        }
      }
    }
    .bulletin-wrap {
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #fff;
      background-color: rgba(7, 17, 27, .2);
      .bulletin-title {
        display: inline-block;
        margin-top: 7px;
        width: 22px;
        height: 12px;
        @include bg-image(bulletin);
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-text {
        margin: 0 4px;
        font-size: 10px;
        vertical-align: top;
        width: 50px;
      }
      .icon {
        position: absolute;
        right: 10px;
        top: 6px;
        font-size: 16px;
        color: #fff;
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
    }
    .detail {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: rgba(7, 17, 27, .8);
      /* 注册vue2动画最终效果 动画名-事件-开始状态 */
      &.fade-enter-active,
      &.fade-leave-active {
        transition: opacity .5s
      }
      /* 注册vue2动画开始和结束后的效果 动画名-事件 */
      &.fade-enter,
      &.fade-leave-to {
        opacity: 0;
      }
      .detail-wrap {
        min-height: 100%;
        width: 100%;
        backdrop-filter: blur(10px);
        .detail-main {
          position: absolute;
          margin-top: 64px;
          @media screen and (max-width: 320px) {
            margin-top: 32px;
          }
          padding: 0 20px 64px;
          .name {
            line-height: 16px;
            font-weight: 600;
            text-align: center;
            font-size: 16px;
          }
          .star-wrap {
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
          .title {
            display: flex;
            width: 90%;
            margin: 28px auto 24px;
            .line {
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255, 255, 255, .2);
            }
            .text {
              padding: 0 12px;
              font-weight: 700;
              font-size: 14px;
            }
          }
          .bulletin {
            width: 90%;
            margin: 0 auto;
            .content {
              padding: 0 12px;
              line-height: 24px;
              font-size: 14px;
              @media screen and (max-width: 320px) {
                padding: 0;
              }
            }
          }
        }
      }
      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -54px auto 0 auto;
        clear: both;
        font-size: 32px;
      }
    }
  }

</style>
