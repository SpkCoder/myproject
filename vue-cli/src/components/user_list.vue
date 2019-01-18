<template>
	<div class="view-body clearfix">
	    <div class="list-page-point">
		   <div class="container">
		     <p><i class="el-icon-location" style="font-size: 14px;"></i><span>User&gt;&gt;User List</span></p>
		   </div>
		</div>
		<div class="list-page-box clearfix">
		  	  <div class="container clearfix">
				  <div class="list-page">
				    <h1>{{ msg }}</h1>
				  </div>
		    </div>
		</div>
    </div>
</template>

<script>
export default {
  name: 'user_list',
  data () {
    return {
      msg: 'user_list.html'
    }
  }
}
</script>

<style scoped>

</style>
