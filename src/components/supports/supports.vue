<template>
  <ul v-if="seller.supports" class="supports">
    <li class="supports-item" v-for="(item,key) in seller.supports">
      <span class="icon" :class="classMap[seller.supports[key].type]"></span>
      <span class="text">{{seller.supports[key].description}}</span>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object
      },

    },
    components: {

    },
    data() {
      return {

      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {

    },
    computed: {

    },
    filters: {

    },
    watch: {

    }
  }

</script>

<style lang="scss">
  @import "../../common/sass/mixin";

  .supports {
    width: 90%;
    margin: 0 auto;
    .supports-item {
      margin-bottom: 12px;
      padding: 0 12px;
      font-size: 0;
      @media screen and (max-width: 320px) {
        padding: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
      .icon {
        display: inline-block;
        width: 14px;
        height: 14px;
        vertical-align: middle;
        margin-right: 5px;
        background-size: 14px 14px;
        background-repeat: no-repeat;
        &.decrease {
          @include bg-image('decrease_2')
        }
        &.discount {
          @include bg-image('discount_2')
        }
        &.guarantee {
          @include bg-image('guarantee_2')
        }
        &.invoice {
          @include bg-image('invoice_2')
        }
        &.special {
          @include bg-image('special_2')
        }
      }
      .text {
        line-height: 14px;
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }

  .name-enter-active,
  .name-leave-active {}

  .name-enter,
  .name-leave-to {}

</style>
