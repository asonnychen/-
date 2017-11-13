<template>
	<div>
		<div class="goods-item">
			<!--vue通过ref绑定一个DOM对象,js可通过$refs对象获取-->
			<div class="menu-wrap" ref=mwrap>
				<ul>
					<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @touchstart="selectMenu(index)" @click="selectMenu(index)">
						<span class="text border-1px">
							<span v-show="item.type>0" class="icon-item" :class="classMap[item.type]"></span>{{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrap" ref=fwrap>
				<ul>
					<li v-for="item in goods" class="foods-list foods-list-hook">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li v-for="food in item.foods" class="food-item">
								<div class="icon-item" @click="selectFood(food,$event)" @touchstart="selectFood(food,$event)">
									<img width="57" height="57" :src="food.icon" alt="">
								</div>
								<div class="content">
									<fooddec :food="food"></fooddec>
									<div class="cartcontrol-wrap">
										<cartcontrol @cartAdd="incrementTotal" :food="food"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart ref="shopCart" :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		</div>
		<food :food="selectedFood" ref="food"></food>
	</div>
</template>
<script>
	import Vue from 'vue'
	import BScroll from 'better-scroll';
	import shopcart from '@/components/shopcart/shopcart';
	import cartcontrol from '@/components/cartcontrol/cartcontrol';
	import food from '@/components/food/food';
	import fooddec from '@/components/fooddec/fooddec';

	const ERR_OK = 0;
	const eventHub = new Vue();
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {},
				food: {}
			}
		},
		computed: {
			currentIndex() {
				for (let i = 0, ll = this.listHeight.length; i < ll; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food);
						}
					})
				})
				return foods;
			}
		},
		components: {
			shopcart,
			cartcontrol,
			food,
			fooddec
		},
		methods: {
			selectFood(food, event) {
				this.$refs.food.show();
				this.selectedFood = food;
			},
			incrementTotal(target) {
				//异步执行下个动画$nextTick延时到DOM更新再执行就像setTimeout
				this.$nextTick(() => {
					this.$refs.shopCart.drop(target);
				})
			},
			selectMenu(index) {
				// vue通过$refs获取DOM对象
				let foodList = this.$refs.fwrap.getElementsByClassName('foods-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300);
			},
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.mwrap);
				this.foodsScroll = new BScroll(this.$refs.fwrap, {
					probeType: 3
				});
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			_calculateHeight() {
				let foodList = this.$refs.fwrap.getElementsByClassName('foods-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0, fl = foodList.length; i < fl; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			}
		},
		created() {
			this.$http.get('/api/goods').then((res) => {
				res = res.body;
				if (res.errno === ERR_OK) {
					this.goods = res.data;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			});
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		}

	};

</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">
	@import "../../common/sass/mixin";
	.goods-item {
		display: flex;
		position: absolute;
		top: 177px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		.menu-wrap {
			flex: 0 0 80px;
			width: 80px;
			background: #eee;
			.menu-item {
				display: table;
				line-height: 14px;
				height: 54px;
				width: 56px;
				padding: 0 12px;
				&.current {
					position: relative;
					margin-top: -1px;
					z-index: 10;
					background: #fff;
					font-weight: 700;
					.text {
						@include border-none();
					}
				}
				.icon-item {
					display: inline-block;
					vertical-align: top;
					width: 12px;
					height: 12px;
					margin-right: 2px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					&.decrease {
						@include bg-image('../header/decrease_3');
					}
					&.discount {
						@include bg-image('../header/discount_3');
					}
					&.guarantee {
						@include bg-image('../header/guarantee_3');
					}
					&.invoice {
						@include bg-image('../header/invoice_3');
					}
					&.special {
						@include bg-image('../header/special_3');
					}
				}
				.text {
					display: table-cell;
					width: 56px;
					vertical-align: middle;
					@include border-1px(rgba(7, 17, 27, .1));
					font-size: 12px;
				}
			}
		}
		.foods-wrap {
			flex: 1;
			.title {
				font-size: 12px;
				color: #666;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				padding-left: 14px;
				height: 26px;
				background: #eee;
			}
			.food-item {
				display: flex;
				margin: 18px;
				padding-bottom: 18px;
				@include border-1px(rgba(7, 17, 27, .1));
				&:last-child {
					@include border-none;
					margin-bottom: 0;
				}
				.icon-item {
					flex: 0 0 57px;
					margin-right: 10px;
				}
				.content {
					flex: 1;
					.cartcontrol-wrap {
						position: absolute;
						right: 0;
						bottom: 12px;
					}
				}
			}
		}
	}

</style>
