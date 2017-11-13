<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h2 class="title">{{seller.name}}</h2>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}<small>元</small></span>
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}<small>元</small></span>
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}<small>分钟</small></span>
            </div>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="bulletin">
        <h2 class="title">公告与活动</h2>
        <div class="content-wrap">
          <div class="content">{{seller.bulletin}}</div>
        </div>
      </div>
      <div class="supports-wrap">
        <supports :seller="seller"></supports>
      </div>
      <split></split>
      <div class="pics">
        <h2 class="title">商家实景</h2>
        <div class="pics-wrap" ref="pics">
          <div ref="picWrap">
            <img v-for="(item,index) in seller.pics" :src="seller.pics[index]" alt="" class="pics">
          </div>
        </div>
      </div>
      <split></split>
      <div class="infos">
        <div class="infos-wrap">
          <h2 class="title">商家信息</h2>
          <ul class="text">
            <li v-for="(info,index) in seller.infos">{{seller.infos[index]}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import star from '@/components/star/star';
  import split from '@/components/split/split';
  import supports from '@/components/supports/supports';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split,
      supports
    },
    data() {
      return {
        sellerload: ''
      }
    },
    created() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      });
      this.sellerload = this.seller;
      //this._picinit();
    },
    methods: {
      _picinit() {
        const picLength = this.seller.pics.length;
        const picWidth = 120;
        const picMargin = 6 * (picLength - 1);
        this.$refs.picWrap.style.width = picWidth * picLength + (picLength + picMargin) + 'px';
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.pics, {
            click: true,
            scrollX: true
          });
        });

      }
    },
    computed: {

    },
    filters: {

    },
    watch: {
      sellerload: '_picinit'
    },
    beforeMount() {


    }
  }

</script>

<style lang="scss">
  $fco: #ff9900;
  $fcb: rgb(7, 17, 27);
  $fch: rgb(147, 153, 159);
  $border1px: 1px solid rgba(6, 13, 21, 0.23);

  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      padding: 18px 18px 18px 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: $fcb;
        font-size: 14px;
      }
      .desc {
        padding-bottom: 8px;
        line-height: 18px;
        border-bottom: $border1px;
        font-size: 0;
        .star {
          display: inline-block;
          margin-right: 8px;
        }
        .text {
          margin-right: 12px;
          display: inline-block;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: $border1px;
          &:last-child {
            border: none;
          }
          h2 {
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .content {
            line-height: 24px;
            font-size: 10px;
            color: $fcb;
            .stress {
              font-size: 24px;
              small {
                font-size: 10px;
                color: $fcb;
              }
            }
          }
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: $fcb;
        font-size: 14px;
      }
      .content-wrap {
        padding: 0 12px 16px 12px;
        border-bottom: $border1px;
        .content {
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20);
        }
      }
    }
    .supports-wrap {
      padding: 18px 10px;
      margin: 0 auto;
      .supports {
        .supports-item {
          padding: 16px 0;
          border-bottom: $border1px;
          margin-bottom: 0;
          &:first-child {
            padding-top: 0;
          }
          &:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      }
    }
    .pics {
      padding: 18px;
      .title {
        line-height: 14px;
        color: $fcb;
        font-size: 14px;
        padding-bottom: 12px;
      }
      .pics-wrap {
        overflow: hidden;
        margin-bottom: 6px;
        img {
          width: 120px;
          height: 90px;
          padding: 0;
          margin-right: 6px;
          &:last-child {
            margin-right: 0;


          }
        }
      }
    }
    .infos {
      padding: 18px;
      .title {
        line-height: 14px;
        color: $fcb;
        font-size: 14px;
        padding-bottom: 12px;
        border-bottom: $border1px;
      }
      .text {
        li {
          padding: 16px 12px;
          border-bottom: $border1px;
          font-size: 12px;
          color: $fcb;
          line-height: 16px;
        }
      }
    }
  }

  .name-enter-active,
  .name-leave-active {}

  .name-enter,
  .name-leave-to {}

</style>
