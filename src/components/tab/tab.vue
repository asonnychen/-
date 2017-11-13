<template>
	<div id="tab" class="border-1px">
		<div class="goods-title">
			<router-link to="./goods">商品</router-link>
		</div>
		<div class="ratings-title">
			<router-link to="./ratings">评论</router-link>
		</div>
		<div class="seller-title">
			<router-link to="./seller">商家</router-link>
		</div>
	</div>
</template>
<script>
	export default {

	};

</script>
<style lang="scss" type="text/css">
	@import "../../common/sass/mixin.scss";
	#tab {
		width: 100%;
		height: 40px;
		display: flex;
		text-align: center;
		@include border-1px(rgba(7, 17, 27, .1));
		line-height: 40px;
		.goods-title,
		.ratings-title,
		.seller-title {
			flex: 1;
			&>a {
				display: block;
				color: #666;
			}
      &>.active{
        color: #f01414;
      }
		}
		.ratings-title {
			border-left: 1px solid #ccc;
			border-right: 1px solid #ccc;
		}
	}

</style>
