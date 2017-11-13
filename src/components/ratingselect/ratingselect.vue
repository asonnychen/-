<template>
    <div class="ratingselect">
      <div class="rating-type border-1px">
        <!--这里的值是数据目带的-->
        <span @touchstart.stop.prevent="select(2,$event)" @click.stop.prevent="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}
          <span class="count">{{ratings.length}}</span>
        </span>
        <!--这里的值通过positives计算得出-->
        <span @touchstart.stop.prevent="select(0,$event)" @click.stop.prevent="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}
          <span class="count">{{positives.length}}</span>
        </span>
        <!--这里的值通过negatives计算得出-->
        <span @touchstart.stop.prevent="select(1,$event)" @click.stop.prevent="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}
          <span class="count">{{negatives.length}}</span>
        </span>
      </div>
      <!--这里的toggleContent是用来触发父组件的事件-->
      <!--** ④ click触发toggleContent方法-->
      <div @touchstart.stop.prevent="toggleContent" @click.stop.prevent="toggleContent" class="switch" :class="{'on':onlyContent}">
        <svg class="icon icon-check_circle" aria-hidden="true">
  			<use xlink:href="#icon-check_circle"></use>
			</svg>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>

<script>
  // 在vue2.0以上不推荐子组件修改父组件数据selectType和onlyContent
  // 因此修改数据十分麻烦,这里我注释①②③④⑤⑥几点
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
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
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    components: {

    },
    data() {
      //** ①创建_selectType指向selectType数据
      return {
        _selectType: this.selectType,
        _onlyContent: this.onlyContent
      }
    },
    created() {

    },
    methods: {
      select(type, event) {
        //** ②vue2只能修改内部数据,如直接修改props数据会报错
        this._selectType = type;
        // 子组件与父组件通信需要以事件方式
        // 子组件$emit触发父组件$on改变selectType的值
        //** ③使用$emit触发父组件的ratingtypeselect传递修改的参数  父组件:@ratingtypeselect="getSelectType"
        this.$emit('ratingtypeselect', type);
      },
      toggleContent(event) {
        this.$nextTick(() => {
          this._onlyContent = !this._onlyContent;
          this.$emit('contenttoggle', this._onlyContent);
        })
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        })
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        })
      }
    },
    filters: {

    },
    watch: {

    }
  }

</script>

<style lang="scss">
  @import "../../common/sass/mixin";
  .ratingselect {
    .rating-type {
      padding: 18px 0;
      @include border-1px(rgba(7, 17, 27, .1));
      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        line-height: 16px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        transition: all .5s;
        &.active {
          color: #fff;
          background: rgb(0, 160, 220);
        }
        .count {
          margin-left: 2px;
          font-size: 8px;
        }
        &.positive {
          background: rgba(0, 160, 220, .2);
          &.active {
            background: rgb(0, 160, 220);
          }
        }
        &.negative {
          background: rgba(77, 85, 93, .2);
          &.active {
            background: rgb(77, 85, 93);
          }
        }
      }
    }
    .switch {
      padding: 12px 0;
      line-height: 24px;
      border-bottom: 1px solid rgba(6, 13, 21, 0.23);
      color: rgb(147, 153, 159);
      font-size: 0;
      &.on {
        .icon-check_circle {
          transition: all .5s;
          color: #00c850;
        }
      }
      .icon-check_circle {
        transition: all .5s;
        margin-right: 4px;
        font-size: 24px;
        display: inline-block;
        vertical-align: top;
      }
      .text {
        font-size: 12px;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {}

  .fade-enter,
  .fade-leave-to {}

</style>
