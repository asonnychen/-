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
          <div class="score-wrap">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrap">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrap">
            <span class="title">送货时间</span>
            <span class="score time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <keep-alive><ratingselect @ratingtypeselect="getSelectType" @contenttoggle="getToggleContent" :select-type="selectType" :only-content="onlyContent" :ratings="this.ratings"></ratingselect></keep-alive>
      <div class="rating-wrap">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrap">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery">{{rating.deliveryTime}}分钟到时达</span>
                <p class="text">{{rating.text}}</p>
                <div class="commend">
                  <span class="icon-up icon" v-show="rating.rateType===0">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-thumb_up"></use>
                    </svg>
                  </span>
                  <span class="icon-down icon" v-show="rating.rateType===1">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-thumb_down"></use>
                    </svg>
                  </span>
                  <span class="recommend" v-for="(item,index) in rating.recommend">
                    {{rating.recommend[index]}}
                  </span>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import star from '@/components/star/star';
  import split from '@/components/split/split';
  import ratingselect from '@/components/ratingselect/ratingselect';
  import {
    formatDate
  } from '@/common/js/date';

  const ALL = 2;
  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split,
      ratingselect
    },
    data() {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: false
      }
    },
    created() {
      this.$http.get('/api/ratings').then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.ratings = res.data;

        }
        this.myfood = [1, 2, 3, 4];

      });
    },
    beforeUpdate() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.ratings, {
          click: true
        });
      })
    },
    methods: {
      getSelectType(type) {
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
    computed: {

    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },
      foodseler() {

      }
    },
    watch: {

    }
  }

</script>

<style lang="scss">
  @import "../../common/sass/mixin";

  $fco: #ff9900;
  $fcb: rgb(7, 17, 27);
  $fch: rgb(147, 153, 159);
  $border1px: 1px solid rgba(6, 13, 21, 0.23);
  .ratings {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .ratings-content {
      .overview {
        display: flex;
        padding: 18px 0;
        .overview-left {
          flex: 0 0 137px;
          padding: 6px 0;
          width: 137px;
          border-right: $border1px;
          text-align: center;
          @media screen and (max-width: 320px) {
            flex: 0 0 120px;
            width: 120px;
          }
          .score {
            margin-bottom: 6px;
            vertical-align: top;
            font-size: 24px;
            color: $fco;
            line-height: 28px;
          }
          .title {
            margin-bottom: 8px;
            vertical-align: top;
            font-size: 12px;
            line-height: 12px;
            color: $fcb;
          }
          .rank {
            vertical-align: top;
            font-size: 10px;
            line-height: 20px;
            color: $fch;
          }
        }
        .overview-right {
          flex: 1;
          padding: 6px 0;
          padding-left: 24px;
          @media screen and (max-width: 320px) {
            padding-left: 6px;
          }
          .score-wrap {
            padding-bottom: 9px;
            font-size: 12px;
            color: $fcb;
            .title {
              line-height: 18px;
              vertical-align: top;
            }
            .star {
              display: inline-block;
              vertical-align: top;
              padding: 0 12px;
              @media screen and (max-width: 320px) {
                padding: 0 6px;
              }
            }
            .score {
              display: inline-block;
              vertical-align: top;
              color: $fco;
              line-height: 18px;
              font-size: 12px;
              &.time {
                color: $fch;
                margin-left: 0;
                padding-left: 12px;
                @media screen and (max-width: 320px) {
                  padding-left: 6px;
                }
              }
            }
          }
        }
      }
      .ratingselect {
        padding: 0 18px;
      }
      .rating-wrap {
        padding: 0 18px;
        .rating-item {
          display: flex;
          padding: 18px 0 10px;
          border-bottom: $border1px;
          .avatar {
            overflow: hidden;
            margin-right: 18px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
          }
          .content {
            position: relative;
            flex: 1;
            .name {
              display: inline-block;
              margin-bottom: 4px;
              font-size: 10px;
              color: $fcb;
              line-height: 12px;
            }
            .star-wrap {
              .star,
              .delivery {
                display: inline-block;
                margin-bottom: 6px;
                font-size: 10px;
                font-weight: 200;
                color: $fch;
                vertical-align: top;
              }
              .text {
                margin-bottom: 8px;
                font-size: 12px;
                color: $fcb;
                line-height: 18px;
              }
              .commend {
                font-size: 0;
                &>.icon {                  
                  display: inline-block;
                  vertical-align: top;
                  font-size: 14px;
                  &.icon-up {
                    color: rgb(0, 160, 220);
                  }
                  &.icon-down {
                    color: rgb(147, 153, 159);
                  }
                }
                .recommend {
                  display: inline-block;
                  vertical-align: top;
                  margin-left: 8px;
                  margin-bottom: 8px;
                  padding: 0 6px;
                  font-size: 6px;
                  line-height: 16px;
                  border: $border1px;
                  border-radius: 2px;
                  color: $fch;
                }
              }
              .time {
                position: absolute;
                top: 2px;
                right: 0;
                font-size: 10px;
                font-weight: 200;
                color: $fch;
              }
            }
          }
        }
      }
    }
  }

  .name-enter-active,
  .name-leave-active {}

  .name-enter,
  .name-leave-to {}

</style>
