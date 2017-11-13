<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" @click.stop.prevent="removeCart" @touchstart.stop.prevent="removeCart" v-show="food.count>0">
        <svg class="icon inner" aria-hidden="true"><use xlink:href="#icon-remove_circle_outlin"></use></svg>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cartadd" @touchstart.stop.prevent="addCart($event)" @click.stop.prevent="addCart($event)">
      <svg class="icon" aria-hidden="true">
			<use xlink:href="#icon-add_circle"></use>
			</svg>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!this.food.count) {
        // vue不能给food新增字段count,需要用set增加
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        //$emit触发父组件的this.$root.eventHub.$on('cart.add', this.drop);
        this.$root.eventHub.$emit('cartadd', event.target);
      },
      removeCart() {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  }

</script>

<style type="text/css" lang="scss">
  .cartcontrol {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      transition: all .5s;
      /* 注册vue2动画最终效果 动画名-事件-开始状态 */
      &.move-enter-active,
      &.move-leave-active {
        transform: translate3d(0, 0, 0) rotate(0);
      }
      /* 注册vue2动画开始和结束后的效果 动画名-事件 */
      &.move-enter,
      &.move-leave-to {
        transform: translate3d(24px, 0, 0) rotate(360deg);
        opacity: 0;
      }
      .inner {
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
        vertical-align: middle;
      }
    }
    .cart-count {
      display: inline-block;
      color: #999;
      font-size: 10px;
      line-height: 27px;
      vertical-align: middle;
      padding: 0 5px;
    }
    .cartadd {
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
      vertical-align: middle;
    }
  }

</style>
