<template>
  <div class="fooddec">
    <h2 class="name">{{food.name}}</h2>
    <p class="desc">{{food.description}}</p>
    <div class="extra">
      <span class="count">月售{{food.sellCount}}份</span>
      <span>好评率{{food.rating}}%</span>
    </div>
    <div class="price">
      <span class="now">￥{{food.price}}</span>
      <span class="old" v-show="food.oldPrice"></span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      },
      selectedFood: {
        type: Object
      }
    },
    data() {
      return {}
    },
    methods: {
    },
    components: {}
  }

</script>

<style lang="scss">
  .fooddec {
    background: #fff;
    .name {
      margin: 2px 0 8px 0;
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }
    .desc,
    .extra {
      line-height: 10px;
      font-size: 10px;
      color: #666;
    }
    .desc {
      margin-bottom: 8px;
    }
    .extra {
      &.count {
        margin-left: 12px;
      }
    }
    .price {
      font-weight: 700;
      line-height: 24px;
      .now {
        margin-right: 8px;
        font-size: 14px;
        font-weight: bold;
        color: rgb(240, 20, 20);
      }
      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(7, 17, 27);
      }
    }
  }

</style>
