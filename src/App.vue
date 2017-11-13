<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <tab></tab>
    <keep-alive><router-view :seller="seller"></router-view></keep-alive>
  </div>
</template>
<script>
	// 引入header组件
	import header from '@/components/header/header';
	import tab from '@/components/tab/tab';
	var ERR_OK = 0;

	export default {
		components: {
			'v-header': header,
			tab
		},
		data() {
			return {
				seller: {}
			}
		},
		created() {
			this.$http.get('/api/seller').then((res) => {
				res = res.body;
				if(res.errno === ERR_OK){
					this.seller = res.data;
				}				
			})
		}
	};

</script>
<style>


</style>
