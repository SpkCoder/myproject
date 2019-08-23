<template>
	<div class="view-body clearfix">
	    <div class="list-page-point">
		   <div class="container">
		     <p><i class="el-icon-location" style="font-size: 14px;"></i><span>系统设置&gt;&gt;错误页面</span></p>
		   </div>
		</div>
		<div class="list-page-box clearfix">
		  	  <div class="container clearfix">
						<div class="list-page">
								<h2>{{msg}}</h2>
								<div class="pic-404">
									<img width="800px" src="@/assets/image/404.png" alt="">
								</div>
						</div>
					</div>
		</div>
    </div>
</template>

<script>
export default {
	name: 'error',
  data () {
    return {
			msg: "404 Error"
    }
	},
	methods: {

  }
}
</script>

<style scoped>
	h2{ font-size: 36px;}
</style>
